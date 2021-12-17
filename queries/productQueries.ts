import gql from "graphql-tag"

import {
  ProductBuyCTAFragment_Product, ProductBuyCTAFragment_ProductVariant,
  ProductConditionSectionFragment_PhysicalProductQualityReport
} from "@seasons/eclipse"

export const UPSERT_CART_ITEM = gql`
  mutation upsertCartItem($productVariantId: ID!, $addToCart: Boolean!) {
    upsertCartItem(productVariantId: $productVariantId, addToCart: $addToCart) {
      id
    }
  }
`

export const UPSERT_RESTOCK_NOTIF = gql`
  mutation UpsertRestockNotification($variantID: ID!, $shouldNotify: Boolean!) {
    upsertRestockNotification(variantID: $variantID, shouldNotify: $shouldNotify) {
      id
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    product(where: { slug: $slug }) {
      id
      slug
      name
      createdAt
      updatedAt
      description
      rentalPrice
      type
      retailPrice
      discountedPrice
      discountPercentage
      category {
        id
        name
        productType
      }
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
        isInCart
        hasRestockNotification
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
          accessory {
            id
            bridge
            length
            width
          }
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
            waist
            rise
            hem
            inseam
          }
        }
        nextReservablePhysicalProduct {
          id
          reports {
            id
            published
            createdAt
            ...ProductConditionSectionFragment_PhysicalProductQualityReport
          }
        }
        ...ProductBuyCTAFragment_ProductVariant
      }
      ...ProductBuyCTAFragment_Product
    }
  }
  ${ProductBuyCTAFragment_Product}
  ${ProductBuyCTAFragment_ProductVariant}
  ${ProductConditionSectionFragment_PhysicalProductQualityReport}
`

export const GET_STATIC_PRODUCTS = gql`
  query GetStaticProducts($pageSize: Int) {
    products(where: { status: Available }, first: $pageSize, orderBy: publishedAt_DESC) {
      id
      slug
    }
  }
`
