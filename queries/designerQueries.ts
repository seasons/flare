import { gql } from "@apollo/client"

export const Designer_Query = gql`
  query Designer_Query($slug: String!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    brand(where: { slug: $slug }) {
      id
      name
      since
      description
      websiteUrl
      basedIn
      designer
      images {
        id
        url
      }
      productsAggregate: productsConnection(where: { status: Available }) {
        aggregate {
          count
        }
      }
      products: productsConnection(first: $first, skip: $skip, orderBy: $orderBy, where: { status: Available }) {
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
                id
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
    }
  }
`

export const DesignerBrands_Query = gql`
  query DesignerBrands_Query {
    brands(where: { products_some: { id_not: null }, name_not: null, published: true }) {
      id
      slug
    }
  }
`
