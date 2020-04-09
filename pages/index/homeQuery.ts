import { gql } from "apollo-boost"

export const HOME_QUERY = gql`
  query GetBrowseProducts {
    brands {
      id
      slug
      name
      products {
        id
      }
    }
    justAddedTops: products(
      first: 4
      category: "tops"
      orderBy: createdAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      id
      images
      brand {
        id
        name
      }
      variants {
        id
        total
        reservable
        nonReservable
        reserved
        internalSize {
          display
        }
      }
    }
    justAddedPants: products(
      first: 4
      category: "pants"
      orderBy: createdAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      id
      images
      brand {
        id
        name
      }
      variants {
        id
        total
        reservable
        nonReservable
        reserved
        internalSize {
          display
        }
      }
    }
  }
`
