import { gql } from "apollo-boost"

export const HOME_QUERY = gql`
  query GetBrowseProducts {
    justAddedProducts: products(
      first: 4
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
