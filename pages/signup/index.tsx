import { Flex, Layout, MaxWidth, Sans, SnackBar } from "components"
import { FormConfirmation } from "components/Forms/FormConfirmation"
import { ChoosePlanStep } from "components/SignUp/ChoosePlanStep"
import { CreateAccountStep } from "components/SignUp/CreateAccountStep/CreateAccountStep"
import { CustomerMeasurementsStep } from "components/SignUp/CustomerMeasurementsStep"
import { DiscoverStyleStep } from "components/SignUp/DiscoverStyleStep"
import { TriageStep } from "components/SignUp/TriageStep"
import { SplashScreen } from "components/SplashScreen/SplashScreen"
import { Loader } from "mobile/Loader"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { identify, Schema, screenTrack, useTracking } from "utils/analytics"

import { useLazyQuery, useQuery } from "@apollo/client"
import { DiscoverBagStep } from "components/SignUp/DiscoverBagStep"
import { GET_SIGNUP_USER, GET_GIFT } from "./queries"
import { GET_LOCAL_BAG } from "@seasons/eclipse"

export interface SignupFormProps {
  onError?: () => void
  onCompleted?: () => void
}

enum Steps {
  CreateAccountStep = "CreateAccountStep",
  DiscoverStyleStep = "DiscoverStyleStep",
  CustomerMeasurementsStep = "CustomerMeasurementsStep",
  TriageStep = "TriageStep",
  DiscoverBagStep = "DiscoverBagStep",
  ChoosePlanStep = "ChoosePlanStep",
  FormConfirmation = "FormConfirmation",
}

const SignUpPage = screenTrack(() => ({
  page: Schema.PageNames.SignUpPage,
  path: "/signup",
}))(() => {
  const tracking = useTracking()
  const router = useRouter()
  const { previousData, data = previousData, refetch: refetchGetSignupUser } = useQuery(GET_SIGNUP_USER)
  const { data: localItems } = useQuery(GET_LOCAL_BAG)
  const featuredBrandItems = data?.brands || []

  const [currentStepState, setCurrentStepState] = useState<Steps>(Steps.CreateAccountStep)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [startTriage, setStartTriage] = useState(false)
  const [showReferrerSplash, setShowReferrerSplash] = useState(false)

  const customer = data?.me?.customer
  const customerStatus = customer?.status
  const hasBagItems = data?.me?.bag?.length > 0 || localItems?.localBagItems?.length > 0
  const hasSetMeasurements = !!customer?.detail?.height

  const hasGift = !!router.query.gift_id
  const [getGift, { data: giftData, loading: giftLoading }] = useLazyQuery(GET_GIFT)

  useEffect(() => {
    const giftID = router.query.gift_id
    if (hasGift && giftID.length > 0) {
      getGift({
        variables: { giftID },
      })
    }
  }, [hasGift])

  useEffect(() => {
    if (!!customerStatus && currentStepState === Steps.CreateAccountStep) {
      switch (customerStatus) {
        case undefined:
          setCurrentStepState(Steps.CreateAccountStep)
          break
        case "Created":
          if (hasSetMeasurements) {
            setCurrentStepState(Steps.DiscoverStyleStep)
          } else {
            setCurrentStepState(Steps.CustomerMeasurementsStep)
          }
          break
        case "Authorized":
        case "Invited":
          if (hasBagItems) {
            setCurrentStepState(Steps.ChoosePlanStep)
          } else {
            setCurrentStepState(Steps.DiscoverBagStep)
          }
          break
        case "Waitlisted":
        case "Active":
          setCurrentStepState(Steps.FormConfirmation)
          break
      }
    }
  }, [customerStatus, hasSetMeasurements, hasBagItems])

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

  if (!data || (hasGift && giftLoading) || !currentStepState) {
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
  switch (currentStepState) {
    case Steps.CreateAccountStep:
      CurrentStep = (
        <CreateAccountStep
          form={{
            initialValues: customerDataFromGift(),
            gift: giftData?.gift,
            onError: () => setShowSnackBar(true),
            onCompleted: () => setCurrentStepState(Steps.CustomerMeasurementsStep),
          }}
        />
      )
      break
    case Steps.CustomerMeasurementsStep:
      CurrentStep = (
        <CustomerMeasurementsStep
          form={{
            onCompleted: () => {
              refetchGetSignupUser()
              setCurrentStepState(Steps.DiscoverStyleStep)
            },
          }}
        />
      )
      break
    case Steps.DiscoverStyleStep:
      CurrentStep = (
        <DiscoverStyleStep
          onCompleted={() => {
            setStartTriage(true)
            setCurrentStepState(Steps.TriageStep)
          }}
        />
      )
      break
    case Steps.TriageStep:
      CurrentStep = (
        <TriageStep
          check={startTriage}
          onTriageComplete={(isWaitlisted) => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.AccountTriaged,
              actionType: Schema.ActionTypes.Success,
              isWaitlisted,
            })

            setStartTriage(false)
            refetchGetSignupUser()

            if (isWaitlisted) {
              setCurrentStepState(Steps.FormConfirmation)
            } else if (hasBagItems) {
              setCurrentStepState(Steps.ChoosePlanStep)
            } else {
              setCurrentStepState(Steps.DiscoverBagStep)
            }
          }}
        />
      )
      break
    case Steps.DiscoverBagStep:
      CurrentStep = (
        <DiscoverBagStep
          onCompleted={() => {
            refetchGetSignupUser()
            setCurrentStepState(Steps.ChoosePlanStep)
          }}
        />
      )
      break
    case Steps.ChoosePlanStep:
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
            localStorage.setItem("paymentProcessed", "true")
            identify(data?.me?.customer?.user?.id, { status: "Active" })
            refetchGetSignupUser()
          }}
          onError={() => {}}
        />
      )
      break
    case Steps.FormConfirmation:
      CurrentStep = <FormConfirmation status={customerStatus === "Active" ? "accountAccepted" : "waitlisted"} />
      break
  }

  return (
    <Layout hideFooter brandItems={featuredBrandItems} showIntercom={false}>
      <MaxWidth>
        <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
        <Flex
          height="100%"
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          px={[2, 2, 2, 5, 5]}
        >
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
