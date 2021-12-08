import { Box, Button, Container, FixedBackArrow, Flex, Sans, Separator, Spacer } from "components"
import { DrawerBottomButton } from "components/Drawer/DrawerBottomButton"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { ChevronIcon } from "components/Icons/ChevronIcon"
import { PlanButton } from "components/Payment/PlanButton"
import { PlanFeatures } from "components/Payment/PlanFeatures"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { CheckWithBackground } from "components/SVGs"
import gql from "graphql-tag"
import { color } from "helpers/color"
import { useAuthContext } from "lib/auth/AuthContext"
import { getChargebeeCheckout, initChargebee } from "lib/chargebee"
import { GET_MEMBERSHIP_INFO } from "mobile/Account/MembershipInfo/MembershipInfo"
import { GET_BAG } from "queries/bagQueries"
import React, { useEffect, useState } from "react"
import { Linking } from "react-native"
import { Schema as TrackSchema, useTracking } from "utils/analytics"
import { Coupon } from "utils/calcFinalPrice"

import { useMutation, useQuery } from "@apollo/client"

export const GET_PLANS = gql`
  query GetPlans($where: PaymentPlanWhereInput) {
    paymentPlans(where: $where) {
      id
      name
      features {
        included
        excluded
      }
      tagline
      caption
      price
      planID
      status
    }
    me {
      customer {
        id
        membership {
          id
          plan {
            id
            description
            tier
            itemCount
          }
        }
      }
    }
    faq(sectionType: PaymentPlanPage) {
      sections {
        title
        subsections {
          title
          text
        }
      }
    }
  }
`

const PLAN_UPDATE = gql`
  mutation ChangeCustomerPlan($planID: String!) {
    changeCustomerPlan(planID: $planID)
  }
`

export enum PaneType {
  Update = 0,
  Create = 1,
}

interface ChoosePlanPaneProps {
  headerText: String
  coupon?: Coupon
  source: "Create" | "Update"
}

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({ headerText, coupon, source }) => {
  const { previousData, data = previousData } = useQuery(GET_PLANS, {
    variables: {
      where: { status: "active" },
    },
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const plans = data?.paymentPlans
  const faqSections = data?.faq?.sections
  const { closeDrawer } = useDrawerContext()
  const tracking = useTracking()
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { userSession } = useAuthContext()

  const [selectedPlan, setSelectedPlan] = useState(null)

  const { openDrawer } = useDrawerContext()

  const [updatePaymentPlan] = useMutation(PLAN_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
      const popUpData = {
        title: "Membership updated!",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      openDrawer("membershipInfo")
    },
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)
      const errorAsString = err.toString()
      let popUpData
      if (errorAsString.includes("return your current reservation before")) {
        popUpData = {
          title: "Please return your current order first",
          note: "You must return your current reservation before changing your plan.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      } else {
        popUpData = {
          title: "Oops! Try again!",
          note: "There was an issue updating your plan. Please retry or contact us.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
  })

  useEffect(() => {
    initChargebee()
  }, [])

  useEffect(() => {
    if (plans && plans.length > 0) {
      setSelectedPlan(plans?.[0])
    }

    const customerPlan = data?.me?.customer?.membership?.plan
    const customerPlanInitialPlan = customerPlan && plans?.find((plan) => plan.id === customerPlan.id)
    const initialPlan = customerPlanInitialPlan ?? plans?.[0]
    setSelectedPlan(initialPlan)
  }, [plans])

  const onChoosePlanUpdate = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    updatePaymentPlan({
      variables: {
        planID: selectedPlan.planID,
      },
      awaitRefetchQueries: true,
    })
  }

  function executeChargebeeCheckout(planID) {
    // @ts-ignore
    const chargebee = Chargebee.getInstance()
    chargebee.openCheckout({
      hostedPage: async () => {
        const { email } = userSession.user
        return await getChargebeeCheckout(planID, email)
      },
      error: (error) => {
        console.error(error)
        showPopUp({
          title: "Sorry there was an error setting up your plan",
          note: "Please try again, or contact us.",
          buttonText: "Got it",
          onClose: hidePopUp,
        })
      },
      success: (hostedPageId) => {
        localStorage.setItem("paymentProcessed", "true")
        setShowSuccess(true)
      },
    })
  }

  const onChoosePlan = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ChoosePlanTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
    if (source === "Update") {
      onChoosePlanUpdate()
    } else {
      executeChargebeeCheckout(selectedPlan.planID)
    }
  }

  const lowestPlanPrice = plans?.map((plan) => plan.price)?.reduce((a, b) => Math.min(a, b))

  if (!data) {
    return null
  }

  if (showSuccess) {
    return (
      <Flex width="100%" height="100%" flexDirection="column" justifyContent="center">
        <Box px={2}>
          <CheckWithBackground />
          <Spacer mb={3} />
          <Sans size="5">Welcome to Seasons</Sans>
          <Sans size="4" color="black50">
            Your membership is active and you’re ready to start reserving.
          </Sans>
          <Spacer mb={4} />
        </Box>
        <DrawerBottomButton buttonProps={{ onClick: () => closeDrawer(), block: true }}>Got it</DrawerBottomButton>
      </Flex>
    )
  }

  return (
    <Flex width="100%" height="100%" flexDirection="column">
      <FixedBackArrow
        variant="whiteBackground"
        onPress={() => {
          openDrawer("profile")
        }}
      />
      <Flex style={{ flex: 1, overflow: "auto" }}>
        <Box>
          <Spacer mb={15} />
          <Box px={2}>
            <Sans color="black100" size="6">
              {headerText}
            </Sans>
            <Spacer mb={1} />
            <Sans color="black50" size="3">
              Here's what's included in your selected plan:
            </Sans>
            <Spacer mb={2} />
            <PlanFeatures features={selectedPlan?.features} />
          </Box>
          <Spacer mb={2} />
          {[...(plans ?? [])]
            ?.sort((a, b) => b.price - a.price)
            ?.map((plan) => {
              console.log("selectedPlan?.id", selectedPlan?.id)
              console.log("plan?.id", plan?.id)
              return (
                <Box key={plan.id} px={2}>
                  <PlanButton
                    plan={plan}
                    lowestPlanPrice={lowestPlanPrice}
                    shouldSelect={setSelectedPlan}
                    selected={selectedPlan?.id === plan.id}
                  />
                </Box>
              )
            })}
          <Spacer mb={2} />
          <Separator />
          <Box width="100%">
            {!!faqSections?.length &&
              faqSections.map((section, index) => (
                <Box mt={4} key={index} px={2}>
                  <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Sans size="3">{section.title}</Sans>
                    <ChevronIcon rotateDeg="90deg" color={color("black100")} />
                  </Flex>
                  <Spacer mb={4} />
                  {section.subsections.map((subSection) => {
                    return (
                      <Box key={subSection.title}>
                        <Sans size="3">{subSection.title}</Sans>
                        <Spacer mb={1} />
                        <Separator />
                        <Spacer mb={1} />
                        <Sans size="3" color="black50">
                          {subSection.text}
                        </Sans>
                        <Spacer mb={4} />
                      </Box>
                    )
                  })}
                </Box>
              ))}
          </Box>
          <Spacer mb={1} />
          <Box px={2}>
            <Button
              variant="secondaryOutline"
              onClick={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership Question"`)}
              block
            >
              Contact us
            </Button>
          </Box>
          <Spacer pb={5} />
        </Box>
      </Flex>
      <DrawerBottomButton buttonProps={{ disabled: !selectedPlan || isMutating, onClick: onChoosePlan, block: true }}>
        Choose plan
      </DrawerBottomButton>
    </Flex>
  )
}
