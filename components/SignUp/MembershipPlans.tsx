import { Flex, Sans, Separator, Spacer } from "components"
import { Box } from "components/Box"
import { CollapsableFAQ } from "components/CollapsableFAQ"
import { PlanTier } from "components/SignUp/PlanTier"
import { color } from "helpers"
import { uniq } from "lodash"
import React from "react"
import styled from "styled-components"

import { Col, Grid, Row } from "../Grid"
import { Media } from "../Responsive"

interface MembershipPlansProps {
  paymentPlans: any
  vertical?: boolean
  faqSections: any
  selectedPlan: any
  setSelectedPlan: (plan: any) => void
}

export const groupByPlanTier = (paymentPlans) => {
  let plansGroupedByTier = []
  const tiers = uniq(paymentPlans?.map((plan) => plan.tier))
  tiers?.forEach((tier) => {
    const tierPlans = paymentPlans?.filter((plan) => {
      if (plan.tier === tier) {
        return plan
      }
    })
    plansGroupedByTier.push(tierPlans)
  })
  return plansGroupedByTier
}

export const MembershipPlans: React.FC<MembershipPlansProps> = ({
  paymentPlans,
  setSelectedPlan,
  faqSections,
  selectedPlan,
}) => {
  const plansGroupedByTier = groupByPlanTier(paymentPlans)

  const Desktop = () => (
    <Grid px={[2, 2, 2, 2, 2]}>
      <Row>
        <Col md="8" xs="12">
          <Flex
            style={{
              borderRight: `1px solid ${color("black15")}`,
              borderLeft: `1px solid ${color("black15")}`,
              minHeight: "100vh",
            }}
            flexDirection="row"
            width="100%"
            pt={150}
          >
            <Flex width="100%" flexDirection="column" alignItems="flex-end" height="100%">
              {plansGroupedByTier.map((group, index) => (
                <Box key={index} width="100%">
                  {index !== 0 && <Separator />}
                  <Flex pb={6} pt={index !== 0 ? 6 : 0} px={[2, 2, 2, 2, 2]} flexDirection="column" alignItems="center">
                    <Box width="500px">
                      {index === 0 && (
                        <Box>
                          <Sans size="8" color="black100">
                            Let's choose your plan:
                          </Sans>
                          <Spacer mb={1} />
                          <Sans size="4" color="black50">
                            Select your plan and bag size below
                          </Sans>
                          <Spacer mb={5} />
                        </Box>
                      )}
                      <PlanTier
                        group={group}
                        onSelectPlan={setSelectedPlan}
                        selectedPlan={selectedPlan}
                        title="Monthly"
                      />
                    </Box>
                  </Flex>
                </Box>
              ))}
              <Spacer mb="110px" />
            </Flex>
          </Flex>
        </Col>
        <Col md="4" xs="12">
          <Box
            style={{ borderRight: `1px solid ${color("black15")}`, height: "100%", minHeight: "100vh" }}
            px={[2, 2, 2, 2, 2]}
            pt={150}
          >
            <FAQWrapper>
              <Sans size="8" color="black100">
                FAQ
              </Sans>
              <Spacer mb={1} />
              <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
                What to know about membership
              </Sans>
              <Spacer mb={5} />
              <CollapsableFAQ faqSections={faqSections} />
            </FAQWrapper>
          </Box>
        </Col>
      </Row>
    </Grid>
  )

  const Mobile = () => (
    <Grid>
      <Row>
        <Col xs="12">
          <Flex style={{ borderRight: `1px solid ${color("black15")}` }} pt={10} flexDirection="row" width="100%">
            <Flex width="100%" flexDirection="column" alignItems="flex-end" height="100%">
              {plansGroupedByTier.map((group, index) => (
                <Box key={index} width="100%">
                  {index !== 0 && <Separator />}
                  <Flex
                    pb={6}
                    pt={index !== 0 ? 6 : 0}
                    px={[2, 2, 2, 2, 2]}
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box width={["auto", "auto", "500px", "500px", "500px"]}>
                      {index === 0 && (
                        <Box>
                          <Sans size="8" color="black100">
                            Let's choose your plan:
                          </Sans>
                          <Spacer mb={1} />
                          <Sans size="4" color="black50">
                            Select your plan and bag size below
                          </Sans>
                          <Spacer mb={5} />
                        </Box>
                      )}
                      <PlanTier
                        group={group}
                        onSelectPlan={setSelectedPlan}
                        selectedPlan={selectedPlan}
                        title="Monthly"
                      />
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Col>
        <Col xs="12">
          <Flex
            style={{ backgroundColor: color("black04") }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            px={[2, 2, 2, 2, 2]}
          >
            <Box width={["auto", "auto", "500px", "500px", "500px"]}>
              <FAQWrapper>
                <Spacer pb={10} />
                <Sans size="8" color="black100">
                  FAQ
                </Sans>
                <Spacer mb={1} />
                <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
                  What to know about membership
                </Sans>
                <Spacer mb={5} />
                <CollapsableFAQ faqSections={faqSections} />
              </FAQWrapper>
            </Box>
            <Spacer pb="140px" />
          </Flex>
        </Col>
      </Row>
    </Grid>
  )

  return (
    <>
      <Media greaterThan="md">
        <Desktop />
      </Media>
      <Media lessThan="lg">
        <Mobile />
      </Media>
    </>
  )
}

const FAQWrapper = styled(Box)`
  width: 100%;
  height: 100%;
`
