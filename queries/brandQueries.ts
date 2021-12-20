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
    $priceRange: [Int]
    $tops: [String]
    $bottoms: [String]
    $colors: [String]
    $available: Boolean
    $forSaleOnly: Boolean
  ) {
    connection: productsConnection(
      tops: $tops
      bottoms: $bottoms
      availableOnly: $available
      forSaleOnly: $forSaleOnly
      category: $categoryName
      colors: $colors
      brand: $brandName
      priceRange: $priceRange
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
      forSaleOnly: $forSaleOnly
      brand: $brandName
      colors: $colors
      orderBy: $orderBy
      first: $first
      skip: $skip
      priceRange: $priceRange
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
          discountedPrice
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
