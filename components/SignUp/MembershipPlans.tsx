import { Button, Flex, Sans, Separator, Spacer } from "components"
import { Box } from "components/Box"
import { Collapse } from "components/Collapse"
import { ChevronIcon } from "components/Icons"
import { PlanTier } from "components/SignUp/PlanTier"
import { color } from "helpers"
import { uniq } from "lodash"
import React, { useState } from "react"
import styled from "styled-components"
import { Col, Grid, Row } from "../Grid"
import { Media } from "../Responsive"

interface MembershipPlansProps {
  paymentPlans: any
  vertical?: boolean
  allAccessEnabled: boolean
  faqSections: any
  selectedPlan: any
  setSelectedPlan: (plan: any) => void
}

const CollapseableSection = ({ section }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Spacer mb={3} />
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <Sans size="4">{section?.title}</Sans>
        <ChevronIcon rotateDeg={open ? "-90deg" : "90deg"} color={color("black100")} scale={0.7} />
      </Flex>
      <Separator />
      <Collapse open={open}>
        <Spacer mb={1} />
        <Sans size="4" color="black50">
          {section?.text}
        </Sans>
      </Collapse>
    </>
  )
}

const FAQ = ({ faqSections }) => {
  return (
    <FAQWrapper>
      <Box pt={10}>
        <Sans size="8" color="black100">
          FAQ
        </Sans>
        <Spacer mb={1} />
        <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
          What to know about membership
        </Sans>
        <Spacer mb={5} />
        {faqSections?.[0]?.subsections?.map((section, index) => {
          return <CollapseableSection section={section} key={index} />
        })}
        <Spacer mb={3} />
        <Sans color="black50" size="3">
          Have a question not covered in the FAQ?
        </Sans>
        <Spacer mb={2} />
        <a href="mailto:membership@seasons.nyc?subject=Support" style={{ textDecoration: "none" }}>
          <Button variant="secondaryOutline" block type="button">
            Contact us
          </Button>
        </a>
      </Box>
    </FAQWrapper>
  )
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
  allAccessEnabled,
  faqSections,
  selectedPlan,
}) => {
  const plansGroupedByTier = groupByPlanTier(paymentPlans)

  const Desktop = () => (
    <Grid px={[2, 2, 2, 5, 5]}>
      <Row>
        <Col md="8" xs="12">
          <Flex
            style={{ borderRight: `1px solid ${color("black15")}`, borderLeft: `1px solid ${color("black15")}` }}
            pt={10}
            flexDirection="row"
            width="100%"
          >
            <Flex width="100%" flexDirection="column" alignItems="flex-end" height="100%">
              {plansGroupedByTier.map((group, index) => (
                <Box key={index} width="100%">
                  {index !== 0 && <Separator />}
                  <Flex pb={6} pt={index !== 0 ? 6 : 0} px={[2, 2, 2, 5, 5]} flexDirection="column" alignItems="center">
                    <Box width="500px">
                      {index === 0 && (
                        <Box>
                          <Sans size="8" color="black100">
                            You're In. Let's choose your plan:
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
                        allAccessEnabled={allAccessEnabled}
                        selectedPlan={selectedPlan}
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
          <Box style={{ borderRight: `1px solid ${color("black15")}`, height: "100%" }} px={[2, 2, 2, 5, 5]}>
            <FAQ faqSections={faqSections} />
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
                    px={[2, 2, 2, 5, 5]}
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box width={["auto", "auto", "500px", "500px", "500px"]}>
                      {index === 0 && (
                        <Box>
                          <Sans size="8" color="black100">
                            You're In.
                          </Sans>
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
                        allAccessEnabled={allAccessEnabled}
                        selectedPlan={selectedPlan}
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
            px={[2, 2, 2, 5, 5]}
          >
            <Box width={["auto", "auto", "500px", "500px", "500px"]}>
              <FAQ faqSections={faqSections} />
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