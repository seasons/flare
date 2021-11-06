import gql from "graphql-tag"

import {
  ProductBuyCTAFragment_Product, ProductBuyCTAFragment_ProductVariant, ProductPriceText_Product
} from "@seasons/eclipse"

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
        reservable
        hasRestockNotification
        reservable
        displayShort
        displayLong
        price {
          id
          retailPrice
        }
        ...ProductBuyCTAFragment_ProductVariant
      }
      ...ProductPriceText_Product
      ...ProductBuyCTAFragment_Product
    }
  }
  ${ProductBuyCTAFragment_ProductVariant}
  ${ProductBuyCTAFragment_Product}
  ${ProductPriceText_Product}
`
