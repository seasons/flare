import { Flex, Layout, MaxWidth, Sans, SnackBar } from "components"
import { FormConfirmation } from "components/Forms/FormConfirmation"
import { BrandNavItemFragment } from "components/Nav"
import { ChoosePlanStep } from "components/SignUp/ChoosePlanStep"
import { CreateAccountStep } from "components/SignUp/CreateAccountStep/CreateAccountStep"
import { CustomerMeasurementsStep } from "components/SignUp/CustomerMeasurementsStep"
import { DiscoverStyleStep } from "components/SignUp/DiscoverStyleStep"
import { TriageStep } from "components/SignUp/TriageStep"
import { SplashScreen } from "components/SplashScreen/SplashScreen"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"
import { CustomerStatus } from "mobile/Account/Lists"
import { Loader } from "mobile/Loader"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { identify, Schema, screenTrack, useTracking } from "utils/analytics"

import { useLazyQuery, useQuery } from "@apollo/client"

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
          styles
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
        }
      }
    }
  }
  ${BrandNavItemFragment}
`

const GET_GIFT = gql`
  query GetGift($giftID: String!) {
    gift(id: $giftID) {
      gift
      subscription
    }
  }
`

const SignUpPage = screenTrack(() => ({
  page: Schema.PageNames.SignUpPage,
  path: "/signup",
}))(() => {
  const { updateUserSession, userSession } = useAuthContext()
  const tracking = useTracking()
  const router = useRouter()
  const { data, refetch: refetchGetSignupUser } = useQuery(GET_SIGNUP_USER)
  const featuredBrandItems = data?.brands || []

  const [showSnackBar, setShowSnackBar] = useState(false)
  const [startTriage, setStartTriage] = useState(false)
  const [triageIsRunning, setTriageIsRunning] = useState(false)
  const [showReferrerSplash, setShowReferrerSplash] = useState(false)

  const customer = data?.me?.customer

  const hasSetMeasurements = !!customer?.detail?.height
  const hasStyles = customer?.detail?.styles.length > 0
  const [showDiscoverStyle, setShowDiscoverStyle] = useState(!hasStyles)

  const hasGift = !!router.query.gift_id
  const [getGift, { data: giftData, loading: giftLoading }] = useLazyQuery(GET_GIFT)

  useEffect(() => {
    if (!!customer) {
      updateUserSession({ cust: customer })
    }
  }, [data])

  useEffect(() => {
    const giftID = router.query.gift_id
    if (hasGift && giftID.length > 0) {
      getGift({
        variables: { giftID },
      })
    }
  }, [hasGift])

  useEffect(() => {
    setShowReferrerSplash(!!router.query.referrer_id)
  }, [router.query?.referrer_id])

  const customerDataFromGift = () => {
    if (!hasGift) {
      return {}
    }
    const giftReceiver = giftData?.gift?.gift?.gift_receiver
    if (!!giftReceiver) {
      const { email, first_name, last_name } = giftReceiver
      return {
        email,
        firstName: first_name,
        lastName: last_name,
      }
    }
    return {}
  }

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

  if (!data || (hasGift && giftLoading)) {
    return (
      <Layout hideFooter brandItems={featuredBrandItems}>
        <MaxWidth>
          <Flex>
            <Loader />
          </Flex>
        </MaxWidth>
      </Layout>
    )
  }

  let CurrentStep
  switch (customerStatus) {
    case undefined:
      CurrentStep = (
        <CreateAccountStep
          form={{
            initialValues: customerDataFromGift(),
            gift: giftData?.gift,
            onError: () => setShowSnackBar(true),
            onCompleted: () => refetchGetSignupUser(),
          }}
        />
      )
      break
    case "Created":
      if (hasSetMeasurements && showDiscoverStyle) {
        CurrentStep = (
          <DiscoverStyleStep
            onCompleted={() => {
              setStartTriage(true)
              setShowDiscoverStyle(false)
              updateUserSession({ cust: { status: CustomerStatus.Waitlisted } })
            }}
          />
        )
      } else {
        CurrentStep = (
          <CustomerMeasurementsStep
            form={{
              onCompleted: () => {
                refetchGetSignupUser()
                setShowDiscoverStyle(true)
              },
            }}
          />
        )
      }
      break
    case "Waitlisted":
      if (startTriage) {
        CurrentStep = (
          <TriageStep
            check={startTriage}
            onStartTriage={() => setTriageIsRunning(true)}
            onTriageComplete={(isWaitlisted) => {
              if (isWaitlisted) {
                updateUserSession({ cust: { status: CustomerStatus.Waitlisted } })
              } else if (hasGift) {
                updateUserSession({ cust: { status: CustomerStatus.Active } })
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
        CurrentStep = <FormConfirmation status={"waitlisted"} />
      }
      break
    case "Authorized":
    case "Invited":
      CurrentStep = (
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
      CurrentStep = <FormConfirmation status="accountAccepted" />
      break
  }

  return (
    <Layout hideFooter brandItems={featuredBrandItems} showIntercom={false}>
      <MaxWidth>
        <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
        <Flex height="100%" width="100%" flexDirection="row" alignItems="center" justifyContent="center">
          {CurrentStep}
        </Flex>
      </MaxWidth>

      <SplashScreen
        open={showReferrerSplash}
        title="Welcome to Seasons"
        subtitle="It looks like you were referred by a friend. Get a free month of Seasons when you successfully sign up!"
        descriptionLines={[
          "Free shipping, returns, & dry cleaning",
          "Purchase items you love directly with us",
          "No commitment. Pause or cancel anytime",
        ]}
        imageURL={require("../../public/images/signup/Friend_Pic.png")}
        primaryButton={{
          text: "Sign Up",
          action: () => {
            setShowReferrerSplash(false)
          },
        }}
      />
    </Layout>
  )
})

export default SignUpPage
