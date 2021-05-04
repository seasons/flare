import gql from "graphql-tag"
import { LaunchCalendarFragment_Query } from "components/Homepage/LaunchCalendar"
import { ProductGridItem_Product } from "@seasons/eclipse"

const HomePageProductFragment_Product = gql`
  fragment HomePageProductFragment_Product on Product {
    id
    slug
    name
    retailPrice
    type
    modelSize {
      id
      display
    }
    brand {
      id
      slug
      name
    }
    images(size: XLarge) {
      id
      url
    }
    variants {
      id
      reservable
      displayShort
    }
    ...ProductGridItem_Product
  }
  ${ProductGridItem_Product}
`

export const HomeMe_Query = gql`
  query HomeMe_Query {
    me {
      id
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
  }
`

export const Home_Query = gql`
  query Home_Query {
    collections(orderBy: updatedAt_DESC, first: 1, where: { published: true }) {
      id
      slug
      title
      subTitle
      images {
        id
        url
      }
      products(first: 3, orderBy: updatedAt_DESC) {
        ...HomePageProductFragment_Product
      }
    }
    blogPosts(count: 3) {
      id
      url
      name
      author
      image {
        id
        url
        alt
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
    newestBrandProducts(first: 3) {
      ...HomePageProductFragment_Product
    }
    fitPics(first: 5, orderBy: createdAt_DESC, where: { status: Published }) {
      id
      location {
        id
        city
        state
      }
      image(size: Medium) {
        id
        url
      }
      includeInstagramHandle
      user {
        id
        customer {
          id
          detail {
            id
            instagramHandle
          }
        }
      }
    }
    newBottoms: products(
      first: 3
      category: "bottoms"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }, { tags_none: { name: "Vintage" } }] }
    ) {
      ...HomePageProductFragment_Product
    }

    ...LaunchCalendarFragment_Query
  }

  ${LaunchCalendarFragment_Query}
  ${HomePageProductFragment_Product}
`
