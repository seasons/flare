import {
  Box, Button, Display, Flex, Layout, MaxWidth, Media, Separator, Spacer, TextInput
} from "components"
import { Col, Grid, Row } from "components/Grid"
import { ZIPCODE_SERVICED } from "components/ServiceableModal"
import { groupByPlanTier } from "components/SignUp/MembershipPlans"
import { PlanTier } from "components/SignUp/PlanTier"
import { initializeApollo } from "lib/apollo/apollo"
import { executeChargebeeCheckout, initChargebee } from "lib/chargebee"
import React, { useEffect, useState } from "react"
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
    if (zipcode && zipcode.match(ZIPCODE_REGEX)) {
      zipcodeServiced({
        variables: { zipCode: zipcode },
      })
    }
  }, [zipcode])

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
    <Layout fixedNav brandItems={featuredBrandItems}>
      <Grid>
        <Col>
          <Box>
            <Flex px={6} my={15} flexDirection="column" alignItems="center">
              <Display color="black100" size="10" textAlign="center">
                Choose your Gift
              </Display>
              <Spacer mb={5} />
              <Sans color="black50" size="6" textAlign="center">
                All gifts are sent via email so your recipient can redeem and customize themselves!
                <br />
                Gifts are one-time payments that do not renew.
              </Sans>
              <Spacer mb={1} />
            </Flex>

            <Box px={[2, 2, 2, 5, 5]}>
              <Separator />
            </Box>

            <Flex my={5} flexDirection="column" alignItems="center">
              <Flex flexDirection="row" alignItems="center">
                <Sans color="black50" size="3" textAlign="center">
                  Please enter your recipient's zipcode to see what plans are available for them
                </Sans>
                <Spacer ml={5} />
                <TextField
                  value={zipcode}
                  placeholder={"Zipcode"}
                  onChange={(e) => {
                    setZipcode(e.target.value)
                  }}
                  error={!zipcode.match(ZIPCODE_REGEX)}
                  required
                />
              </Flex>
            </Flex>

            <Spacer mb={2} />
          </Box>
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

        <Box style={{ textAlign: "center" }} my={3}>
          <Button
            onClick={() => {
              executeChargebeeCheckout({
                planID: `${selectedPlan.planID}-gift`,
                // TODO: read recipients email
                email: "",
                isGift: true,
              })
            }}
            size="large"
          >
            Choose Gift
          </Button>
        </Box>
      </Grid>
    </Layout>
  )
})

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_GIFT_PAGE,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default Gift
