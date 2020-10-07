import { gql } from "@apollo/client"

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(where: { visible: true }, orderBy: name_ASC) {
      id
      slug
    }
  }
`

export const GET_BROWSE_PRODUCTS = gql`
  query GetBrowse(
    $categoryName: String!
    $brandName: String!
    $brandSlugs: [String!]
    $first: Int!
    $skip: Int!
    $orderBy: ProductOrderByInput!
    $brandOrderBy: BrandOrderByInput!
  ) {
    categories(where: { visible: true }, orderBy: name_ASC) {
      id
      slug
      name
      children {
        slug
      }
    }
    brands(orderBy: $brandOrderBy, where: { products_some: { id_not: null }, name_not: null, slug_in: $brandSlugs }) {
      id
      slug
      name
    }
    connection: productsConnection(category: $categoryName, brand: $brandName, where: { status: Available }) {
      aggregate {
        count
      }
    }
    products: productsConnection(
      category: $categoryName
      brand: $brandName
      orderBy: $orderBy
      first: $first
      skip: $skip
      where: { status: Available }
    ) {
      aggregate {
        count
      }
      edges {
        node {
          id
          slug
          name
          images {
            id
            url
          }
          description
          modelSize {
            display
          }
          modelHeight
          externalURL
          retailPrice
          status
          createdAt
          updatedAt
          brand {
            id
            slug
            name
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
`
