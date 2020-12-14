import { Flex, Layout, MaxWidth, Sans, SnackBar } from "components"
import { CreateAccountForm, createAccountValidationSchema } from "components/Forms/CreateAccountForm"
import {
  CustomerMeasurementsForm,
  customerMeasurementsValidationSchema,
} from "components/Forms/CustomerMeasurementsForm"
import { FormConfirmation } from "components/Forms/FormConfirmation"
import { Step } from "components/Forms/Step"
import { BrandNavItemFragment } from "components/Nav"
import { Wizard } from "components/Forms/Wizard"
import { ChoosePlanStep } from "components/SignUp/ChoosePlanStep"
import { TriageStep } from "components/SignUp/TriageStep"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"

import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { identify, Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation, useQuery } from "@apollo/client"
import { CustomerStatus } from "mobile/Account/Lists"
import { Loader } from "mobile/Loader"
import { getUserSession } from "lib/auth/auth"

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

const GET_SIGNUP_USER = gql`
  query GetSignupUser {
    brands(
      where: { products_some: { id_not: null }, name_not: null, featured: true, published: true }
      orderBy: name_ASC
    ) {
      ...BrandNavItem
    }
    me {
      customer {
        id
        status
        detail {
          id
          height
        }
        user {
          id
        }
        membership {
          id
          plan {
            id
          }
        }
        authorizedAt
        admissions {
          id
          authorizationWindowClosesAt
        }
      }
    }
  }
  ${BrandNavItemFragment}
`

const SignUpPage = screenTrack(() => ({
  page: Schema.PageNames.SignUpPage,
  path: "/signup",
}))(() => {
  const { updateUserSession } = useAuthContext()
  const router = useRouter()
  const tracking = useTracking()
  const { data, refetch: refetchGetSignupUser } = useQuery(GET_SIGNUP_USER)
  const featuredBrandItems = data?.brands || []

  const { signIn } = useAuthContext()
  const [addMeasurements] = useMutation(ADD_MEASUREMENTS)

  const [showSnackBar, setShowSnackBar] = useState(false)
  const [startTriage, setStartTriage] = useState(false)
  const [triageIsRunning, setTriageIsRunning] = useState(false)

  const customerStatus = data?.me?.customer?.status
  const customerDetail = data?.me?.customer?.detail

  // Steps completed
  const hasAccount = !!customerStatus
  const hasMeasurements = !!customerDetail?.height
  const _isAuthorized = !!customerStatus && customerStatus === CustomerStatus.Authorized
  const _isWaitlisted = !!customerStatus && customerStatus === CustomerStatus.Waitlisted

  const [isWaitlisted, setIsWaitlisted] = useState(_isWaitlisted)
  const [isAuthorized, setIsAuthorized] = useState(_isAuthorized)

  useEffect(() => {
    if (_isAuthorized) {
      setIsAuthorized(true)
    }
    if (_isWaitlisted) {
      setIsWaitlisted(true)
    }
  }, [_isWaitlisted, _isAuthorized])

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

  const closeSnackBar = () => {
    setShowSnackBar(false)
  }

  const SnackBarMessage = (
    <Sans size="3">
      Something went wrong creating your account, please{" "}
      <a style={{ color: "inherit" }} href="mailto:membership@seasons.nyc?subject=Help">
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>contact us.</span>
      </a>
    </Sans>
  )

  if (!data) {
    return (
      <Layout fixedNav hideFooter brandItems={featuredBrandItems}>
        <MaxWidth>
          <Flex>
            <Loader />
          </Flex>
        </MaxWidth>
      </Layout>
    )
  }

  const measurementsStep = (
    <Step
      key="measurementsStep"
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
    </Step>
  )

  const triageStep = (
    <Step key="triage">
      {({ wizard, form }) => (
        <TriageStep
          check={startTriage}
          onStartTriage={() => setTriageIsRunning(true)}
          onTriageComplete={(isWaitlisted) => {
            console.log(`onTriageComplete runs`)
            if (isWaitlisted) {
              updateUserSession({ cust: { status: CustomerStatus.Waitlisted } })
              setIsWaitlisted(true)
            } else {
              updateUserSession({ cust: { status: CustomerStatus.Authorized } })
              setIsAuthorized(true)
            }

            tracking.trackEvent({
              actionName: Schema.ActionNames.AccountTriaged,
              actionType: Schema.ActionTypes.Success,
              isWaitlisted,
            })

            setTriageIsRunning(false)
          }}
        />
      )}
    </Step>
  )

  const finishedTriage = (isAuthorized || isWaitlisted) && !triageIsRunning // true && !true --> true && false --> false

  console.log(`finishedTriage: ${finishedTriage}`)
  const steps = [
    ...(hasMeasurements ? [] : [measurementsStep]),
    ...(finishedTriage ? [] : [triageStep]),
    <Step key="formConfirmationOrChoosePlanStep">
      {({ form, wizard }) => {
        return isWaitlisted ? (
          <FormConfirmation status={"waitlisted"} renderNum={"type 1"} />
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
              identify(data?.me?.customer?.user?.id, { status: "Active" })
              setTimeout(() => {
                wizard.next()
              }, 500)
            }}
            onError={() => {}}
          />
        )
      }}
    </Step>,
    <Step key="AccountAcceptedConfirmation">
      {() => {
        return <FormConfirmation status="accountAccepted" renderNum={"type 2"} />
      }}
    </Step>,
  ]

  const hasSteps = steps.length > 0

  let CurrentForm
  switch (customerStatus) {
    case undefined:
      CurrentForm = <CreateAccountForm initialValues={initialValues} onError={() => setShowSnackBar(true)} />
      break
  }

  return (
    <Layout fixedNav hideFooter brandItems={featuredBrandItems}>
      <MaxWidth>
        <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
        <Flex height="100%" width="100%" flexDirection="row" alignItems="center" justifyContent="center">
          {CurrentForm}
          {/* {!(typeof window === "undefined") && hasSteps && <Wizard initialValues={initialValues}>{steps}</Wizard>} */}
        </Flex>
      </MaxWidth>
    </Layout>
  )
})

export default SignUpPage
