import gql from "graphql-tag"

export const ADD_MEASUREMENTS = gql`
  mutation addMeasurements(
    $shoeSize: Int
    $pantLength: Int
    $topSizes: CustomerDetailCreatetopSizesInput
    $waistSizes: CustomerDetailCreatewaistSizesInput
  ) {
    addCustomerDetails(
      details: { shoeSize: $shoeSize, pantLength: $pantLength, topSizes: $topSizes, waistSizes: $waistSizes }
    ) {
      id
    }
  }
`
