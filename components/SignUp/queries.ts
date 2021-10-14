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
          pantLength
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
        coupon {
          id
          amount
          type
          percentage
        }
      }
    }
  }
`

export const GET_DISCOVERY_REFERENCE_VIEW = gql`
  query HowDidYouFindOutAboutUs {
    howDidYouFindOutAboutUs: view(viewID: "HowDidYouFindOutAboutUs") {
      id
      title
      caption
      type
      properties
    }
  }
`

export const GET_GIFT = gql`
  query GetGift($giftID: String!) {
    gift(id: $giftID) {
      gift
      subscription
    }
  }
`
