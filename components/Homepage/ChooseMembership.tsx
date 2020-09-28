import React from "react"
import { Flex, Sans, Separator, Spacer } from "../"
import { Box } from "../Box"
import { Grid, Row, Col } from "../Grid"
import { Media } from "../Responsive"
import { uniq } from "lodash"
import { Check } from "../SVGs"
import { color } from "../../helpers"
import styled from "styled-components"
import { Link } from "../Link"

const Content = ({ tier, descriptionLines, group }) => {
  return (
    <>
      <Sans size="11">{tier === "AllAccess" ? "All Access" : tier}</Sans>
      <Spacer mb={3} />
      <Sans size="4" color="black50">
        Here's what's included in this plan:
      </Sans>
      <Spacer mb={4} />
      <Flex flexDirection="column">
        {descriptionLines.map((line) => {
          return (
            <Flex flexDirection="row" alignItems="center" key={line} width="100%" pb={1}>
              <Check />
              <Spacer mr={2} />
              <Sans color="black50" size="4">
                {line}
              </Sans>
            </Flex>
          )
        })}
      </Flex>
      <Spacer mb={4} />
      <Flex flexDirection="row">
        {group
          ?.sort((a, b) => a.itemCount - b.itemCount)
          .map((plan, i) => {
            return (
              <PlanWrapper
                flexDirection="column"
                key={plan.id}
                style={{ borderLeft: i === 0 ? `1px solid ${color("black15")}` : "none" }}
              >
                <Link href="/signup">
                  <Box px={2} pt={4}>
                    <Sans color="black100" size="3">
                      <span style={{ fontSize: "32px", color: `${color("black100")}` }}>{plan.itemCount} </span>
                      {plan.itemCount > 1 ? " items" : " item"}
                    </Sans>
                  </Box>
                  <Separator />
                  <Spacer mb="60px" />
                  <Box p={2}>
                    <Sans color="black50" size="3">
                      <span style={{ fontSize: "20px", color: `${color("black100")}` }}>${plan.price / 100}</span> /
                      month
                    </Sans>
                  </Box>
                </Link>
              </PlanWrapper>
            )
          })}
      </Flex>
    </>
  )
}

const Desktop = ({ plansGroupedByTier }) => {
  return (
    <Grid>
      <Row px={[1, 1, 1, 3, 3]}>
        {plansGroupedByTier.map((group, index) => {
          const tier = group?.[0].tier
          const descriptionLines = group?.[0]?.description?.split("\n") || []

          return (
            <Col
              md="6"
              xs="12"
              style={{ height: "100%", borderRight: index === 0 ? `1px solid ${color("black15")}` : "none" }}
            >
              <Box px={[1, 1, 1, 2, 2]}>
                <Box pl={5} pt="76px" pb={10} pr="63px">
                  <Content tier={tier} descriptionLines={descriptionLines} group={group} />
                </Box>
              </Box>
            </Col>
          )
        })}
      </Row>
    </Grid>
  )
}

const Mobile = ({ plansGroupedByTier }) => {
  return (
    <Grid pt="76px">
      <Row px={[1, 1, 1, 3, 3]}>
        {plansGroupedByTier.map((group, index) => {
          const tier = group?.[0].tier
          const descriptionLines = group?.[0]?.description?.split("\n") || []

          return (
            <Col md="6" xs="12" style={{ height: "100%" }}>
              <Box px={[1, 1, 1, 2, 2]}>
                <Box pb={10}>
                  <Content tier={tier} descriptionLines={descriptionLines} group={group} />
                </Box>
              </Box>
            </Col>
          )
        })}
      </Row>
    </Grid>
  )
}

export const ChooseMembership: React.FC<{ paymentPlans: any }> = ({ paymentPlans }) => {
  const plansGroupedByTier = []
  const tiers = uniq(paymentPlans?.map((plan) => plan.tier))
  tiers?.forEach((tier) => {
    const tierPlans = paymentPlans?.filter((plan) => {
      if (plan.tier === tier) {
        return plan
      }
    })
    plansGroupedByTier.push(tierPlans)
  })

  return (
    <>
      <Media greaterThanOrEqual="md">
        <Desktop plansGroupedByTier={plansGroupedByTier} />
      </Media>
      <Media lessThan="md">
        <Mobile plansGroupedByTier={plansGroupedByTier} />
      </Media>
    </>
  )
}

const PlanWrapper = styled(Flex)`
  width: 100%;
  flex: 3;
  border-bottom: 1px solid ${color("black15")};
  border-top: 1px solid ${color("black15")};
  border-right: 1px solid ${color("black15")};
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
  }
`
