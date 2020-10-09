import Chargebee from "chargebee"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import { useMutation } from "@apollo/client"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe, Stripe } from "@stripe/stripe-js"

import { Flex, Layout, MaxWidth, Sans, SnackBar } from "../../components"
import {
  CreateAccountForm, createAccountValidationSchema
} from "../../components/Forms/CreateAccountForm"
import { FormConfirmation } from "../../components/Forms/FormConfirmation"
import { Step } from "../../components/Forms/Step"
import { Wizard } from "../../components/Forms/Wizard"
import { CheckoutStep } from "../../components/SignUp/CheckoutStep"
import { ChoosePlanStep } from "../../components/SignUp/ChoosePlanStep"
import { MeasurementsStep } from "../../components/SignUp/MeasurementsStep"
import { TriageStep } from "../../components/SignUp/TriageStep"
import { CheckWithBackground } from "../../components/SVGs"
import { Schema, screenTrack, useTracking } from "../../utils/analytics"

type ConfirmTextOptions = "accountQueued" | "accountAccepted"

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

const SignUpPage = screenTrack(() => ({
  page: Schema.PageNames.SignUpPage,
  path: "/signup",
}))(() => {
  const tracking = useTracking()
  const router = useRouter()
  const [signUpUser] = useMutation(SIGN_UP_USER)
  const { session_id } = router.query

  const [showSnackBar, setShowSnackBar] = useState(false)
  const [startTriage, setStartTriage] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [confirmText, setConfirmText] = useState<ConfirmTextOptions>("accountAccepted")
  const [isWaitlisted, setIsWaitlisted] = useState(false)

  const [userHasAccount, setUserHasAccount] = useState(false)
  const [userIsConfirmed, setUserIsConfirmed] = useState(false)

  const paymentProcessed = !!session_id

  useEffect(() => {
    setUserHasAccount(!!localStorage.getItem("email"))
    setUserIsConfirmed(localStorage.getItem("isWaitlisted") === "false")
  }, [])

  const stripe = loadStripe("pk_test_RUHQ0ADqBJHmknHqApuPBGS900fJpiEabb")

  const processSession = async (sessionId: string) => {
    const res = await fetch("/api/retrieveSession", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })

    // Get setup_intent
    const data = await res.json()

    console.log("Retrieved session", data)
  }

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
    <MeasurementsStep onFailure={() => setShowSnackBar(true)} />,
  ]

  const triageStep = [
    <Step>
      {({ wizard, form }) => (
        <TriageStep
          check={startTriage}
          onTriageComplete={(isWaitlisted) => {
            setIsWaitlisted(isWaitlisted)
            localStorage.setItem("isWaitlisted", String(isWaitlisted))
            wizard.next()
          }}
        />
      )}
    </Step>,
  ]

  if (paymentProcessed) {
    processSession(session_id as string)
  }

  const steps = paymentProcessed
    ? [
        <Step>
          {({ wizard }) => {
            const data = confirmData[confirmText]
            return <FormConfirmation {...data} />
          }}
        </Step>,
      ]
    : [
        ...(userHasAccount ? [] : noAccountSteps),
        ...(userIsConfirmed ? [] : triageStep),
        <Step>
          {({ wizard }) => {
            const data = confirmData[confirmText]
            return isWaitlisted ? (
              <FormConfirmation {...data} />
            ) : (
              <ChoosePlanStep
                onPlanSelected={(plan) => {
                  setSelectedPlan(plan)
                }}
                onSuccess={() => {
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
          {({ wizard }) => {
            const data = confirmData[confirmText]
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
    <Elements stripe={stripe}>
      <Layout fixedNav hideFooter>
        <MaxWidth>
          <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
          <Flex height="100%" width="100%" flexDirection="row" alignItems="center" justifyContent="center">
            {hasSteps && <Wizard initialValues={initialValues}>{steps}</Wizard>}
          </Flex>
        </MaxWidth>
      </Layout>
    </Elements>
  )
})

export default SignUpPage
