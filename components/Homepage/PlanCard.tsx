import React from "react"
import { Box, Sans, Spacer } from "components"
import styled from "styled-components"
import { color } from "helpers"
import { PlanFeatures } from "components/Payment/PlanFeatures"
import { MembershipCTA } from "./MembershipCTA"

export const PlanCard = ({ plan, userSession, authState }) => {
  const discount = "18.75% Off"
  const isYearlyPlan = plan?.planID === "access-yearly"
  const notActive = userSession?.customer?.status !== "Active"

  return (
    <Wrapper px={3} pt={5} pb={3}>
      {isYearlyPlan && (
        <DiscountWrapper px={2} py={1}>
          <Sans size="4">{discount}</Sans>
        </DiscountWrapper>
      )}
      <Sans size="7">{plan.name}</Sans>
      <Spacer mb={5} />
      <Sans size="10">
        ${plan.price / 100}
        <Sans size="4" color="black50" style={{ display: "inline" }}>
          {" "}
          / {isYearlyPlan ? "year" : "month"}
        </Sans>
      </Sans>
      <Sans size={["3", "4"]} color="black50">
        {plan.caption}
      </Sans>
      <Spacer mb={5} />
      <PlanFeatures features={plan?.features} />
      <Spacer mb={notActive ? 5 : 3} />
      {notActive && <MembershipCTA variant="primaryBlack" userSession={userSession} authState={authState} />}
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  max-width: 400px;
  width: 100%;
  position: relative;
  background-color: ${color("white100")};
  border-radius: 8px;
  box-shadow: 0 0 48px 0 rgba(0, 0, 0, 0.12);
`

const DiscountWrapper = styled(Box)`
  background-color: ${color("peach")};
  position: absolute;
  top: 24px;
  right: 24px;
  border-radius: 8px;
`
