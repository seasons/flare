import gql from "graphql-tag"
import { OrderFragment_Order } from "@seasons/eclipse"
import { BagSectionFragment_BagSection } from "mobile/Bag/Components/BagSection/BagSection"
import { BuyTabFragment_Me } from "mobile/Bag/BuyTab/BuyTab"

export { GET_LOCAL_CART, GET_LOCAL_CART_PRODUCTS } from "./clientQueries"
export const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

export const CREATE_DRAFT_ORDER = gql`
  mutation ProductVariantCreateDraftOrder($input: CreateDraftedOrderInput!) {
    createDraftedOrder(input: $input) {
      id
      ...OrderFragment_Order
    }
  }
  ${OrderFragment_Order}
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
      ...BuyTabFragment_Me
    }
  }
  ${BuyTabFragment_Me}
  ${BagSectionFragment_BagSection}
`

export const ADD_TO_BAG = gql`
  mutation AddToBag($id: ID!) {
    addToBag(item: $id) {
      id
    }
  }
`

export const DELETE_BAG_ITEM = gql`
  mutation deleteBagItem($itemID: ID!) {
    deleteBagItem(itemID: $itemID)
  }
`
