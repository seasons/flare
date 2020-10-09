import gql from "graphql-tag"
import React from "react"

import { useMutation } from "@apollo/client"

import {
  CustomerMeasurementsForm, customerMeasurementsValidationSchema
} from "../../components/Forms/CustomerMeasurementsForm"
import { Step } from "../../components/Forms/Step"

const ADD_MEASUREMENTS = gql`
  mutation addMeasurements(
    $height: Int
    $weight: CustomerDetailCreateweightInput
    $topSizes: CustomerDetailCreatetopSizesInput
    $waistSizes: CustomerDetailCreatewaistSizesInput
  ) {
    addCustomerDetails(
      details: { height: $height, weight: $weight, topSizes: $topSizes, waistSizes: $waistSizes }
      status: Waitlisted
      event: CompletedWaitlistForm
    ) {
      id
    }
  }
`

interface MeasurementsStepProps {
  onSuccess?: () => void
  onFailure?: () => void
}

export const MeasurementsStep: React.FC<MeasurementsStepProps> = ({ onSuccess, onFailure }) => {
  const [addMeasurements] = useMutation(ADD_MEASUREMENTS)

  return (
    <Step
      validationSchema={customerMeasurementsValidationSchema}
      onSubmit={async (values, actions) => {
        const { height, weight, topSizes, waistSizes } = values
        const filteredWaistSizes = waistSizes.filter((i) => i !== "")
        const filteredTopSizes = topSizes.filter((i) => i !== "")
        try {
          const response = await addMeasurements({
            variables: {
              height,
              weight: { set: weight },
              topSizes: { set: filteredTopSizes },
              waistSizes: { set: filteredWaistSizes },
            },
          })
          if (response) {
            actions.setSubmitting(false)
            onSuccess?.()
            return true
          }
        } catch (error) {
          console.log("error", error)
          onFailure?.()
          actions.setSubmitting(false)
        }
      }}
    >
      {(context) => <CustomerMeasurementsForm context={context} />}
    </Step>
  )
}
