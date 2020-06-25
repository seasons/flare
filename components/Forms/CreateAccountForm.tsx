import React, { useEffect } from "react"
import * as Yup from "yup"

import { FormTemplate, FormProps } from "./FormsTemplate"
import { TelephoneMaskField } from "../Fields/TelephoneMaskField"
import ExternalLink from "../ExternalLink"
import { Field } from "formik"
import { SelectField } from "../Fields/SelectField"

export interface CreateAccountFormFields {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  tel: string
}

export interface CustomerDetailCreateInput {
  phoneNumber: string
}

export const createAccountValidationSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be no more than 20 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/1|2|3|4|5|6|7|8|9|0/, "Must include at least one number"),
  confirmPassword: Yup.string()
    .required("Required")
    .test("passwords-match", "Passwords don't match", function (value) {
      return this.parent.password === value
    }),
  tel: Yup.string()
    .required("Required")
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "e.g 123-456-7890"),
})

export const CreateAccountForm = ({ context }: FormProps) => {
  console.log("createFormcontext", context)
  // If a token is set in local storage, the checkJWT middleware on the server
  // will throw a hissy fit. So remove it here.
  useEffect(() => {
    localStorage.removeItem("email")
    localStorage.removeItem("token")
  }, [])

  return (
    <FormTemplate
      context={context}
      headerText="Create an account"
      HeaderDetail={<>You’ll use this to sign into the app, choose your plan, & manage your membership</>}
      FooterDetail={
        <>
          {"By creating an account, you agree to our "}
          <ExternalLink href="https://www.seasons.nyc/terms-of-service">Terms of Service</ExternalLink>
          {" and "}
          <ExternalLink href="https://www.seasons.nyc/privacy-policy">Privacy Policy</ExternalLink>
        </>
      }
      buttonText="Create account"
      fieldDefinitionList={[
        { id: "firstName", name: "firstName", label: "Will", title: "First name" },
        {
          id: "lastName",
          name: "lastName",
          label: "Smith",
          title: "Last name",
        },
        {
          id: "email",
          name: "email",
          type: "email",
          label: "will.smith@gmail.com",
          title: "Email",
        },
        {
          title: "Phone number",
          label: "(000) - 000 - 0000",
          customElement: <TelephoneMaskField context={context} />,
        },
        {
          id: "password",
          name: "password",
          label: "Must have at least 7 characters",
          type: "password",
          title: "Password",
        },
        {
          id: "confirmPassword",
          name: "confirmPassword",
          label: "Confirm password",
          type: "password",
          title: "Confirm password",
        },
        {
          id: "zipCode",
          name: "zipcode",
          type: "zipcode",
          label: "00000",
          title: "ZIP code",
        },
        {
          customElement: (
            <Field
              component={SelectField}
              onChange={null}
              onBlur={null}
              type="text"
              id="deviceType"
              name="deviceType"
              label="Select"
              autoFocus
            />
          ),
          label: "Select",
          title: "Device type",
        },
      ]}
    />
  )
}
