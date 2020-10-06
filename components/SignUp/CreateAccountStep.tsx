import gql from "graphql-tag"
import { DateTime } from "luxon"
import React from "react"

import { useMutation } from "@apollo/react-hooks"

import {
  CreateAccountForm, createAccountValidationSchema
} from "../../components/Forms/CreateAccountForm"
import { Step } from "../../components/Forms/Step"

const SIGN_UP_USER = gql`
  mutation SignupUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $details: CustomerDetailCreateInput!
  ) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName, details: $details) {
      token
      user {
        id
      }
    }
  }
`

interface CreateAccountStepProps {
  onSuccess?: () => void
  onFailure?: () => void
}

export const CreateAccountStep: React.FC<CreateAccountStepProps> = ({ onSuccess, onFailure }) => {
  const [signUpUser] = useMutation(SIGN_UP_USER)

  return (
    <Step
      validationSchema={createAccountValidationSchema}
      onSubmit={async (values, actions) => {
        try {
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
            },
          })
          if (response) {
            localStorage?.setItem("email", values.email)
            localStorage?.setItem("token", response.data.signup.token)
            actions.setSubmitting(false)
            onSuccess?.()
            return true
          }
        } catch (error) {
          if (JSON.stringify(error).includes("email already in db")) {
            actions.setFieldError("email", "User with that email already exists")
          } else {
            console.log("error", error)
            onFailure?.()
            // setShowSnackBar(true)
          }
          actions.setSubmitting(false)
        }
      }}
    >
      {(context) => <CreateAccountForm context={context} />}
    </Step>
  )
}
