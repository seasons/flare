import { Box, Flex, Layout, MaxWidth, Sans, SnackBar, Spacer } from "components"
import { FormConfirmation } from "components/Forms/FormConfirmation"
import { PaymentStep } from "components/Payment"
import { CreateAccountStep } from "components/SignUp/CreateAccountStep/CreateAccountStep"
import { CustomerMeasurementsStep } from "components/SignUp/CustomerMeasurementsStep"
import { DiscoverBagStep } from "components/SignUp/DiscoverBagStep"
import { PersonalDetailsStep } from "components/SignUp/PersonalDetailsStep"
import { TriageStep } from "components/SignUp/TriageStep"
import { SplashScreen } from "components/SplashScreen/SplashScreen"
import { useAuthContext } from "lib/auth/AuthContext"
import { CustomerStatus } from "mobile/Account/Lists"
import { Loader } from "mobile/Loader"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { identify, Schema, screenTrack, useTracking } from "utils/analytics"
import { useLazyQuery, useQuery } from "@apollo/client"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { GET_GIFT, GET_SIGNUP_USER } from "../../components/SignUp/queries"

const stripePromise = loadStripe(process.env.STRIPE_API_KEY)
export interface SignupFormProps {
  onError?: () => void
  onCompleted?: () => void
}

export const SIGNUP_FOOTER_HEIGHT = "69px"

enum Steps {
  CreateAccountStep = "CreateAccountStep",
  PersonalDetailsStep = "PersonalDetailsStep",
  CustomerMeasurementsStep = "CustomerMeasurementsStep",
  TriageStep = "TriageStep",
  DiscoverBagStep = "DiscoverBagStep",
  ChoosePlanStep = "ChoosePlanStep",
  FormConfirmation = "FormConfirmation",
  PaymentStep = "PaymentStep",
}

const browseURL = "/browse/all+all?page=1&tops=M&available=true"

const showDiscoverBag = process.env.SHOW_DISCOVER_BAG_STEP === "true"

const SignUpPage = screenTrack(() => ({
  page: Schema.PageNames.SignUpPage,
  path: "/signup",
}))(() => {
  const tracking = useTracking()
  const router = useRouter()
  const { previousData, data = previousData, refetch: refetchGetSignupUser } = useQuery(GET_SIGNUP_USER)
  const { updateUserSession } = useAuthContext()

  const [currentStepState, setCurrentStepState] = useState<Steps>(Steps.CreateAccountStep)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [startTriage, setStartTriage] = useState(false)
  const [showReferrerSplash, setShowReferrerSplash] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const customer = data?.me?.customer
  const customerStatus = customer?.status
  const hasSetMeasurements = !!customer?.detail?.height
  const initialCoupon = data?.me?.customer?.coupon

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
            setCurrentStepState(Steps.PersonalDetailsStep)
          } else {
            setCurrentStepState(Steps.CustomerMeasurementsStep)
          }
          break
        case "Authorized":
        case "Invited":
          setCurrentStepState(Steps.PaymentStep)
          break
        case "Waitlisted":
        case "Active":
          setCurrentStepState(Steps.FormConfirmation)
          break
      }
    }
  }, [customerStatus, hasSetMeasurements])

  useEffect(() => {
    tracking.trackEvent({
      actionName: currentStepState,
      actionType: Schema.ActionTypes.ViewedPageStep,
    })
  }, [currentStepState])

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
      <Layout hideFooter>
        <Flex>
          <Loader />
        </Flex>
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
              setCurrentStepState(Steps.PersonalDetailsStep)
            },
          }}
        />
      )
      break
    case Steps.PersonalDetailsStep:
      CurrentStep = (
        <PersonalDetailsStep
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
              router.push(`${browseURL}&triage=waitlisted`)
            } else {
              setCurrentStepState(Steps.PaymentStep)
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
            setCurrentStepState(Steps.PaymentStep)
          }}
        />
      )
      break
    case Steps.PaymentStep:
      CurrentStep = (
        <PaymentStep
          plan={selectedPlan}
          initialCoupon={initialCoupon}
          onBack={() => {
            if (showDiscoverBag) {
              setCurrentStepState(Steps.DiscoverBagStep)
            }
          }}
          onSuccess={() => {
            updateUserSession({ cust: { status: CustomerStatus.Active } })
            localStorage.setItem("paymentProcessed", "true")
            identify(data?.me?.customer?.user?.id, { status: "Active" })
            router.push(`${browseURL}&triage=approved`)
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
    <Elements stripe={stripePromise}>
      <Layout hideFooter showIntercom={false}>
        <MaxWidth>
          <Flex
            style={{ flex: 1, position: "relative", width: "100%", alignItems: "stretch" }}
            pb={SIGNUP_FOOTER_HEIGHT}
          >
            <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
            <Flex
              width="100%"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              px={[1, 1, 2, 2, 2]}
              style={{ flex: 1, alignItems: "stretch" }}
            >
              <Flex style={{ flex: 1, width: "100%", alignItems: "stretch" }}>{CurrentStep}</Flex>
            </Flex>
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
    </Elements>
  )
})

export default SignUpPage
