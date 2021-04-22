import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import { sha256 } from "js-sha256"
import { useMemo } from "react"

import { ApolloClient, ApolloLink, HttpLink, Observable } from "@apollo/client"
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries"
import * as Sentry from "@sentry/react"

import { getAccessTokenFromSession, getNewToken, UserSession } from "../auth/auth"
import { cache } from "./cache"
import { resolvers, typeDefs } from "./resolvers"

const authLink = setContext(({ operationName }, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = typeof window !== "undefined" && getAccessTokenFromSession()
  // return the headers to the context so httpLink can read them
  const allHeaders = headers || {}
  allHeaders.application = "flare"
  if (token && operationName !== "GetRefreshToken") {
    allHeaders.authorization = `Bearer ${token}`
  }
  return {
    headers: allHeaders,
  }
})

// @ts-ignore
const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors)

    for (const err of graphQLErrors) {
      // Add scoped report details and send to Sentry
      Sentry.withScope((scope) => {
        // Annotate whether failing operation was query/mutation/subscription
        scope.setTag("kind", operation.operationName)
        // Log query and variables as extras
        // (make sure to strip out sensitive data!)
        scope.setExtra("query", operation.query)
        scope.setExtra("variables", operation.variables)
        if (err.path) {
          // We can also add the path as breadcrumb
          scope.addBreadcrumb({
            category: "query-path",
            message: err.path.join(" > "),
            level: Sentry.Severity.Debug,
          })
        }
        Sentry.captureException(err)
      })
    }
  }

  if (networkError) {
    console.log("networkError", JSON.stringify(networkError))
    // User access token has expired
    if ((networkError as any).statusCode === 401) {
      // We assume we have both tokens needed to run the async request
      // Let's refresh token through async request
      return new Observable((observer) => {
        getNewToken()
          .then((userSession: UserSession) => {
            operation.setContext(({ headers = {} }) => ({
              headers: {
                // Re-add old headers
                ...headers,
                // Switch out old access token for new one
                authorization: `Bearer ${userSession.token}` || null,
              },
            }))
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            }

            // Retry last failed request
            forward(operation).subscribe(subscriber)
          })
          .catch((error) => {
            // No refresh or client token available, we force user to login
            observer.error(error)
          })
      })
    }
  }
})

const httpLink = new HttpLink({
  uri: process.env.MONSOON_ENDPOINT || "http://localhost:4000/", // Server URL (must be absolute)
  credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
}) as any

const persistedQueryLink = createPersistedQueryLink({ useGETForHashedQueries: true, sha256 })

// Take from https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([persistedQueryLink, authLink, errorLink, httpLink]) as any,
    typeDefs,
    resolvers,
    cache,
  })
}

export let apolloClient = createApolloClient()

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
