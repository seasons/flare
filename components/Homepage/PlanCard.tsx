import { Box, Sans, Spacer } from "components"
import { PlanFeatures } from "components/Payment/PlanFeatures"
import { color } from "helpers"
import React from "react"
import styled from "styled-components"

export const PlanCard = ({ plan, isDesktop }) => {
  const isYearlyPlan = plan?.planID === "access-yearly"

  return (
    <Wrapper>
      {isDesktop && (
        <>
          <Sans size="9">{plan.name} membership</Sans>
          <Spacer mb={5} />
        </>
      )}
      <Sans size="10">
        ${plan.price / 100}
        <Sans size="4" color="black50" style={{ display: "inline" }}>
          {" "}
          / {isYearlyPlan ? "year" : "month with a 3-month minimum"}
        </Sans>
      </Sans>
      <Spacer mb={3} />
      <PlanFeatures features={plan?.features} />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  max-width: 500px;
  width: 100%;
  position: relative;
  background-color: ${color("white100")};
`

const DiscountWrapper = styled(Box)`
  background-color: ${color("peach")};
  position: absolute;
  top: 24px;
  right: 24px;
  border-radius: 8px;
`
