import gql from "graphql-tag"
import { BagItemFragment } from "queries/bagItemQueries"

export const RESERVE_ITEMS = gql`
  mutation ReserveItems($options: ReserveItemsOptions, $shippingCode: ShippingCode) {
    reserveItems(options: $options, shippingCode: $shippingCode) {
      id
    }
  }
`

export const GET_CUSTOMER = gql`
  query GetCustomer($shippingCode: String) {
    me {
      id
      nextFreeSwapDate
      user {
        id
        firstName
        lastName
        email
      }
      bag {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
      }
      newBagItems: bag(status: Added) {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
      }
      reservationLineItems(filterBy: NewItems, shippingCode: $shippingCode) {
        id
        name
        price
        recordType
      }
      customer {
        id
        membership {
          id
          plan {
            id
            itemCount
          }
        }
        detail {
          id
          phoneNumber
          shippingAddress {
            id
            name
            address1
            address2
            city
            state
            zipCode
            shippingOptions {
              id
              externalCost
              averageDuration
              shippingMethod {
                id
                code
                displayText
                timeWindows {
                  id
                  startTime
                  endTime
                  display
                }
              }
            }
          }
        }
        billingInfo {
          id
          last_digits
        }
      }
    }
  }
  ${BagItemFragment}
`
