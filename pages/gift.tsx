import { Box, Button, Display, Flex, Layout, Media, Separator, Spacer } from "components"
import { Col, Grid, Row } from "components/Grid"
import { ZIPCODE_SERVICED } from "components/ServiceableModal"
import { groupByPlanTier } from "components/SignUp/MembershipPlans"
import { PlanTier } from "components/SignUp/PlanTier"
import { executeChargebeeCheckout, initChargebee } from "lib/chargebee"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { TextField } from "@material-ui/core"
import { color, Sans } from "@seasons/eclipse"

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
  const tracking = useTracking()
  const { data } = useQuery(GET_GIFT_PAGE)
  const featuredBrandItems = data?.brands || []
  const plans = data?.paymentPlans

  const [zipcode, setZipcode] = useState("")
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [zipcodeServiced, { data: zipcodeData }] = useLazyQuery(ZIPCODE_SERVICED)

  const allAccessEnabled = zipcodeData?.zipcodeServiced || false

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

  return (
    <Layout brandItems={featuredBrandItems}>
      <Grid>
        <Col>
          <Header>
            <Flex
              px={6}
              pt={"200px"}
              pb={"20px"}
              flexDirection="column"
              alignItems="center"
              style={{ position: "relative", zIndex: 1 }}
            >
              <Display color="white100" size="10" textAlign="center">
                Choose your Gift
              </Display>
              <Spacer mb={5} />
              <Sans color="black10" size="6" textAlign="center">
                All gifts are sent via email so your recipient can redeem and customize themselves!
                <br />
                Enter their zipcode below to see what plans are available
              </Sans>
              <Spacer mb={1} />
              <Flex flexDirection="row" alignItems="center">
                <Box pt={3} mr={3} width="200px">
                  {typeof window !== "undefined" && (
                    <WhiteBorderTextField
                      InputProps={{
                        className: "text-field",
                      }}
                      value={zipcode}
                      placeholder="ZIP Code"
                      onChange={(e) => {
                        setZipcode(e.target.value)
                      }}
                      fullWidth
                    />
                  )}
                </Box>
                <Box pt={3}>
                  <Button
                    variant="primaryWhite"
                    onClick={() => {
                      zipcodeServiced({
                        variables: { zipCode: zipcode },
                      })
                      tracking.trackEvent({
                        actionName: Schema.ActionNames.ServiceableModalZipCodeButtonClicked,
                        actionType: Schema.ActionTypes.Tap,
                        zipcode,
                      })
                    }}
                  >
                    Check
                  </Button>
                </Box>
              </Flex>

              <Box mt="150px">
                <Sans size="3" color="black10">
                  *Gifts are one-time payments that do not renew.
                </Sans>
              </Box>
            </Flex>

            <Spacer mb={2} />
            <HeaderOverlay />
          </Header>
        </Col>

        <Col>
          <Box px={[2, 2, 2, 5, 5]}>
            <Separator />
          </Box>

          <Grid px={[2, 2, 2, 5, 5]} pt={[10, 0, 0, 0, 0]}>
            <Row>
              {plansGroupedByTier.map((group, index) => (
                <Col md="6" xs="12" key={index}>
                  <Flex key={index} width="100%" height="100%" px={[2, 2, 2, 7, 7]} style={{ position: "relative" }}>
                    <Flex flexDirection="column" alignItems="center" width="100%">
                      <Spacer pb={[0, 10, 10, 10, 10]} />
                      <Box width="100%">
                        <PlanTier
                          group={group}
                          onSelectPlan={onSelectPlan}
                          selectedPlan={selectedPlan}
                          allAccessEnabled={allAccessEnabled}
                          displayText
                        />
                      </Box>
                      <Spacer pb={[10, 10, 10, 10, 10]} />
                    </Flex>
                    <Media greaterThanOrEqual="md">
                      {index === 0 && (
                        <Box
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            width: "1px",
                            backgroundColor: color("black15"),
                            height: "100%",
                          }}
                        />
                      )}
                    </Media>
                  </Flex>
                </Col>
              ))}
            </Row>
          </Grid>

          <Box px={[2, 2, 2, 5, 5]}>
            <Separator />
          </Box>
        </Col>
      </Grid>
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
          <Box pt={1} pr={2} style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                executeChargebeeCheckout({
                  planID: `${selectedPlan.planID}-gift`,
                  email: "",
                  isGift: true,
                })
              }}
              size="large"
            >
              Choose Gift
            </Button>
          </Box>
        </Flex>
      </FixedFooter>
    </Layout>
  )
})

const Header = styled(Box)`
  position: relative;
  background: url(./images/gift-bg.jpg) no-repeat center center;
`

const HeaderOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`

const FixedFooter = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid ${color("black100")};
  z-index: 50;
`

const WhiteBorderTextField = styled(TextField)`
  input { 
    color white !important;
  }

  .text-field::before, 
  .text-field::after,
  .text-field:not(.Mui-disabled):before, 
  .text-field:hover:not(.Mui-disabled):before  {
    border-bottom: 1px solid rgba(255,255,255,0.9);
  }
`

export default Gift
