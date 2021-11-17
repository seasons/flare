import gql from "graphql-tag"

import { OrderFragment_Order } from "@seasons/eclipse"

import { BagItemFragment } from "./bagItemQueries"
import { BagSectionFragment_BagSection } from "mobile/Bag/Components/BagSection/BagSection"

export { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_LOCAL_BAG, GET_LOCAL_BAG_ITEMS } from "./clientQueries"
export const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

export const PRODUCT_VARIANT_CREATE_DRAFT_ORDER = gql`
  mutation ProductVariantCreateDraftOrder($input: CreateDraftedOrderInput!) {
    createDraftedOrder(input: $input) {
      id
      ...OrderFragment_Order
    }
  }
  ${OrderFragment_Order}
`

export const GET_BAG = gql`
  query GetBagAndSavedItems {
    paymentPlans(where: { status: "active" }) {
      id
      planID
      tier
      price
      itemCount
    }
    me {
      id
      nextFreeSwapDate
      bagSections {
        ...BagSectionFragment_BagSection
      }
      customer {
        id
        status
        invoices {
          id
          subscriptionId
        }
        user {
          id
        }
        detail {
          id
          shippingAddress {
            id
            city
            state
            address1
            address2
            zipCode
          }
        }
        membership {
          id
          plan {
            id
            tier
            price
            itemCount
          }
          pauseRequests(orderBy: createdAt_DESC) {
            id
            resumeDate
            pauseDate
            pausePending
          }
        }
      }
    }
  }
  ${BagSectionFragment_BagSection}
`

export const SavedTab_Query = gql`
  query SavedTab_Query {
    me {
      id
      activeReservation {
        id
      }
      savedItems {
        id
        saved
        productVariant {
          id
          reservable
          displayLong
          hasRestockNotification
          product {
            id
            slug
            name
            brand {
              id
              name
            }
            images(size: Thumb) {
              id
              url
            }
          }
        }
      }
    }
  }
`

export const ADD_TO_BAG = gql`
  mutation AddToBag($id: ID!) {
    addToBag(item: $id) {
      id
    }
  }
`

export const DELETE_BAG_ITEM = gql`
  mutation RemoveFromBag($id: ID!, $saved: Boolean!) {
    removeFromBag(item: $id, saved: $saved) {
      id
    }
  }
`

export const REMOVE_FROM_BAG_AND_SAVE_ITEM = gql`
  mutation RemoveFromBagAndSaveItem($id: ID!, $saved: Boolean!) {
    removeFromBag(item: $id, saved: $saved) {
      id
    }
    saveProduct(item: $id, save: true) {
      id
    }
  }
`
