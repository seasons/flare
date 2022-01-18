import gql from "graphql-tag"

export const GET_LOCAL_CART = gql`
  query getLocalCart {
    localCartItems @client
  }
`

export const GET_LOCAL_CART_PRODUCTS = gql`
  query getLocalCartItems($ids: [ID!]) {
    productVariants(where: { id_in: $ids }) {
      id
      displayShort
      price {
        id
        buyUsedAdjustedPrice
      }
      product {
        id
        slug
        name
        rentalPrice
        retailPrice
        images {
          id
          url
        }
      }
    }
  }
`
