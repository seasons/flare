import { Box, ExternalLink } from "components"
import { GET_SIGNUP_USER } from "components/SignUp/queries"
import { Formik } from "formik"
import { SignupFormProps } from "pages/signup"
import React, { useState } from "react"
import { Schema } from "utils/analytics"
import * as Yup from "yup"

import { useMutation, useQuery } from "@apollo/client"

import { SelectionTableField } from "components/Fields/SelectionTableField"
import { FormTemplate } from "components/Forms/FormTemplate"
import { ADD_PERSONAL_DETAILS, personalDetailsFormData, PERSONAL_DETAILS_STEP_QUERY } from "./PersonalDetailsFormData"
import { SignupStyles } from "./SignupStyles"

const personalDetailsStepValidationSchema = Yup.object().shape({
  ageRange: Yup.string().required("Required"),
  averageSpend: Yup.string().required("Required"),
})

const initialValues = {
  ageRange: "",
  averageSpend: "",
}

const imageURL = require("../../../public/images/signup/TellUsImage.jpg")

export const PersonalDetailsStep = ({ onCompleted, onError }: SignupFormProps) => {
  const { data } = useQuery(PERSONAL_DETAILS_STEP_QUERY)
  const [selectedProductsIDs, setSelectedProductsIDs] = useState([])

  const [addPersonalDetails] = useMutation(ADD_PERSONAL_DETAILS, {
    refetchQueries: [{ query: GET_SIGNUP_USER }],
    awaitRefetchQueries: true,
  })

  const onSubmit = async (values, actions) => {
    const { ageRange, averageSpend } = values

    try {
      const response = await addPersonalDetails({
        variables: {
          ageRange,
          averageSpend,
          signupLikedProducts: {
            connect: selectedProductsIDs.map((id) => {
              return { id }
            }),
          },
        },
      })
      if (response) {
        actions.setSubmitting(false)
        onCompleted?.()
        return true
      }
    } catch (error) {
      actions.setSubmitting(false)
      console.log("error", error)
      onError?.()
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      initialTouched={{ weight: true }}
      validationSchema={personalDetailsStepValidationSchema}
      onSubmit={onSubmit}
    >
      <FormTemplate
        contentMaxWidth="562px"
        headerText="Tell us a little about yourself"
        headerDescription="This helps us more accurately recommend you styles and brands."
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
            name: "ageRange",
            customElement: (
              <Box mt={1}>
                <SelectionTableField inputName={"ageRange"} items={personalDetailsFormData.ageRanges} itemWidth={123} />
              </Box>
            ),
            placeholder: "Select",
            label: "Age range?",
            mobileOrder: 1,
            fullWidth: true,
          },
          {
            name: "averageSpend",
            customElement: (
              <Box mt={1}>
                <SelectionTableField
                  inputName={"averageSpend"}
                  items={personalDetailsFormData.averageSpend}
                  itemWidth={253}
                  itemHeight={104}
                />
              </Box>
            ),
            placeholder: "Select",
            label: "Average monthly budget",
            labelSecondaryText: "(how much do you usually spend?)",
            mobileOrder: 2,
            fullWidth: true,
          },
          {
            name: "signupLikedStyles",
            customElement: (
              <Box mt={1}>
                <SignupStyles
                  products={data?.products}
                  setSelectedProductsIDs={setSelectedProductsIDs}
                  selectedProductsIDs={selectedProductsIDs}
                />
              </Box>
            ),
            placeholder: "Select",
            label: "Which of these styles would you wear? ",
            labelSecondaryText: "(this will help us recommend brands)",
            mobileOrder: 4,
            fullWidth: true,
          },
        ]}
      />
    </Formik>
  )
}
