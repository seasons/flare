import gql from "graphql-tag"
import { ProductBuyCTA_ProductFragment, ProductBuyCTA_ProductVariantFragment } from "@seasons/eclipse"
import { LayoutFragment_Query } from "components/Layout"

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    me {
      customer {
        id
        status
        user {
          id
        }
        membership {
          id
          plan {
            id
            itemCount
          }
        }
      }
      bag {
        id
      }
      savedItems {
        id
      }
    }
    product(where: { slug: $slug }) {
      id
      slug
      name
      createdAt
      updatedAt
      description
      retailPrice
      type
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
        images {
          id
          url
          resized(width: 400)
        }
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
        total
        reservable
        nonReservable
        reserved
        isInBag
        isSaved
        isWanted
        manufacturerSizes {
          id
          display
        }
        internalSize {
          id
          productType
          display
          top {
            id
            letter
            sleeve
            shoulder
            chest
            neck
            length
          }
          bottom {
            id
            type
            value
          }
        }
        ...ProductBuyCTA_ProductVariantFragment
      }
      ...ProductBuyCTA_ProductFragment
    }
    ...LayoutFragment_Query
  }
  ${ProductBuyCTA_ProductFragment}
  ${ProductBuyCTA_ProductVariantFragment}
  ${LayoutFragment_Query}
`

export const GET_STATIC_PRODUCTS = gql`
  query GetStaticProducts {
    products(where: { status: Available }, first: 4, orderBy: publishedAt_DESC) {
      id
      slug
    }
  }
`
