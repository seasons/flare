import gql from "graphql-tag"
import { BagItemFragment } from "./bagItemQueries"

export const ADD_OR_REMOVE_FROM_LOCAL_BAG = gql`
  mutation AddOrRemoveFromLocalBag($productID: ID!, $variantID: ID!) {
    addOrRemoveFromLocalBag(productID: $productID, variantID: $variantID) @client {
      productID
      variantID
    }
  }
`

export const GET_LOCAL_BAG = gql`
  query GetLocalBag {
    localBagItems @client {
      productID
      variantID
    }
  }
`

export const GET_LOCAL_BAG_ITEMS = gql`
  query GetLocalBagItems($ids: [ID!]) {
    productVariants(where: { id_in: $ids }) {
      id
      displayShort
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
