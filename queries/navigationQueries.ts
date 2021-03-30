import gql from "graphql-tag"
import { NavFragment_Query } from "components/Nav/Nav"

export const Navigation_Query = gql`
  query Navigation_Query {
    ...NavFragment_Query
  }
  ${NavFragment_Query}
`
