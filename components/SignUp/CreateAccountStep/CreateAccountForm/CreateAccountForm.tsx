import { ExternalLink } from "components"
import { TelephoneMaskField } from "components/Fields/TelephoneMaskField"
import { FormTemplate } from "components/Forms/FormTemplate"
import { GET_SIGNUP_USER } from "components/SignUp/queries"
import { Formik } from "formik"
import { useAuthContext } from "lib/auth/AuthContext"
import { DateTime } from "luxon"
import { useRouter } from "next/router"
import { SignupFormProps } from "pages/signup"
import React from "react"
import { Schema, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"

import { SIGN_UP_USER } from "./queries"
import { createAccountValidationSchema } from "./validationSchema"

const imageURL = require("../../../../public/images/signup/signup_bg.jpg")

export interface CreateAccountFormFields {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  tel?: string
  dob?: string
  zipCode?: string
  device?: string
}

export interface CustomerDetailCreateInput {
  phoneNumber: string
}

const deviceOptions = [
  { label: "iOS", value: "iOS" },
  { label: "Android", value: "Android" },
]

export interface CreateAccountFormProps extends SignupFormProps {
  initialValues: CreateAccountFormFields
  gift?: {
    gift: {
      id: string
    }
    subscription: {
      id: string
      plan_id: string
    }
  }
}

export const CreateAccountForm = ({ initialValues, gift, onError, onCompleted }: CreateAccountFormProps) => {
  const router = useRouter()
  const tracking = useTracking()
  const { signIn } = useAuthContext()
  const [signUpUser] = useMutation(SIGN_UP_USER, {
    refetchQueries: [{ query: GET_SIGNUP_USER }],
    awaitRefetchQueries: true,
  })

  const onSubmit = async (values, actions) => {
    try {
      const utm = JSON.parse(localStorage?.getItem("utm"))
      const date = new Date(values.dob)
      const dateToIso = DateTime.fromJSDate(date).toISO()
      const firstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1)
      const lastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1)
      const impactId = localStorage?.getItem("impactId")
      const response = await signUpUser({
        variables: {
          email: values.email,
          password: values.password,
          firstName,
          lastName,
          details: {
            phoneNumber: values.tel,
            birthday: dateToIso,
            phoneOS: values.device,
            shippingAddress: {
              create: { zipCode: values.zipCode },
            },
            styles: [],
            impactId,
          },
          referrerId: router.query.referrer_id,
          utm,
          ...(!!gift ? { giftId: gift.gift?.id } : {}),
        },
      })

      tracking.trackEvent({
        actionName: Schema.ActionNames.CreateAccountClicked,
        actionType: Schema.ActionTypes.Tap,
      })

      if (response) {
        signIn(response.data.signup)
        localStorage?.setItem("coupon", JSON.stringify(response.data.signup.customer?.coupon))
        actions.setSubmitting(false)

        onCompleted?.()

        return true
      }
    } catch (error) {
      if (JSON.stringify(error).includes("email already in db")) {
        actions.setFieldError("email", "User with that email already exists")
      } else {
        console.log("error", error)
        onError?.()
      }
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        tel: "",
        confirmPassword: "",
        password: "",
        zipCode: "",
        device: "",
        ...initialValues,
      }}
      initialTouched={{ fullName: true }}
      validationSchema={createAccountValidationSchema}
      onSubmit={onSubmit}
    >
      <FormTemplate
        headerText="Create an account"
        headerDescription="You’ll use this to sign into the app, choose your plan, and manage your membership."
        footerText={
          <>
            {"By creating an account, you agree to our "}
            <ExternalLink href="/terms-of-service">Terms of Service</ExternalLink>
            {" and "}
            <ExternalLink href="/privacy-policy">Privacy Policy</ExternalLink>
          </>
        }
        buttonText="Next"
        buttonActionName={Schema.ActionNames.CreateAccountSubmitButtonClicked}
        leftImage={imageURL}
        fields={[
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
            name: "tel",
            placeholder: "(000) - 000 - 0000",
            label: "Phone number",
            customElement: <TelephoneMaskField name="tel" />,
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
    </Formik>
  )
}
