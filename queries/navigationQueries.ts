import gql from "graphql-tag"
import { LayoutFragment_Query } from "components/Layout"

export const Navigation_Query = gql`
  query Navigation_Query {
    ...LayoutFragment_Query
  }
  ${LayoutFragment_Query}
`
