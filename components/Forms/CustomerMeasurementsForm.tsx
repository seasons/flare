import React from "react"
import * as Yup from "yup"
import { FormTemplate, FormProps } from "./FormsTemplate"
import { ExternalLink } from "../"
import { Schema } from "../../utils/analytics"
import { customerMeasurements } from "./helpers/measurements"

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

export const CustomerMeasurementsForm = ({ context }: FormProps) => {
  return (
    <FormTemplate
      context={context}
      headerText="Let’s get your measurements"
      stepText="Step 2 of 2"
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
          selectOptions: customerMeasurements.topSizes,
          placeholder: "Select",
          multiple: true,
          label: "What are your preferred top sizes?",
          mobileOrder: 3,
        },
        {
          name: "waistSizes",
          selectOptions: customerMeasurements.waistSizes,
          placeholder: "Select",
          multiple: true,
          label: "Preferred waist sizes?",
          mobileOrder: 4,
        },
      ]}
    />
  )
}
