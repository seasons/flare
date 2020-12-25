import { Formik } from "formik"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"
import { DateTime } from "luxon"
import { useRouter } from "next/router"
import { GET_SIGNUP_USER, SignupFormProps } from "pages/signup"
import React, { useEffect } from "react"
import * as Yup from "yup"

import { useMutation, useQuery } from "@apollo/client"

import { ExternalLink } from "../"
import { Schema, useTracking } from "../../utils/analytics"
import { TelephoneMaskField } from "../Fields/TelephoneMaskField"
import { FormProps, FormTemplate } from "./FormsTemplate"
import { FormWrapper } from "./FormWrapper"
import SelectItem from "./SelectItem"

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

const deviceOptions: SelectItem[] = [
  { label: "iOS", value: "iOS" },
  { label: "Android", value: "Android" },
]

const SIGN_UP_USER = gql`
  mutation SignupUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $details: CustomerDetailCreateInput!
    $referrerId: String
    $utm: UTMInput
    $giftId: String
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      details: $details
      referrerId: $referrerId
      utm: $utm
      giftId: $giftId
    ) {
      expiresIn
      refreshToken
      token
      customer {
        id
        status
        detail {
          id
          shippingAddress {
            id
            state
          }
        }
        bagItems {
          id
        }
        admissions {
          id
          admissable
          authorizationsCount
          authorizationWindowClosesAt
          allAccessEnabled
        }
        user {
          id
          email
          firstName
          lastName
          createdAt
        }
        coupon {
          id
          amount
          percentage
          type
        }
      }
    }
  }
`

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

interface CreateAccountFormProps extends SignupFormProps {
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
    <FormWrapper
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
      {(context) => (
        <FormTemplate
          context={context}
          headerText="Create an account"
          HeaderDetail={<>You’ll use this to sign into the app, choose your plan, and manage your membership.</>}
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
      )}
    </FormWrapper>
  )
}
