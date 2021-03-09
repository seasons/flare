import gql from "graphql-tag"

export const GET_DISCOVERY_PRODUCT_VARIANTS = gql`
  query AvailableProductVariantsConnectionForCustomer(
    $first: Int!
    $skip: Int!
    $orderBy: ProductVariantOrderByInput!
  ) {
    paymentPlans(where: { status: "active" }) {
      id
      tier
      itemCount
      price
    }
    me {
      id
      bag {
        id
        productVariant {
          id
          product {
            id
            images(size: Thumb) {
              id
              url
            }
          }
        }
      }
      customer {
        id
        detail {
          id
          shippingAddress {
            id
            city
            state
            weather {
              id
              temperature
              emoji
            }
          }
        }
      }
    }
    productsCount: productVariantsConnection(personalizedForCurrentUser: true) {
      aggregate {
        count
      }
    }
    products: productVariantsConnection(
      skip: $skip
      first: $first
      orderBy: $orderBy
      personalizedForCurrentUser: true
    ) {
      edges {
        node {
          id
          isSaved
          displayShort
          product {
            id
            slug
            name
            brand {
              id
              slug
              name
            }
            images(size: Small) {
              id
              url
            }
          }
        }
      }
    }
  }
`
