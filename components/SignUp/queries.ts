import { BrandNavItemFragment } from "components/Nav"
import gql from "graphql-tag"

export const GET_SIGNUP_USER = gql`
  query GetSignupUser {
    brands(
      where: { products_some: { id_not: null }, name_not: null, featured: true, published: true }
      orderBy: name_ASC
    ) {
      ...BrandNavItem
    }
    me {
      id
      bag {
        id
      }
      customer {
        id
        status
        detail {
          id
          height
          styles
        }
        user {
          id
        }
        membership {
          id
          plan {
            id
          }
        }
        authorizedAt
        admissions {
          id
          admissable
          authorizationsCount
          authorizationWindowClosesAt
        }
      }
    }
  }
  ${BrandNavItemFragment}
`

export const GET_GIFT = gql`
  query GetGift($giftID: String!) {
    gift(id: $giftID) {
      gift
      subscription
    }
  }
`
