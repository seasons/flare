import { Flex, Layout, MaxWidth, Sans, SnackBar } from "components"
import { CreateAccountForm } from "components/Forms/CreateAccountForm"
import { CustomerMeasurementsForm } from "components/Forms/CustomerMeasurementsForm"
import { FormConfirmation } from "components/Forms/FormConfirmation"
import { BrandNavItemFragment } from "components/Nav"
import { ChoosePlanStep } from "components/SignUp/ChoosePlanStep"
import { TriageStep } from "components/SignUp/TriageStep"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"

import React, { useState, useEffect } from "react"
import { identify, Schema, screenTrack, useTracking } from "utils/analytics"

import { useQuery } from "@apollo/client"
import { CustomerStatus } from "mobile/Account/Lists"
import { Loader } from "mobile/Loader"
import { DateTime } from "luxon"

export interface SignupFormProps {
  onError?: () => void
  onCompleted?: () => void
}

export const GET_SIGNUP_USER = gql`
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
          admissable
          authorizationsCount
          authorizationWindowClosesAt
          allAccessEnabled
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
  const { updateUserSession, userSession } = useAuthContext()
  const tracking = useTracking()
  const { data, refetch: refetchGetSignupUser } = useQuery(GET_SIGNUP_USER)
  const featuredBrandItems = data?.brands || []

  const [showSnackBar, setShowSnackBar] = useState(false)
  const [startTriage, setStartTriage] = useState(false)
  const [triageIsRunning, setTriageIsRunning] = useState(false)

  useEffect(() => {
    console.log(data)
    if (!!data?.me?.customer) {
      updateUserSession({ cust: data?.me?.customer })
    }
  }, [data])

  const customerStatus = userSession?.customer?.status

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

  let CurrentForm
  switch (customerStatus) {
    case undefined:
      CurrentForm = (
        <CreateAccountForm onError={() => setShowSnackBar(true)} onCompleted={() => refetchGetSignupUser()} />
      )
      break
    case "Created":
      CurrentForm = (
        <CustomerMeasurementsForm
          onCompleted={() => {
            setStartTriage(true)
            refetchGetSignupUser()
            updateUserSession({ cust: { status: CustomerStatus.Waitlisted } })
          }}
        />
      )
      break
    case "Waitlisted":
      if (startTriage) {
        CurrentForm = (
          <TriageStep
            check={startTriage}
            onStartTriage={() => setTriageIsRunning(true)}
            onTriageComplete={(isWaitlisted) => {
              if (isWaitlisted) {
                updateUserSession({ cust: { status: CustomerStatus.Waitlisted } })
              } else {
                updateUserSession({ cust: { status: CustomerStatus.Authorized } })
              }

              tracking.trackEvent({
                actionName: Schema.ActionNames.AccountTriaged,
                actionType: Schema.ActionTypes.Success,
                isWaitlisted,
              })

              refetchGetSignupUser()
              setTriageIsRunning(false)
              setStartTriage(false)
            }}
          />
        )
      } else {
        CurrentForm = <FormConfirmation status={"waitlisted"} />
      }
      break
    case "Authorized":
    case "Invited":
      CurrentForm = (
        <ChoosePlanStep
          onPlanSelected={(plan) => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.PlanSelectedButtonClicked,
              actionType: Schema.ActionTypes.Tap,
              plan,
            })
          }}
          onSuccess={() => {
            updateUserSession({ cust: { status: CustomerStatus.Active } })
            localStorage.setItem("paymentProcessed", "true")
            identify(data?.me?.customer?.user?.id, { status: "Active" })
            refetchGetSignupUser()
          }}
          onError={() => {}}
        />
      )
      break
    case "Active":
      CurrentForm = <FormConfirmation status="accountAccepted" />
      break
  }

  return (
    <Layout fixedNav hideFooter brandItems={featuredBrandItems}>
      <MaxWidth>
        <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
        <Flex height="100%" width="100%" flexDirection="row" alignItems="center" justifyContent="center">
          {CurrentForm}
        </Flex>
      </MaxWidth>
    </Layout>
  )
})

export default SignUpPage
