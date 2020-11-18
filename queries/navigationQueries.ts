import { gql } from "@apollo/client"
import { BrandNavItemFragment } from "components/Nav"

export const NAVIGATION_QUERY = gql`
  query GetAbout($featuredBrandSlugs: [String!]!) {
    brands(where: { products_some: { id_not: null }, name_not: null, slug_in: $featuredBrandSlugs }) {
      ...BrandNavItem
    }
  }
  ${BrandNavItemFragment}
`
