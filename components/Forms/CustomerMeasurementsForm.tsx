import { ExternalLink, Box } from "components"
import React from "react"
import { Schema } from "utils/analytics"
import * as Yup from "yup"

import { FormProps, FormTemplate } from "./FormsTemplate"
import { MultiSelectionTableField } from "../Fields/MultiSelectionTableField"
import { customerMeasurements } from "./helpers/measurements"
import { FormWrapper } from "./FormWrapper"
import { GET_SIGNUP_USER, SignupFormProps } from "pages/signup"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

export interface CustomerMeasurementsFormFields {
  height: string
  weight: string
  topSizes: string
  waistSizes: string
}

export const customerMeasurementsValidationSchema = Yup.object().shape({
  height: Yup.string().required("Required"),
  weight: Yup.string().required("Required"),
  topSizes: Yup.string().required("Required"),
  waistSizes: Yup.string().required("Required"),
})

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

const initialValues = {
  weight: "",
  height: "",
  topSizes: [""],
  waistSizes: [""],
}

export const CustomerMeasurementsForm = ({ onCompleted, onError }: SignupFormProps) => {
  const [addMeasurements] = useMutation(ADD_MEASUREMENTS, {
    refetchQueries: [{ query: GET_SIGNUP_USER }],
    awaitRefetchQueries: true,
  })

  const onSubmit = async (values, actions) => {
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
        onCompleted?.()
        return true
      }
    } catch (error) {
      actions.setSubmitting(false)
      onError?.()
    }
  }

  return (
    <FormWrapper
      initialValues={initialValues}
      initialTouched={{ weight: true }}
      validationSchema={customerMeasurementsValidationSchema}
      onSubmit={onSubmit}
    >
      {(context) => (
        <FormTemplate
          context={context}
          headerText="Let’s get your measurements"
          HeaderDetail={<>This helps us accurately recommend you sizes by material, style, and brand.</>}
          footerText={
            <>
              {"By creating an account, you agree to our "}
              <ExternalLink href="https://www.seasons.nyc/terms-of-service">Terms of Service</ExternalLink>
              {" and "}
              <ExternalLink href="https://www.seasons.nyc/privacy-policy">Privacy Policy</ExternalLink>
            </>
          }
          buttonText="Create account"
          buttonActionName={Schema.ActionNames.CustomerMeasurementsSubmitButtonClicked}
          fieldDefinitionList={[
            {
              name: "height",
              selectOptions: customerMeasurements.heights,
              placeholder: "Select",
              label: "Height",
              mobileOrder: 1,
            },
            {
              name: "weight",
              selectOptions: customerMeasurements.weights,
              placeholder: "Select",
              label: "Weight",
              mobileOrder: 2,
            },
            {
              name: "topSizes",
              customElement: (
                <Box mt={1}>
                  <MultiSelectionTableField
                    inputName={"topSizes"}
                    items={customerMeasurements.topSizes}
                    itemSize={64}
                  />
                </Box>
              ),
              placeholder: "Select",
              label: "What are your preferred top sizes?",
              mobileOrder: 3,
            },
            {
              name: "waistSizes",
              customElement: (
                <Box mt={1}>
                  <MultiSelectionTableField
                    inputName={"waistSizes"}
                    items={customerMeasurements.waistSizes}
                    itemSize={64}
                  />
                </Box>
              ),
              placeholder: "Select",
              label: "Preferred waist sizes?",
              mobileOrder: 4,
            },
          ]}
        />
      )}
    </FormWrapper>
  )
}
