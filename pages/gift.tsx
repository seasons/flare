import { Box, Button, Display, Flex, Layout, Media, Separator, Spacer } from "components"
import { FormConfirmation } from "components/Forms/FormConfirmation"
import { Col, Grid, Row } from "components/Grid"
import { HowItWorks } from "components/Product/HowItWorks"
import { groupByPlanTier } from "components/SignUp/MembershipPlans"
import { PlanTier } from "components/SignUp/PlanTier"
import { executeChargebeeCheckout, initChargebee } from "lib/chargebee"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"
import { imageResize } from "utils/imageResize"

import { gql, useQuery } from "@apollo/client"
import { color, Picture, Sans } from "@seasons/eclipse"

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

const image = require("public/images/gift-2.jpg")

const Gift = screenTrack(() => ({
  page: Schema.PageNames.GiftPage,
  path: "/gift",
}))(() => {
  const tracking = useTracking()
  const router = useRouter()
  const { previousData, data = previousData } = useQuery(GET_GIFT_PAGE, {
    variables: {
      where: { status: "active" },
    },
  })
  const featuredBrandItems = data?.brands || []
  const plans = data?.paymentPlans

  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    initChargebee()
  }, [])

  useEffect(() => {
    if (plans && plans.length > 0) {
      setSelectedPlan(plans[0])
    }
  }, [plans])

  const plansGroupedByTier = groupByPlanTier(plans)

  const onSelectPlan = (plan) => {
    setSelectedPlan(plan)
  }

  const isSuccessPage = router.query.success === "true"

  if (isSuccessPage) {
    return (
      <Layout brandItems={featuredBrandItems}>
        <FormConfirmation status="giftPurchased" showCTAs={false} />
      </Layout>
    )
  }

  return (
    <Layout brandItems={featuredBrandItems}>
      <Box>
        <Grid px={[2, 2, 2, 5, 5]} py={12}>
          <Row>
            <Col md="5" xs="12">
              <Box>
                <Picture src={imageResize(image, "large")} />
              </Box>
            </Col>

            {plansGroupedByTier.map((group, index) => (
              <Col md="7" xs="12" key={index}>
                <Flex width="100%" height="100%" px={[2, 2, 2, 7, 7]} flexDirection="column">
                  <Box pt={5} pb={1}>
                    <Sans size="9" weight="medium">
                      Choose Your Gift
                    </Sans>
                  </Box>
                  <Sans size="5" color="black50">
                    Give the gift of Seasons and elevate your next special occasion.
                    <br />
                    Show-out together or send a helping hand to a dresser in need.
                  </Sans>

                  <Spacer pb={5} />
                  <Sans size="4">Here's how it works:</Sans>
                  <PlanTier group={group} onSelectPlan={onSelectPlan} selectedPlan={selectedPlan} />

                  <Spacer pb={2} />
                  <HowItWorks />
                </Flex>
              </Col>
            ))}
          </Row>
        </Grid>
      </Box>
      <FixedFooter height={["auto", "70px"]}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          py={1}
          height={["auto", "65px"]}
          style={{ width: "100%" }}
          px={[2, 2, 2, 5, 5]}
        >
          <Box>
            <Sans size={["2", "4"]} color="black50">
              *The gifts are subscriptions with monthly-recurring payments. As the gifter, you will only be charged for
              the first month.
            </Sans>
          </Box>
          <Box pt={0} pr={2} style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                executeChargebeeCheckout({
                  planID: `${selectedPlan.planID}-gift`,
                  email: "",
                  isGift: true,
                  onSuccess: () => {
                    router.push("/gift?success=true")
                  },
                })
              }}
              size="large"
            >
              Next
            </Button>
          </Box>
        </Flex>
      </FixedFooter>
    </Layout>
  )
})

const FixedFooter = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid ${color("black100")};
  z-index: 50;
`

export default Gift
