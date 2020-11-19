import { gql } from "@apollo/client"

export const GET_BRAND = gql`
  query GetBrand($slug: String!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    brand(where: { slug: $slug }) {
      id
      name
      logo
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

export const GET_BRANDS = gql`
  query GetBrands($brandSlugs: [String!]) {
    brands(where: { products_some: { id_not: null }, name_not: null, slug_in: $brandSlugs }) {
      id
      slug
    }
  }
`
