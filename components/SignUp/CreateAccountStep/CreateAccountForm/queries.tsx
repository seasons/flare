import { gql } from "@apollo/client"

export const SIGN_UP_USER = gql`
  mutation SignupUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $details: CustomerDetailCreateInput!
    $referrerId: String
    $utm: UTMInput
    $giftId: String
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      details: $details
      referrerId: $referrerId
      utm: $utm
      giftId: $giftId
    ) {
      expiresIn
      refreshToken
      token
      customer {
        id
        status
        detail {
          id
          shippingAddress {
            id
            state
          }
        }
        bagItems {
          id
        }
        admissions {
          id
          admissable
          authorizationsCount
          authorizationWindowClosesAt
          allAccessEnabled
        }
        user {
          id
          email
          firstName
          lastName
          createdAt
        }
        coupon {
          id
          amount
          percentage
          type
        }
      }
    }
  }
`
