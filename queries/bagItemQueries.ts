import { ProductBuyCTA_ProductFragment, ProductBuyCTA_ProductVariantFragment } from "@seasons/eclipse"
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
        ...ProductBuyCTA_ProductVariantFragment
      }
      ...ProductBuyCTA_ProductFragment
    }
  }
  ${ProductBuyCTA_ProductVariantFragment}
  ${ProductBuyCTA_ProductFragment}
`

