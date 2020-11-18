import { gql } from "@apollo/client"
import { BrandNavItemFragment } from "components/Nav"

export const TERMS_OF_SERVICE_QUERY = gql`
  query GetAbout($brandSlugs: [String!]!) {
    brands(where: { products_some: { id_not: null }, name_not: null, slug_in: $brandSlugs }) {
      ...BrandNavItem
    }
  }
  ${BrandNavItemFragment}
`
