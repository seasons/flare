import { setContext } from "apollo-link-context"
import { useMemo } from "react"

import { ApolloClient, HttpLink } from "@apollo/client"

import { getAccessTokenFromSession } from "../auth/auth"
import { cache } from "./cache"
import { resolvers, typeDefs } from "./resolvers"

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = typeof window !== "undefined" && getAccessTokenFromSession()

  // return the headers to the context so httpLink can read them
  const allHeaders = headers || {}
  allHeaders.application = "flare"
  if (token) {
    allHeaders.authorization = `Bearer ${token}`
  }
  return {
    headers: allHeaders,
  }
})

const httpLink = new HttpLink({
  uri: process.env.MONSOON_ENDPOINT || "http://localhost:4000/", // Server URL (must be absolute)
  credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
}) as any

// Take from https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js

export function createApolloClient() {
  const token = typeof window !== "undefined" && getAccessTokenFromSession()

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink) as any,
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