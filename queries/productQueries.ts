import { gql } from "@apollo/client"
import { BrandNavItemFragment } from "components/Nav/BrandsNavItem"

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    navigationBrands: brands(
      where: { products_some: { id_not: null }, name_not: null, featured: true, published: true }
      orderBy: name_ASC
    ) {
      ...BrandNavItem
    }
    me {
      customer {
        id
        status
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
      }
    }
  }
  ${BrandNavItemFragment}
`

export const GET_STATIC_PRODUCTS = gql`
  query GetStaticProducts {
    products(where: { status: Available }, first: 4, orderBy: publishedAt_DESC) {
      id
      slug
    }
  }
`
