import { withApollo } from "next-apollo"
import { createHttpLink } from "apollo-link-http"
import fetch from "node-fetch"
import { setContext } from "apollo-link-context"
import { InMemoryCache, ApolloClient } from "@apollo/client"

// Set up Apollo Client
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = typeof window !== "undefined" && localStorage?.getItem("token")

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

const httpLink = createHttpLink({
  uri: process.env.MONSOON_ENDPOINT || "http://localhost:4000/",
  fetch,
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink) as any,
  cache: new InMemoryCache(),
})

export default withApollo(apolloClient)
