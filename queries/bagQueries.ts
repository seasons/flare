import { ProductBuyCTA_ProductFragment, ProductBuyCTA_ProductVariantFragment } from "@seasons/eclipse"
import gql from "graphql-tag"
import { ReservationHistoryTabFragment_Customer } from "mobile/Bag/Components/ReservationHistoryTab"
import { SavedItemFragment_BagItem } from "mobile/Bag/Components/SavedItem"
import { SavedItemsTabFragment_Me } from "mobile/Bag/Components/SavedItemsTab"

export const BagItemFragment = gql`
  fragment BagItemProductVariant on ProductVariant {
    product {
      id
      slug
      name
      modelSize {
        id
        display
      }
      brand {
        id
        name
        websiteUrl
      }
      images(size: Thumb) {
        id
        url
      }
      variants {
        id
        hasRestockNotification
        reservable
        displayShort
        displayLong
        ...ProductBuyCTA_ProductVariantFragment
      }
      ...ProductBuyCTA_ProductFragment
    }
  }
  ${ProductBuyCTA_ProductVariantFragment}
  ${ProductBuyCTA_ProductFragment}
`

export const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

export const GET_LOCAL_BAG_ITEMS = gql`
  query GetLocalBagItems($ids: [ID!]) {
    products(where: { id_in: $ids }) {
      id

      variants {
        id
        ...BagItemProductVariant
      }
    }
  }
  ${BagItemFragment}
`

export const SavedTab_Query = gql`
  query SavedTab_Query {
    me {
      id
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

export const ReservationHistoryTab_Query = gql`
  query ReservationHistoryTab_Query {
    me {
      id
      customer {
        ...ReservationHistoryTabFragment_Customer
      }
    }
  }
  ${ReservationHistoryTabFragment_Customer}
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
