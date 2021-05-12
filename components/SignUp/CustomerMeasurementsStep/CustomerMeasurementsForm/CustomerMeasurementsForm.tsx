import { Box, ExternalLink } from "components"
import { GET_SIGNUP_USER } from "components/SignUp/queries"
import { ADD_MEASUREMENTS } from "queries/customerQueries"
import { Formik } from "formik"
import { SignupFormProps } from "pages/signup"
import React from "react"
import { Schema } from "utils/analytics"
import * as Yup from "yup"

import { useMutation } from "@apollo/client"

import { MultiSelectionTableField } from "../../../Fields/MultiSelectionTableField"
import { FormTemplate } from "../../../Forms/FormTemplate"
import { customerMeasurements } from "../../../Forms/helpers/measurements"

const imageURL = require("../../../../public/images/signup/measurements_bg.jpg")

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
    <Formik
      initialValues={initialValues}
      initialTouched={{ weight: true }}
      validationSchema={customerMeasurementsValidationSchema}
      onSubmit={onSubmit}
    >
      <FormTemplate
        headerText="Let’s get your measurements"
        headerDescription="This helps us accurately recommend you sizes by material, style, and brand."
        leftImage={imageURL}
        footerText={
          <>
            {"By creating an account, you agree to our "}
            <ExternalLink href="/terms-of-service">Terms of Service</ExternalLink>
            {" and "}
            <ExternalLink href="/privacy-policy">Privacy Policy</ExternalLink>
          </>
        }
        buttonText="Next"
        buttonActionName={Schema.ActionNames.CustomerMeasurementsSubmitButtonClicked}
        fields={[
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
                <MultiSelectionTableField inputName={"topSizes"} items={customerMeasurements.topSizes} itemSize={64} />
              </Box>
            ),
            placeholder: "Select",
            label: "What are your preferred top sizes?",
            mobileOrder: 3,
            fullWidth: true,
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
            fullWidth: true,
          },
        ]}
      />
    </Formik>
  )
}
