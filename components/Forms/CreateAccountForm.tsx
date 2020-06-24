import React, { useEffect } from "react"
import * as Yup from "yup"

import { FormTemplate, FormProps } from "./FormsTemplate"
import { TelephoneMaskField } from "../Fields/TelephoneMaskField"
import ExternalLink from "../ExternalLink"

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

export const CreateAccountValidationSchema = Yup.object().shape({
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

export function CreateAccountForm({ context }: FormProps) {
  // If a token is set in local storage, the checkJWT middleware on the server
  // will throw a hissy fit. So remove it here.
  useEffect(function removeLocalStorageIdenitifiers() {
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
      buttonText="Create Account"
      FieldDefinitionList={[
        { id: "firstName", name: "firstName", label: "First Name" },
        {
          id: "lastName",
          name: "lastName",
          label: "Last Name",
        },
        {
          id: "email",
          name: "email",
          label: "Email Address",
          type: "email",
        },
        {
          id: "password",
          name: "password",
          label: "Password",
          type: "password",
        },
        {
          id: "confirmPassword",
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
        },
        {
          label: "Phone Number",
          customElement: <TelephoneMaskField context={context} />,
        },
      ]}
    />
  )
}
