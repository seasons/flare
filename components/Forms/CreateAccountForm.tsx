import React, { useEffect } from "react"
import * as Yup from "yup"
import { FormTemplate, FormProps } from "./FormsTemplate"
import { TelephoneMaskField } from "../Fields/TelephoneMaskField"
import { ExternalLink } from "../"
import { Schema } from "../../utils/analytics"
import SelectItem from "./SelectItem"

export interface CreateAccountFormFields {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  tel: string
  dob: string
  zipCode: string
  device: string
}

export interface CustomerDetailCreateInput {
  phoneNumber: string
}

const deviceOptions: SelectItem[] = [
  { label: "iOS", value: "iOS" },
  { label: "Android", value: "Android" },
]

export const createAccountValidationSchema = Yup.object().shape({
  email: Yup.string().trim().required("Required").email("Invalid email"),
  firstName: Yup.string().trim().required("Required"),
  lastName: Yup.string().trim().required("Required"),
  password: Yup.string()
    .trim()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be no more than 20 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/1|2|3|4|5|6|7|8|9|0/, "Must include at least one number"),
  confirmPassword: Yup.string()
    .trim()
    .required("Required")
    .test("passwords-match", "Passwords don't match", function (value) {
      return this.parent.password === value
    }),
  tel: Yup.string()
    .trim()
    .required("Required")
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "e.g 123-456-7890"),
  zipCode: Yup.string()
    .trim()
    .required("Required")
    .matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
  device: Yup.string().required("Required"),
})

export const CreateAccountForm = ({ context }: FormProps) => {
  // If a token is set in local storage, the checkJWT middleware on the server
  // will throw a hissy fit. So remove it here.
  useEffect(() => {
    localStorage.removeItem("email")
    localStorage.removeItem("token")
  }, [])

  return (
    <FormTemplate
      context={context}
      stepText="Step 1 of 2"
      headerText="Create an account"
      HeaderDetail={<>You’ll use this to sign into the app, choose your plan, and manage your membership.</>}
      footerText={
        <>
          {"By creating an account, you agree to our "}
          <ExternalLink href="https://www.seasons.nyc/terms-of-service">Terms of Service</ExternalLink>
          {" and "}
          <ExternalLink href="https://www.seasons.nyc/privacy-policy">Privacy Policy</ExternalLink>
        </>
      }
      buttonText="Next"
      buttonActionName={Schema.ActionNames.CreateAccountSubmitButtonClicked}
      fieldDefinitionList={[
        { name: "firstName", placeholder: "Will", label: "First name", mobileOrder: 1 },
        {
          name: "lastName",
          placeholder: "Smith",
          label: "Last name",
          mobileOrder: 2,
        },
        {
          name: "email",
          placeholder: "will.smith@gmail.com",
          label: "Email",
          mobileOrder: 3,
        },
        {
          label: "Phone number",
          placeholder: "(000) - 000 - 0000",
          customElement: <TelephoneMaskField context={context} />,
          mobileOrder: 6,
        },
        {
          name: "password",
          placeholder: "Must have at least 8 characters",
          type: "password",
          label: "Password",
          id: "password",
          mobileOrder: 4,
        },
        {
          name: "confirmPassword",
          placeholder: "Confirm password",
          type: "password",
          label: "Confirm password",
          id: "confirmPassword",
          mobileOrder: 5,
        },
        {
          name: "zipCode",
          type: "zipCode",
          placeholder: "00000",
          label: "Shipping ZIP code",
          mobileOrder: 7,
        },
        {
          name: "device",
          selectOptions: deviceOptions,
          placeholder: "Select",
          label: "Device type",
          mobileOrder: 8,
        },
      ]}
    />
  )
}
