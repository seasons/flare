import gql from "graphql-tag"

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    product(where: { slug: $slug }) {
      id
      name
      createdAt
      updatedAt
      description
      retailPrice
      modelSize {
        display
      }
      modelHeight
      color {
        id
        name
      }
      secondaryColor {
        id
        name
      }
      brand {
        id
        slug
        name
        logo
        since
      }
      outerMaterials
      innerMaterials
      images {
        id
        url
      }
      isSaved
      variants {
        id
        internalSize {
          id
          productType
          display
        }
        total
        reservable
        nonReservable
        reserved
        isSaved
        isWanted
      }
    }
  }
`
