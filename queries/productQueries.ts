import gql from "graphql-tag"
import { ProductBuyCTAFragment_Product, ProductBuyCTAFragment_ProductVariant } from "@seasons/eclipse"

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
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
        type
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
        displayShort
        displayLong
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
          type
        }
        internalSize {
          id
          display
          type
          productType
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
          }
        }
        ...ProductBuyCTAFragment_ProductVariant
      }
      ...ProductBuyCTAFragment_Product
    }
  }
  ${ProductBuyCTAFragment_Product}
  ${ProductBuyCTAFragment_ProductVariant}
`

export const GET_STATIC_PRODUCTS = gql`
  query GetStaticProducts($pageSize: Int) {
    products(where: { status: Available }, first: $pageSize, orderBy: publishedAt_DESC) {
      id
      slug
    }
  }
`
