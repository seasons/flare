import gql from "graphql-tag"
import { ReservationHistoryTabFragment_Customer } from "mobile/Bag/Components/ReservationHistoryTab"

import { BagItemFragment } from "./bagItemQueries"

export { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_LOCAL_BAG, GET_LOCAL_BAG_ITEMS } from "./clientQueries"
export const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
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
      activeReservation {
        id
        returnAt
        shipped
        createdAt
        status
        phase
        updatedAt
        products {
          id
        }
        returnedPackage {
          id
          shippingLabel {
            trackingURL
          }
        }
        sentPackage {
          id
          shippingLabel {
            trackingURL
          }
        }
      }
      bag {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
        position
        saved
        status
      }
    }
  }
  ${BagItemFragment}
`

export const ADD_TO_BAG = gql`
  mutation AddToBag($id: ID!) {
    addToBag(item: $id) {
      id
    }
  }
`

export const REMOVE_FROM_BAG = gql`
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
