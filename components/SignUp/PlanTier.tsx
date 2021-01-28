import { Box, Flex, Media, Sans, Separator, Spacer } from "components"
import React from "react"
import { Display } from "../Typography"
import { color } from "helpers/color"
import styled from "styled-components"
import { Check } from "components/SVGs/Check"

export const PlanTier: React.FC<{
  group: any
  onSelectPlan: (plan: any) => void
  allAccessEnabled: boolean
  selectedPlan?: any
  displayText?: boolean
}> = ({ group, onSelectPlan, allAccessEnabled, selectedPlan, displayText }) => {
  const tier = group?.[0].tier
  const descriptionLines = group?.[0]?.description?.split("\n") || []

  const renderingDisabledAllAccess = tier === "AllAccess" && typeof allAccessEnabled === "boolean" && !allAccessEnabled

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
  if (renderingDisabledAllAccess) {
    planWrapperStyle = { backgroundColor: color("black04") }
  }

  return (
    <Box width="100%" style={{ maxWidth: "500px" }}>
      {displayText ? (
        <Display size="9">{tier === "Essential" ? "Monthly" : tier}</Display>
      ) : (
        <Sans size="8">{tier === "Essential" ? "Monthly" : tier}</Sans>
      )}
      <Spacer mb={2} />
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
                withHover={!renderingDisabledAllAccess}
                style={thisPlanWrapperStyle}
                onClick={() => {
                  if (renderingDisabledAllAccess) {
                    // do nothing
                    return
                  }
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
      <Box style={{ position: "relative" }}>
        {renderingDisabledAllAccess && (
          <NoteWrapper>
            <Spacer mb={1} />
            <Sans color="black50" size="3">
              * All Access is disabled in your area due to shipping time.
            </Sans>
          </NoteWrapper>
        )}
      </Box>
    </Box>
  )
}

const PlanWrapper = styled(Box)<{ withHover: boolean; active?: boolean }>`
  width: 100%;
  flex: 3;
  border-bottom: 1px solid ${(p) => (p.active ? color("black100") : color("black15"))};
  border-top: 1px solid ${(p) => (p.active ? color("black100") : color("black15"))};
  border-right: 1px solid ${(p) => (p.active ? color("black100") : color("black15"))};
  box-shadow: ${(p) => (p.active ? "0 4px 12px 0 rgba(0, 0, 0, 0.2)" : "none")};
  background-color: ${color("white100")};
  cursor: ${(props) => (props.withHover ? "pointer" : "auto")};

  &:hover {
    box-shadow: ${(props) => (props.withHover ? "0 4px 12px 0 rgba(0, 0, 0, 0.2)" : "none")};
  }
`

const NoteWrapper = styled(Box)`
  position: absolute;
  bottom: -16px;
  left: 0;
`
