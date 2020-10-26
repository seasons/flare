import { uniq } from "lodash"
import React from "react"
import styled from "styled-components"
import { Flex, Sans, Separator, Spacer } from "../"
import { color } from "../../helpers"
import { Box } from "../Box"
import { Col, Grid, Row } from "../Grid"
import { Media } from "../Responsive"
import { Check } from "../SVGs"
import { Display } from "../Typography"

interface ChooseMembershipProps {
  paymentPlans: any
  onSelectPlan?: (plan: any) => void
}

export const ChooseMembership: React.FC<ChooseMembershipProps> = ({ paymentPlans, onSelectPlan }) => {
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
        <Desktop plansGroupedByTier={plansGroupedByTier} onSelectPlan={onSelectPlan} />
      </Media>
      <Media lessThan="md">
        <Mobile plansGroupedByTier={plansGroupedByTier} onSelectPlan={onSelectPlan} />
      </Media>
    </>
  )
}

const Content = ({ tier, descriptionLines, group, onSelectPlan }) => {
  const calcFinalPrice = (price: number) => {
    const couponData = localStorage?.getItem("coupon")
    try {
      const coupon = JSON.parse(couponData)
      const { amount: discountAmount, percentage: discountPercentage, type: couponType } = coupon
      switch (couponType) {
        case "FixedAmount":
          return price - discountAmount
        case "Percentage":
          return price - (price * discountPercentage) / 100.0
        case undefined:
          return price
      }
    } catch (e) {
      return price
    }
  }
  const PriceText = ({ originalPrice, finalPrice }) => {
    originalPrice /= 100
    finalPrice /= 100
    const isDiscounted = originalPrice !== finalPrice && !!finalPrice
    return isDiscounted ? (
      <Sans color="black50" size="3">
        <span
          style={{
            fontSize: "20px",
            color: `${color("black50")}`,
            textDecorationLine: "line-through",
            textDecorationStyle: "solid",
          }}
        >
          ${originalPrice}
        </span>{" "}
        <span
          style={{
            fontSize: "20px",
            color: `${color("black100")}`,
          }}
        >
          ${finalPrice}
        </span>{" "}
        / month
      </Sans>
    ) : (
      <Sans color="black50" size="3">
        <span
          style={{
            fontSize: "20px",
            color: `${color("black100")}`,
          }}
        >
          ${originalPrice}
        </span>{" "}
        / month
      </Sans>
    )
  }
  return (
    <>
      <Display size="9">{tier === "AllAccess" ? "All Access" : tier}</Display>
      <Spacer mb={1} />
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
                onClick={() => {
                  onSelectPlan?.(plan)
                }}
              >
                <Box px={2} pt={4}>
                  <Sans color="black100" size="3">
                    <span style={{ fontSize: "32px", color: `${color("black100")}` }}>{plan.itemCount} </span>
                    {plan.itemCount > 1 ? " items" : " item"}
                  </Sans>
                </Box>
                <Separator />
                <Spacer mb="60px" />
                <Box p={2}>
                  <PriceText finalPrice={calcFinalPrice(plan.price)} originalPrice={plan.price} />
                </Box>
              </PlanWrapper>
            )
          })}
      </Flex>
    </>
  )
}

const Desktop = ({ plansGroupedByTier, onSelectPlan }) => {
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
              key={tier.id + "-" + index}
            >
              <Box px={[1, 1, 1, 2, 2]}>
                <Box pl={5} pt="76px" pb={10} pr="63px">
                  <Content tier={tier} descriptionLines={descriptionLines} group={group} onSelectPlan={onSelectPlan} />
                </Box>
              </Box>
            </Col>
          )
        })}
      </Row>
    </Grid>
  )
}

const Mobile = ({ plansGroupedByTier, onSelectPlan }) => {
  return (
    <Grid pt="76px">
      <Row px={[1, 1, 1, 3, 3]}>
        {plansGroupedByTier.map((group, index) => {
          const tier = group?.[0].tier
          const descriptionLines = group?.[0]?.description?.split("\n") || []

          return (
            <Col md="6" xs="12" style={{ height: "100%" }} key={index}>
              <Box px={[1, 1, 1, 2, 2]}>
                <Box pb={10}>
                  <Content tier={tier} descriptionLines={descriptionLines} group={group} onSelectPlan={onSelectPlan} />
                </Box>
              </Box>
            </Col>
          )
        })}
      </Row>
    </Grid>
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
