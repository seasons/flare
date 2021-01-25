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

        products: {
          merge(existing = [], incoming = [], { args: { skip = 0 } }) {
            const merged = existing ? existing.slice(0) : []
            for (let i = 0; i < incoming.length; ++i) {
              merged[skip + i] = incoming[i]
            }
            existing = merged
            return existing
          },
        },
      },
    },
  },
})
