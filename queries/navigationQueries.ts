import { gql } from "@apollo/client"
import { BrandNavItemFragment } from "components/Nav"

export const NAVIGATION_QUERY = gql`
  query GetAbout {
    brands(
      where: { products_some: { id_not: null }, name_not: null, featured: true, published: true }
      orderBy: name_ASC
    ) {
      ...BrandNavItem
    }
  }
  ${BrandNavItemFragment}
`
