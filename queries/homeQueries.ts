import gql from "graphql-tag"
import { LaunchCalendarFragment_Query } from "components/Homepage/LaunchCalendar"
import { LayoutFragment_Query } from "components/Layout"

const HomePageProductFragment_Product = gql`
  fragment HomePageProductFragment_Product on Product {
    id
    slug
    name
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
  }
`

export const Home_Query = gql`
  query Home_Query {
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
      imageURL
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
    newArchival: products(
      first: 3
      orderBy: publishedAt_DESC
      where: { AND: [{ tags_some: { name: "Vintage" } }, { status: Available }] }
    ) {
      ...HomePageProductFragment_Product
    }

    ...LayoutFragment_Query
    ...LaunchCalendarFragment_Query
  }

  ${LayoutFragment_Query}
  ${LaunchCalendarFragment_Query}
  ${HomePageProductFragment_Product}
`
