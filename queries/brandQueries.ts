import { gql } from "@apollo/client"
import { BrandNavItemFragment } from "components/Nav"

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(where: { visible: true }, orderBy: name_ASC) {
      id
      slug
    }
  }
`

export const GET_BROWSE_BRANDS_AND_CATEGORIES = gql`
  query GetBrandsAndCategories {
    navigationBrands: brands(
      where: { products_some: { id_not: null }, name_not: null, featured: true, published: true }
      orderBy: name_ASC
    ) {
      ...BrandNavItem
    }
    categories(where: { visible: true }, orderBy: name_ASC) {
      id
      slug
      name
      children {
        slug
      }
    }
    brands(orderBy: name_ASC, where: { products_some: { id_not: null }, name_not: null, published: true }) {
      id
      slug
      name
    }
  }
  ${BrandNavItemFragment}
`

export const GET_BROWSE_PRODUCTS = gql`
  query GetBrowseProducts(
    $categoryName: String!
    $brandName: String!
    $first: Int!
    $skip: Int!
    $orderBy: ProductOrderByInput!
  ) {
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
