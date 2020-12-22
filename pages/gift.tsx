import { Box, Button, Flex, Layout, Spacer, TextInput } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { ZIPCODE_SERVICED } from "components/ServiceableModal"
import { ListCheck } from "components/SVGs/ListCheck"
import { initializeApollo } from "lib/apollo/apollo"
import { executeChargebeeCheckout, initChargebee } from "lib/chargebee"
import { uniq } from "lodash"
import { PlanButton } from "mobile/Account/Components/PlanButton"
import { TabBar } from "mobile/TabBar"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import React, { useEffect, useState } from "react"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { Sans } from "@seasons/eclipse"

export const GET_GIFT_PAGE = gql`
  query GetGiftPage($where: PaymentPlanWhereInput) {
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
    brands(
      where: { products_some: { id_not: null }, name_not: null, featured: true, published: true }
      orderBy: name_ASC
    ) {
      name
      slug
    }
  }
`

const ZIPCODE_REGEX = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/

const Gift = screenTrack(() => ({
  page: Schema.PageNames.GiftPage,
  path: "/gift",
}))(() => {
  const { data } = useQuery(GET_GIFT_PAGE)
  const tracking = useTracking()
  const featuredBrandItems = data?.brands || []
  const plans = data?.paymentPlans

  const [email, setEmail] = useState("")
  const [zipcode, setZipcode] = useState("")
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [tiers, setTiers] = useState([])
  const [currentView, setCurrentView] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [zipcodeServiced, { data: zipcodeData }] = useLazyQuery(ZIPCODE_SERVICED)

  const allAccessEnabled = zipcodeData?.zipcodeServiced || false

  useEffect(() => {
    initChargebee()
  }, [])

  const tierToReadableText = (tier) => {
    if (tier === "AllAccess") {
      return "All Access"
    } else {
      return tier
    }
  }

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

  useEffect(() => {
    if (zipcode && zipcode.match(ZIPCODE_REGEX)) {
      zipcodeServiced({
        variables: { zipcode },
      })
    }
  }, [zipcode])

  const descriptionLines = selectedPlan?.description?.split("\n") || []
  const planColors = ["#000", "#e6b759"]
  const currentColor = planColors[currentView] || "black"

  return (
    <Layout fixedNav brandItems={featuredBrandItems}>
      <Box my={2}>
        <TextInput
          autoCapitalize="words"
          currentValue={email}
          headerText="Recipient Email"
          onChangeText={(_, val) => setEmail(val)}
        />
      </Box>
      <Box my={2}>
        <Sans color="black50" size="3">
          Please enter your recipient's zipcode to see what plans are available for them
        </Sans>
        <TextInput
          autoCapitalize="words"
          currentValue={zipcode}
          headerText="Recipient Zip code"
          onChangeText={(_, val) => setZipcode(val)}
        />
      </Box>
      <Flex style={{ flex: 1, overflow: "auto" }}>
        <Box>
          <Spacer mb={15} />
          <Box px={2}>
            <Sans color="black100" size="6">
              Choose your a Gift Membership
            </Sans>
            <Spacer mb={1} />
            <Sans color="black50" size="3">
              Here's what will be included in their plan:
            </Sans>
            <Spacer mb={1} />
          </Box>
          <Flex flexDirection="column" width="100%">
            {descriptionLines.map((line) => {
              return (
                <Flex flexDirection="row" pb={1} px={1} alignItems="center" key={line} width="100%">
                  <Box mx={1} mr={2}>
                    <ListCheck />
                  </Box>
                  <Sans color="black50" size="3">
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
                  page === 0 ? Schema.ActionNames.Tier0PlanTabTapped : TrackSchema.ActionNames.Tier1PlanTabTapped,
                actionType: Schema.ActionTypes.Tap,
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
                  />
                </Box>
              )
            })}
        </Box>
      </Flex>
      <Box>
        <Button
          onClick={() => {
            executeChargebeeCheckout({
              planID: "essential-2-gift",
              // TODO: read recipients email
              email,
              isGift: true,
            })
          }}
          block
        >
          Give a Gift
        </Button>
      </Box>
    </Layout>
  )
})

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: NAVIGATION_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default Gift
