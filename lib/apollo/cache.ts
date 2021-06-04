import { InMemoryCache, makeVar } from "@apollo/client"
import { concatPagination } from "@apollo/client/utilities"
import { isEmpty } from "lodash"

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
        productsConnection: {
          merge(existing = {}, incoming = {}, { args: { skip = 0 } }) {
            let mergedEdges = !isEmpty(existing) ? existing?.edges?.slice(0) : []
            if (incoming?.edges?.length > 0) {
              for (let i = 0; i < incoming?.edges?.length; ++i) {
                mergedEdges[skip + i] = incoming?.edges?.[i]
              }
            }
            return { ...existing, ...incoming, edges: mergedEdges }
          },
        },
        blogPostsConnection: {
          merge(existing = {}, incoming = {}, { args: { skip = 0 } }) {
            let mergedEdges = !isEmpty(existing) ? existing?.edges?.slice(0) : []
            if (incoming?.edges?.length > 0) {
              for (let i = 0; i < incoming?.edges?.length; ++i) {
                mergedEdges[skip + i] = incoming?.edges?.[i]
              }
            }
            return { ...existing, ...incoming, edges: mergedEdges?.filter(Boolean) }
          },
        },
      },
    },
  },
})
