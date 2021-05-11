import { gql } from "@apollo/client"
import { ProductGridItem_Product } from "@seasons/eclipse"

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(where: { visible: true }, orderBy: name_ASC) {
      id
      slug
    }
  }
`

export const GET_BROWSE_PRODUCTS = gql`
  query GetBrowseProducts(
    $categoryName: String!
    $brandName: String!
    $first: Int!
    $skip: Int!
    $orderBy: ProductOrderByInput!
    $tops: [String]
    $bottoms: [String]
    $colors: [String]
    $available: Boolean
  ) {
    connection: productsConnection(
      tops: $tops
      bottoms: $bottoms
      availableOnly: $available
      category: $categoryName
      colors: $colors
      brand: $brandName
      where: { status: Available }
    ) {
      aggregate {
        count
      }
    }
    products: productsConnection(
      category: $categoryName
      tops: $tops
      bottoms: $bottoms
      availableOnly: $available
      brand: $brandName
      colors: $colors
      orderBy: $orderBy
      first: $first
      skip: $skip
      where: { status: Available }
    ) {
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
            displayShort
            total
            reservable
            nonReservable
            reserved
          }
          ...ProductGridItem_Product
        }
      }
    }
  }
  ${ProductGridItem_Product}
`
