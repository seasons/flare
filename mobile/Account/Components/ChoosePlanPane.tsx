import { Box, Button, Container, Flex, Sans, Spacer, Separator, CloseButton } from "components"
// TODO: Get sentry cooking in here
// import { useNavigation } from "@react-navigation"
// import * as Sentry from "@sentry/react-native"
import { GET_MEMBERSHIP_INFO } from "mobile/Account/MembershipInfo/MembershipInfo"
import { color } from "helpers/color"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { Schema as TrackSchema, useTracking } from "utils/analytics"
import { FadeBottom2 } from "components/SVGs/FadeBottom2"
import { ListCheck } from "components/SVGs/ListCheck"
import { TabBar } from "mobile/TabBar"
import gql from "graphql-tag"
import { uniq } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { Dimensions, Linking, ScrollView } from "react-native-web"
import styled from "styled-components"
import { PlanButton, PaymentMethod } from "./PlanButton"
import { GET_BAG } from "queries/bagQueries"
import { ChevronIcon } from "components/Icons/ChevronIcon"
import { themeProps } from "lib/theme"
import { Coupon } from "utils/calcFinalPrice"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { Spinner } from "components/Spinner"

export const GET_PLANS = gql`
  query GetPlans($where: PaymentPlanWhereInput) {
    paymentPlans(where: $where) {
      id
      name
      description
      tagline
      price
      planID
      tier
      itemCount
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
        admissions {
          id
          allAccessEnabled
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
  onComplete?: (method: PaymentMethod) => void
  // selectedPlan: GetPlans_paymentPlans
  // setSelectedPlan: (plan: GetPlans_paymentPlans) => void
  headerText: String
  coupon?: Coupon
  onMountScrollToFaqSection?: boolean
}

const viewWidth = Dimensions.get("window").width

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({
  onComplete,
  headerText,
  // setSelectedPlan,
  // selectedPlan,
  coupon,
  onMountScrollToFaqSection,
}) => {
  const { data } = useQuery(GET_PLANS)
  if (!data) {
    return null
  }
  const [selectedPlan, setSelectedPlan] = useState(null)

  const { openDrawer, closeDrawer } = useDrawerContext()
  const allAccessEnabled = data?.me?.customer?.admissions?.allAccessEnabled
  const plans = data?.paymentPlans
  const faqSections = data?.faq?.sections
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)
  const tracking = useTracking()
  //   const navigation = useNavigation()
  const [currentView, setCurrentView] = useState(0)
  const [tiers, setTiers] = useState([])
  const [isMutating, setIsMutating] = useState(false)
  const scrollViewRef = React.useRef(null)

  const { showPopUp, hidePopUp } = usePopUpContext()

  const [updatePaymentPlan] = useMutation(PLAN_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
      onComplete?.(PaymentMethod.ApplePay)
    },
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)
      const errorAsString = err.toString()
      //   Sentry.captureException(err)
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
    // Update the selected plan if you switch tabs
    const newSelectedPlan =
      plans?.filter(
        (plan) => tierToReadableText(plan.tier) === tiers?.[currentView] && plan.itemCount === selectedPlan?.itemCount
      ) || plans?.filter((plan) => tierToReadableText(plan.tier) === tiers?.[currentView])?.[0]
    setSelectedPlan(newSelectedPlan?.[0])
  }, [currentView, setSelectedPlan])

  useEffect(() => {
    if (plans && plans.length > 0) {
      setSelectedPlan(plans?.[0])
      const planTiers = uniq(plans?.map((plan) => tierToReadableText(plan.tier)))
      setTiers(planTiers)
    }

    const customerPlan = data?.me?.customer?.membership?.plan
    const initialPlan = customerPlan ? plans?.find((plan) => plan.id === customerPlan.id) : plans?.[0]
    const initialTab = customerPlan?.tier === "AllAccess" ? 1 : 0

    setCurrentView(initialTab)
    setSelectedPlan(initialPlan)
  }, [plans])

  const onChoosePlanUpdate = () => {
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

  const onChoosePlan = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ChoosePlanTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })

    onChoosePlanUpdate()
  }

  const onFaqSectionHeaderLayout = (event) => {
    if (onMountScrollToFaqSection && scrollViewRef.current) {
      const { x, y } = event.nativeEvent.layout
      // layout event y does not include section header top margin,
      // manually subtract so that we don't overshoot the component.
      const scrollDestY = y - themeProps.space["4"]
      scrollViewRef.current.scrollTo({ x, y: scrollDestY, animated: false })
    }
  }

  const descriptionLines = selectedPlan?.description?.split("\n") || []
  const planColors = ["#000", "#e6b759"]
  const currentColor = planColors[currentView] || "black"

  const tierToReadableText = (tier) => {
    if (tier === "AllAccess") {
      return "All Access"
    } else {
      return tier
    }
  }

  return (
    <>
      <CloseButton variant="light" />
      <Container insetsBottom={false} insetsTop={false}>
        <Box style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            <Spacer mb={5} />
            <Spacer mb={4} />
            <Box p={2}>
              <Sans color="black100" size="3">
                {headerText}
              </Sans>
              <Spacer mb={1} />
              <Sans color="black50" size="1">
                Here's what's included in your selected plan:
              </Sans>
              <Spacer mb={1} />
            </Box>
            <Flex flexDirection="column">
              {descriptionLines.map((line) => {
                return (
                  <Flex flexDirection="row" pb={1} px={1} alignItems="center" key={line} width="100%">
                    <Box mx={1} mr={1.5}>
                      <ListCheck />
                    </Box>
                    <Sans color="black50" size="1" style={{ width: viewWidth - 75 }}>
                      {line}
                    </Sans>
                  </Flex>
                )
              })}
            </Flex>
            <Spacer mb={1} />
            <TabBar
              tabColor={currentColor}
              spaceEvenly
              tabs={tiers}
              strikethroughTabs={allAccessEnabled ? [] : ["All Access"]}
              activeTab={currentView}
              goToPage={(page) => {
                // TODO: Fix this event
                // tracking.trackEvent({
                //   actionName:
                //     page === 0
                //       ? TrackSchema.ActionNames.Tier0PlanTabTapped
                //       : TrackSchema.ActionNames.Tier1PlanTabTapped,
                //   actionType: TrackSchema.ActionTypes.Tap,
                // })
                if (page === 1 && !allAccessEnabled) {
                  showPopUp({
                    title: "Not available in your city yet",
                    note: "We're currently in beta and All Access is disabled in your area due to shipping time.",
                    buttonText: "Got it",
                    onClose: hidePopUp,
                  })
                } else {
                  setCurrentView(page as number)
                }
              }}
            />
            <Spacer mb={2} />
            {plans
              ?.filter((plan) => tierToReadableText(plan.tier) === tiers?.[currentView])
              ?.sort((a, b) => b.itemCount - a.itemCount)
              ?.map((plan) => {
                return (
                  <Box key={plan.id} px={2}>
                    <PlanButton
                      plan={plan}
                      key={plan.id}
                      shouldSelect={setSelectedPlan}
                      selected={selectedPlan?.id === plan.id}
                      selectedColor={currentColor}
                      coupon={coupon}
                    />
                  </Box>
                )
              })}
            <Spacer mb={2} />
            <Separator />
            {!!faqSections?.length &&
              faqSections.map((section, index) => (
                <Box mt={4} key={index} px={2} onLayout={onFaqSectionHeaderLayout}>
                  <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Sans size="1">{section.title}</Sans>
                    <ChevronIcon rotateDeg="90deg" color={color("black100")} />
                  </Flex>
                  <Spacer mb={4} />
                  {section.subsections.map((subSection) => {
                    return (
                      <Box key={subSection.title}>
                        <Sans size="1">{subSection.title}</Sans>
                        <Spacer mb={1} />
                        <Separator />
                        <Spacer mb={1} />
                        <Sans size="1" color="black50">
                          {subSection.text}
                        </Sans>
                        <Spacer mb={4} />
                      </Box>
                    )
                  })}
                </Box>
              ))}
            <Spacer mb={1} />
            <Box px={2}>
              <Button
                block
                variant="primaryWhite"
                onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership question"`)}
              >
                Contact us
              </Button>
            </Box>
            <Spacer pb={160} />
          </ScrollView>
        </Box>

        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Box p={2} style={{ alignItems: "center" }}>
            <ColoredButton
              block
              disabled={!selectedPlan}
              onPress={onChoosePlan}
              variant="primaryBlack"
              backgroundColor={currentColor}
            >
              Choose plan
            </ColoredButton>
            <Box style={{ height: "10px" }} />
          </Box>
        </FadeBottom2>
      </Container>
      {showLoadingOverlay && (
        <Overlay>
          <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        </Overlay>
      )}
    </>
  )
}

const ColoredButton = styled(Button)`
  background-color: ${(p: any) => p.backgroundColor};
`

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 200;
`
