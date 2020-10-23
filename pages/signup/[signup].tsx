import { useMutation } from "@apollo/client"
import { Flex, Layout, MaxWidth, Sans, SnackBar } from "components"
import { CreateAccountForm, createAccountValidationSchema } from "components/Forms/CreateAccountForm"
import {
  CustomerMeasurementsForm,
  customerMeasurementsValidationSchema,
} from "components/Forms/CustomerMeasurementsForm"
import { FormConfirmation } from "components/Forms/FormConfirmation"
import { Step } from "components/Forms/Step"
import { Wizard } from "components/Forms/Wizard"
import { ChoosePlanStep } from "components/SignUp/ChoosePlanStep"
import { TriageStep } from "components/SignUp/TriageStep"
import { CheckWithBackground } from "components/SVGs"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Schema, screenTrack, useTracking } from "utils/analytics"

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

const ADD_MEASUREMENTS = gql`
  mutation addMeasurements(
    $height: Int
    $weight: CustomerDetailCreateweightInput
    $topSizes: CustomerDetailCreatetopSizesInput
    $waistSizes: CustomerDetailCreatewaistSizesInput
  ) {
    addCustomerDetails(
      details: { height: $height, weight: $weight, topSizes: $topSizes, waistSizes: $waistSizes }
      status: Waitlisted
      event: CompletedWaitlistForm
    ) {
      id
    }
  }
`

const SignUpPage = screenTrack(() => ({
  page: Schema.PageNames.SignUpPage,
  path: "/signup",
}))(() => {
  const router = useRouter()
  const tracking = useTracking()
  const [signUpUser] = useMutation(SIGN_UP_USER)
  const [addMeasurements] = useMutation(ADD_MEASUREMENTS)
  console.log(router.query.id)

  const [showSnackBar, setShowSnackBar] = useState(false)
  const [startTriage, setStartTriage] = useState(false)
  const [isWaitlisted, setIsWaitlisted] = useState(false)
  const [paymentProcessed, setPaymentProcessed] = useState(false)

  const [userHasAccount, setUserHasAccount] = useState(false)
  const [userIsConfirmed, setUserIsConfirmed] = useState(false)

  useEffect(() => {
    setUserHasAccount(!!localStorage.getItem("email"))
    setIsWaitlisted(localStorage.getItem("isWaitlisted") === "true")
    setUserIsConfirmed(!!localStorage.getItem("isWaitlisted"))
    setPaymentProcessed(localStorage.getItem("paymentProcessed") === "true")
  }, [])

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    tel: "",
    confirmPassword: "",
    password: "",
    zipCode: "",
    device: "",
    weight: "",
    height: "",
    topSizes: [""],
    waistSizes: [""],
  }

  const confirmData = {
    waitlisted: {
      icon: <CheckWithBackground backgroundColor={"#000"} />,
      headerText: "You're Waitlisted",
      bodyText: "We’ll let you know when your account is ready and you’re able to choose your plan.",
    },
    accountAccepted: {
      icon: <CheckWithBackground />,
      headerText: "You’ve successfully created your account.",
      bodyText:
        "Download the Seasons iOS app on TestFlight to finish creating your profile, see your account status and get notified when you’re ready to choose your plan. In the meantime, follow us on Instagram for updates.",
    },
  }

  const closeSnackBar = () => {
    setShowSnackBar(false)
  }

  const noAccountSteps = [
    <Step
      validationSchema={createAccountValidationSchema}
      onSubmit={async (values, actions) => {
        try {
          // Remove email token so that it doesn't get sent and triggers a JWT error
          // when creating a new account
          localStorage?.removeItem("email")
          localStorage?.removeItem("token")

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

          tracking.trackEvent({
            actionName: Schema.ActionNames.CreateAccountClicked,
            actionType: Schema.ActionTypes.Tap,
          })

          if (response) {
            localStorage?.setItem("email", values.email)
            localStorage?.setItem("token", response.data.signup.token)
            actions.setSubmitting(false)

            return true
          }
        } catch (error) {
          if (JSON.stringify(error).includes("email already in db")) {
            actions.setFieldError("email", "User with that email already exists")
          } else {
            console.log("error", error)
            setShowSnackBar(true)
          }
          actions.setSubmitting(false)
        }
      }}
    >
      {(context) => <CreateAccountForm context={context} />}
    </Step>,
    <Step
      validationSchema={customerMeasurementsValidationSchema}
      onSubmit={async (values, actions) => {
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
            setStartTriage(true)
            return true
          }
        } catch (error) {
          actions.setSubmitting(false)
        }
      }}
    >
      {(context) => <CustomerMeasurementsForm context={context} />}
    </Step>,
  ]

  const triageStep = [
    <Step>
      {({ wizard, form }) => (
        <TriageStep
          check={startTriage}
          onTriageComplete={(isWaitlisted) => {
            setIsWaitlisted(isWaitlisted)
            localStorage.setItem("isWaitlisted", String(isWaitlisted))

            tracking.trackEvent({
              actionName: Schema.ActionNames.AccountTriaged,
              actionType: Schema.ActionTypes.Success,
              isWaitlisted,
            })

            setTimeout(() => {
              wizard.next()
            }, 1000)
          }}
        />
      )}
    </Step>,
  ]

  const steps = paymentProcessed
    ? [
        <Step>
          {() => {
            const data = confirmData[isWaitlisted ? "waitlisted" : "accountAccepted"]
            return <FormConfirmation {...data} />
          }}
        </Step>,
      ]
    : [
        ...(userHasAccount ? [] : noAccountSteps),
        ...(userIsConfirmed ? [] : triageStep),
        <Step>
          {({ form, wizard }) => {
            const data = confirmData[isWaitlisted ? "waitlisted" : "accountAccepted"]

            return isWaitlisted ? (
              <FormConfirmation {...data} />
            ) : (
              <ChoosePlanStep
                onPlanSelected={(plan) => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.PlanSelectedButtonClicked,
                    actionType: Schema.ActionTypes.Tap,
                    plan,
                    user: form.values,
                  })
                }}
                onSuccess={() => {
                  localStorage.setItem("paymentProcessed", "true")
                  setTimeout(() => {
                    wizard.next()
                  }, 500)
                }}
                onError={() => {}}
              />
            )
          }}
        </Step>,
        <Step>
          {() => {
            const data = confirmData["accountAccepted"]
            return <FormConfirmation {...data} />
          }}
        </Step>,
      ]

  const hasSteps = steps.length > 0

  const SnackBarMessage = (
    <Sans size="3">
      Something went wrong creating your account, please{" "}
      <a style={{ color: "inherit" }} href="mailto:membership@seasons.nyc?subject=Help">
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>contact us.</span>
      </a>
    </Sans>
  )

  return (
    <Layout fixedNav hideFooter>
      <MaxWidth>
        <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
        <Flex height="100%" width="100%" flexDirection="row" alignItems="center" justifyContent="center">
          {hasSteps && <Wizard initialValues={initialValues}>{steps}</Wizard>}
        </Flex>
      </MaxWidth>
    </Layout>
  )
})

SignUpPage.getInitialProps = async ({ query }) => {
  return query
}

export default SignUpPage
