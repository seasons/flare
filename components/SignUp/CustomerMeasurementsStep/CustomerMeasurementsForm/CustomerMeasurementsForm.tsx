import { Box, ExternalLink } from "components"
import { GET_SIGNUP_USER } from "components/SignUp/queries"
import { ADD_MEASUREMENTS } from "queries/customerQueries"
import { Formik } from "formik"
import { SignupFormProps } from "pages/signup"
import React from "react"
import { Schema } from "utils/analytics"
import * as Yup from "yup"

import { useMutation } from "@apollo/client"

import { FormTemplate } from "../../../Forms/FormTemplate"
import { customerMeasurements } from "../../../Forms/helpers/measurements"
import { SelectionTableField } from "components/Fields/SelectionTableField"

const imageURL = require("../../../../public/images/signup/measurements_bg.jpg")

export interface CustomerMeasurementsFormFields {
  pantLength: string
  shoeSize: string
  topSizes: string
  waistSizes: string
}

export const customerMeasurementsValidationSchema = Yup.object().shape({
  pantLength: Yup.string().required("Required"),
  shoeSize: Yup.string().required("Required"),
  topSizes: Yup.string().required("Required"),
  waistSizes: Yup.string().required("Required"),
})

const initialValues = {
  pantLength: "",
  shoeSize: "",
  topSizes: [""],
  waistSizes: [""],
}

export const CustomerMeasurementsForm = ({ onCompleted, onError }: SignupFormProps) => {
  const [addMeasurements] = useMutation(ADD_MEASUREMENTS, {
    refetchQueries: [{ query: GET_SIGNUP_USER }],
    awaitRefetchQueries: true,
  })

  const onSubmit = async (values, actions) => {
    const { shoeSize, pantLength, topSizes, waistSizes } = values
    const filteredWaistSizes = waistSizes.filter((i) => i !== "")
    const filteredTopSizes = topSizes.filter((i) => i !== "")

    try {
      const response = await addMeasurements({
        variables: {
          shoeSize,
          pantLength,
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
        headerText="Let’s get your sizes"
        headerDescription="This helps us accurately recommend you sizes by brand."
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
            name: "topSizes",
            customElement: (
              <Box mt={1}>
                <SelectionTableField
                  multiple
                  inputName={"topSizes"}
                  items={customerMeasurements.topSizes}
                  itemSize={64}
                />
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
                <SelectionTableField
                  multiple
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
          {
            name: "pantLengths",
            customElement: (
              <Box mt={1}>
                <SelectionTableField inputName={"pantLengths"} items={customerMeasurements.pantLengths} itemSize={64} />
              </Box>
            ),
            placeholder: "Select",
            label: "Preferred panth length?",
            mobileOrder: 5,
            fullWidth: true,
          },
          {
            name: "shoeSize",
            customElement: (
              <Box mt={1}>
                <SelectionTableField inputName={"shoeSize"} items={customerMeasurements.shoeSizes} itemSize={64} />
              </Box>
            ),
            placeholder: "Select",
            label: "Preferred shoe size?",
            mobileOrder: 6,
            fullWidth: true,
          },
        ]}
      />
    </Formik>
  )
}
