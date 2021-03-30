import { gql } from "@apollo/client"
import { LayoutFragment_Query } from "components/Layout"

export const TagView_Query = gql`
  query TagView_Query($tag: String!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    productsAggregate: productsConnection(where: { AND: [{ tags_some: { name: $tag } }, { status: Available }] }) {
      aggregate {
        count
      }
    }
    products: productsConnection(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where: { AND: [{ tags_some: { name: $tag } }, { status: Available }] }
    ) {
      edges {
        node {
          id
          slug
          name
          images(size: Thumb) {
            id
            url
          }
          variants {
            id
            size
            internalSize {
              display
            }
            total
            reservable
            nonReservable
            reserved
          }
        }
      }
    }
    ...LayoutFragment_Query
  }
  ${LayoutFragment_Query}
`
