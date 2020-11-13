import { Box, Button, Container, Flex, Sans, Spacer, FixedBackArrow, Separator } from "components"
import { GET_MEMBERSHIP_INFO } from "mobile/Account/MembershipInfo/MembershipInfo"
import { color } from "helpers/color"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { Schema as TrackSchema, useTracking } from "utils/analytics"
import { ListCheck } from "components/SVGs/ListCheck"
import { TabBar } from "mobile/TabBar"
import gql from "graphql-tag"
import { uniq } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { Dimensions, Linking, ScrollView } from "react-native"
import styled from "styled-components"
import { PlanButton, PaymentMethod } from "./PlanButton"
import { GET_BAG } from "queries/bagQueries"
import { ChevronIcon } from "components/Icons/ChevronIcon"
import { Coupon } from "utils/calcFinalPrice"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { Spinner } from "components/Spinner"
import { DrawerBottomButton } from "components/Drawer/DrawerBottomButton"

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
  const allAccessEnabled = data?.me?.customer?.admissions?.allAccessEnabled
  const plans = data?.paymentPlans
  const faqSections = data?.faq?.sections

  const tracking = useTracking()
  const [currentView, setCurrentView] = useState(0)
  const [tiers, setTiers] = useState([])
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const scrollViewRef = React.useRef(null)

  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const { openDrawer } = useDrawerContext()

  const [updatePaymentPlan] = useMutation(PLAN_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
      onComplete?.(PaymentMethod.ApplePay)
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

  const onChoosePlanUpdate = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    console.log(selectedPlan)
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

  // const onFaqSectionHeaderLayout = (event) => {
  //   if (onMountScrollToFaqSection && scrollViewRef.current) {
  //     const { x, y } = event.nativeEvent.layout
  //     // layout event y does not include section header top margin,
  //     // manually subtract so that we don't overshoot the component.
  //     const scrollDestY = y - themeProps.space["4"]
  //     scrollViewRef.current.scrollTo({ x, y: scrollDestY, animated: false })
  //   }
  // }

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

  if (!data) {
    return null
  }

  return (
    <>
      <Container insetsBottom={false} insetsTop={false}>
        <FixedBackArrow
          variant="whiteBackground"
          onPress={() => {
            openDrawer("membershipInfo")
          }}
        />
        <Box style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            <Spacer mb={5} />
            <Spacer mb={4} />
            <Box p={2}>
              <Sans color="black100" size="6">
                {headerText}
              </Sans>
              <Spacer mb={1} />
              <Sans color="black50" size="3">
                Here's what's included in your selected plan:
              </Sans>
              <Spacer mb={1} />
            </Box>
            <Flex flexDirection="column">
              {descriptionLines.map((line) => {
                return (
                  <Flex flexDirection="row" pb={1} px={1} alignItems="center" key={line} width="100%">
                    <Box mx={1} mr={2}>
                      <ListCheck />
                    </Box>
                    <Sans color="black50" size="3" style={{ width: viewWidth - 75 }}>
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
                tracking.trackEvent({
                  actionName:
                    page === 0
                      ? TrackSchema.ActionNames.Tier0PlanTabTapped
                      : TrackSchema.ActionNames.Tier1PlanTabTapped,
                  actionType: TrackSchema.ActionTypes.Tap,
                })
                if (page === 1 && !allAccessEnabled) {
                  showPopUp({
                    title: "Not available in your city yet",
                    note: "All Access is disabled in your area due to shipping time.",
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
            <Spacer pb={100} />
          </ScrollView>
        </Box>
        <DrawerBottomButton buttonProps={{ disabled: !selectedPlan, onClick: onChoosePlan, block: true }}>
          Choose plan{" "}
        </DrawerBottomButton>
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

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 200;
`
