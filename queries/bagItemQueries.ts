import { ProductBuyCTAFragment_Product, ProductBuyCTAFragment_ProductVariant } from "@seasons/eclipse"
import gql from "graphql-tag"

export const BagItemFragment = gql`
  fragment BagItemProductVariant on ProductVariant {
    product {
      id
      slug
      name
      modelSize {
        id
        display
      }
      brand {
        id
        name
        websiteUrl
      }
      images(size: Thumb) {
        id
        url
      }
      variants {
        id
        hasRestockNotification
        reservable
        displayShort
        displayLong
        ...ProductBuyCTAFragment_ProductVariant
      }
      ...ProductBuyCTAFragment_Product
    }
  }
  ${ProductBuyCTAFragment_ProductVariant}
  ${ProductBuyCTAFragment_Product}
`

