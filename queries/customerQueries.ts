import { gql } from "@apollo/client"

export const SET_IMPACT_ID = gql`
  mutation SetImpactID($impactId: String) {
    addCustomerDetails(details: { impactId: $impactId }) {
      id
    }
  }
`
