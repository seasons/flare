import { Box, Flex, Media, Sans, Separator, Spacer } from "components"
import { Check } from "components/SVGs/Check"
import { color } from "helpers/color"
import React from "react"
import styled from "styled-components"

import { Button } from "@seasons/eclipse"

import { Display } from "../Typography"

export const PlanTier: React.FC<{
  group: any
  onSelectPlan: (plan: any) => void
  selectedPlan?: any
  displayText?: boolean
  showButton?: boolean
  title?: string
  subtitle?: string
  isMobile?: boolean
}> = ({ group, isMobile, onSelectPlan, selectedPlan, displayText, showButton, title, subtitle }) => {
  const tier = group?.[0].tier
  const descriptionLines = group?.[0]?.description?.split("\n") || []

  const calcFinalPrice = (price: number) => {
    let couponData
    if (typeof window !== "undefined") {
      couponData = localStorage?.getItem("coupon")
    } else {
      return price
    }
    try {
      const coupon = JSON.parse(couponData)
      const { amount: discountAmount, percentage: discountPercentage, type: couponType } = coupon
      switch (couponType) {
        case "FixedAmount":
          return price - discountAmount
        case "Percentage":
          return price - (price * discountPercentage) / 100.0
        default:
          return price
      }
    } catch (e) {
      return price
    }
  }

  const PriceText = ({ originalPrice, finalPrice, month }) => {
    originalPrice /= 100
    finalPrice /= 100
    const isDiscounted = originalPrice !== finalPrice && finalPrice !== null
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
        <br />
        <span
          style={{
            fontSize: "20px",
            color: `${color("black100")}`,
          }}
        >
          ${finalPrice}
        </span>{" "}
        <span
          style={{
            color: `${color("black100")}`,
          }}
        >
          this month
        </span>
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
        / {month}
      </Sans>
    )
  }

  let planWrapperStyle = {}
  return (
    <Box width="100%" style={{ maxWidth: "500px" }}>
      {!isMobile && (
        <>
          {displayText ? <Display size="9">{title}</Display> : <Sans size="8">{title}</Sans>}
          {!!subtitle && (
            <Sans size="4" color="black50">
              {subtitle}
            </Sans>
          )}
        </>
      )}
      <Spacer mb={[0, 4, 4, 4, 4]} />
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
            const active = !!selectedPlan && selectedPlan?.id === plan?.id
            let borderLeft
            if (active) {
              borderLeft = `1px solid ${color("black100")}`
            } else if (i === 0) {
              borderLeft = `1px solid ${color("black15")}`
            } else {
              borderLeft = "none"
            }
            const thisPlanWrapperStyle = {
              ...planWrapperStyle,
              borderLeft,
            }
            return (
              <PlanWrapper
                active={active}
                key={plan.id}
                style={thisPlanWrapperStyle}
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
                <Separator color={active ? color("black100") : color("black15")} />
                <Spacer mb={["40px", "40px", "40px", "60px", "60px"]} />
                <Box p={2}>
                  <Media greaterThan="md">
                    <PriceText finalPrice={calcFinalPrice(plan.price)} originalPrice={plan.price} month="month" />
                  </Media>
                  <Media lessThan="lg">
                    <PriceText finalPrice={calcFinalPrice(plan.price)} originalPrice={plan.price} month="mo" />
                  </Media>
                </Box>
              </PlanWrapper>
            )
          })}
      </Flex>
      {showButton && (
        <>
          <Spacer mb={2} />
          <Button
            block
            onClick={() => {
              onSelectPlan(null)
            }}
          >
            Try now
          </Button>
        </>
      )}
    </Box>
  )
}

const PlanWrapper = styled(Box)<{ active?: boolean }>`
  width: 100%;
  flex: 3;
  border-bottom: 1px solid ${(p) => (p.active ? color("black100") : color("black15"))};
  border-top: 1px solid ${(p) => (p.active ? color("black100") : color("black15"))};
  border-right: 1px solid ${(p) => (p.active ? color("black100") : color("black15"))};
  box-shadow: ${(p) => (p.active ? "0 4px 12px 0 rgba(0, 0, 0, 0.2)" : "none")};
  background-color: ${color("white100")};
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
  }
`
