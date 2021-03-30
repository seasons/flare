import { LayoutFragment_Query } from "components/Layout"
import gql from "graphql-tag"

export const GET_SIGNUP_USER = gql`
  query GetSignupUser {
    me {
      id
      bag {
        id
      }
      customer {
        id
        status
        plan
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
    ...LayoutFragment_Query
  }
  ${LayoutFragment_Query}
`

export const GET_GIFT = gql`
  query GetGift($giftID: String!) {
    gift(id: $giftID) {
      gift
      subscription
    }
  }
`
