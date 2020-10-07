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
  query GetBrowseProducts($brandSlugs: [String!]) {
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
    brands(where: { products_some: { id_not: null }, name_not: null, slug_in: $brandSlugs }) {
      id
      slug
      name
      products {
        id
      }
    }
    blogPosts(count: 3) {
      id
      url
      name
      author
      imageURL
    }
    justAddedTops: products(
      first: 4
      category: "tops"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
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