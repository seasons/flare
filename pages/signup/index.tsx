import { Flex, Layout, MaxWidth, Sans, SnackBar } from "components"
import { CreateAccountForm, createAccountValidationSchema } from "components/Forms/CreateAccountForm"
import {
  CustomerMeasurementsForm,
  customerMeasurementsValidationSchema,
} from "components/Forms/CustomerMeasurementsForm"
import { FormConfirmation } from "components/Forms/FormConfirmation"
import { Step } from "components/Forms/Step"
import { Wizard } from "components/Forms/Wizard"
import { FEATURED_BRAND_LIST } from "components/Nav"
import { ChoosePlanStep } from "components/SignUp/ChoosePlanStep"
import { TriageStep } from "components/SignUp/TriageStep"
import { CheckWithBackground } from "components/SVGs"
import gql from "graphql-tag"
import { initializeApollo } from "lib/apollo/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import { DateTime } from "luxon"
import { useRouter } from "next/router"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import React, { useEffect, useState } from "react"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation, useQuery } from "@apollo/client"

const SIGN_UP_USER = gql`
  mutation SignupUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $details: CustomerDetailCreateInput!
    $referrerId: String
    $utm: UTMInput
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      details: $details
      referrerId: $referrerId
      utm: $utm
    ) {
      expiresIn
      refreshToken
      token
      user {
        id
        email
        firstName
        lastName
        beamsToken
        roles
      }
      coupon {
        id
        amount
        percentage
        type
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
  const { data } = useQuery(NAVIGATION_QUERY, {
    variables: {
      featuredBrandSlugs: FEATURED_BRAND_LIST,
    },
  })
  const featuredBrandItems = data?.brands || []

  const { userSession, signIn, signOut } = useAuthContext()
  const [signUpUser] = useMutation(SIGN_UP_USER)
  const [addMeasurements] = useMutation(ADD_MEASUREMENTS)

  const [showSnackBar, setShowSnackBar] = useState(false)
  const [startTriage, setStartTriage] = useState(false)
  const [isWaitlisted, setIsWaitlisted] = useState(false)
  const [paymentProcessed, setPaymentProcessed] = useState(false)

  const [userHasAccount, setUserHasAccount] = useState(false)
  const [userIsConfirmed, setUserIsConfirmed] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserHasAccount(!!userSession)
      setIsWaitlisted(localStorage.getItem("isWaitlisted") === "true")
      setUserIsConfirmed(!!localStorage.getItem("isWaitlisted"))
      setPaymentProcessed(localStorage.getItem("paymentProcessed") === "true")
    }
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
      headerText: "Welcome to Seasons",
      bodyText: "Your membership is active and you’re ready to start reserving. Tap below to start browsing",
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
            },
          })

          tracking.trackEvent({
            actionName: Schema.ActionNames.CreateAccountClicked,
            actionType: Schema.ActionTypes.Tap,
          })

          if (response) {
            signIn(response.data.signup)
            localStorage?.setItem("coupon", JSON.stringify(response.data.signup.coupon))
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
        <Step onSubmit={async (values, actions) => {}}>
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
    <Layout fixedNav hideFooter brandItems={featuredBrandItems}>
      <MaxWidth>
        <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
        <Flex height="100%" width="100%" flexDirection="row" alignItems="center" justifyContent="center">
          {!(typeof window === "undefined") && hasSteps && <Wizard initialValues={initialValues}>{steps}</Wizard>}
        </Flex>
      </MaxWidth>
    </Layout>
  )
})

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: NAVIGATION_QUERY,
    variables: {
      featuredBrandSlugs: FEATURED_BRAND_LIST,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default SignUpPage
