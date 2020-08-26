import { withData } from "next-apollo"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"

// Set up Apollo Client
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage?.getItem("token")

  // return the headers to the context so httpLink can read them
  const allHeaders = headers || {}
  allHeaders.client = "Flare"
  if (token) {
    allHeaders.authorization = `Bearer ${token}`
  }
  return {
    headers: allHeaders,
  }
})

const httpLink = createHttpLink({
  uri: process.env.MONSOON_ENDPOINT || "http://localhost:4000/",
})

const config = {
  link: authLink.concat(httpLink),
}

export default withData(config)
