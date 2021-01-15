import { gql } from "@apollo/client"

const HomePageProductFragment = gql`
  fragment HomePageProduct on Product {
    id
    slug
    name
    images {
      url
      id
    }
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
`

export const HOME_QUERY = gql`
  query GetBrowseProducts {
    me {
      customer {
        id
        admissions {
          id
          admissable
          authorizationsCount
          authorizationWindowClosesAt
          allAccessEnabled
        }
      }
    }
    paymentPlans(where: { status: "active" }) {
      id
      name
      description
      tagline
      price
      planID
      tier
      itemCount
    }
    blogPosts(count: 3) {
      id
      url
      name
      author
      imageURL
    }
    collection: products(
      first: 4
      orderBy: updatedAt_DESC
      where: { AND: [{ tags_some: { name: "Revival Collection" } }, { status: Available }] }
    ) {
      ...HomePageProduct
    }
    justAddedTops: products(
      first: 4
      category: "tops"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      ...HomePageProduct
    }
    justAddedBottoms: products(
      first: 4
      category: "bottoms"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      ...HomePageProduct
    }
    justAddedOuterwear: products(
      first: 4
      category: "outerwear"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      ...HomePageProduct
    }
    newArchival: products(
      first: 4
      orderBy: publishedAt_DESC
      where: { AND: [{ tags_some: { name: "Vintage" } }, { status: Available }] }
    ) {
      ...HomePageProduct
    }
  }
  ${HomePageProductFragment}
`
