import { InMemoryCache, makeVar } from "@apollo/client"
import { concatPagination } from "@apollo/client/utilities"

export const localBagVar = makeVar([])

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allPosts: concatPagination(),
        localBagItems: {
          read() {
            return localBagVar()
          },
        },
      },
    },
  },
})
