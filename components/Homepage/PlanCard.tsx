import { Box, Sans, Spacer } from "components"
import { PlanFeatures } from "components/Payment/PlanFeatures"
import React from "react"
import styled from "styled-components"

export const PlanCard = ({ plan, isDesktop }) => {
  const isYearlyPlan = plan?.planID === "access-yearly"

  return (
    <Wrapper>
      {isDesktop && <Sans size="9">{plan?.name} membership</Sans>}
      <Spacer mb={4} />
      <Sans size="10">
        ${plan?.price / 100}
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
  width: 100%;
  position: relative;
`
