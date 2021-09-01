import React from "react"
import { Box, Sans, Spacer, Button } from "components"
import styled from "styled-components"
import { color } from "helpers"
import { useRouter } from "next/router"
import { PlanFeatures } from "components/Payment/PlanFeatures"

export const PlanCard = ({ plan }) => {
  const router = useRouter()

  return (
    <Wrapper px={3} pt={5} pb={3}>
      <Sans size="7">{plan.name}</Sans>
      <Spacer mb={5} />
      <Sans size="10">
        ${plan.price / 100}
        <Sans size="4" color="black50" style={{ display: "inline" }}>
          {" "}
          / month
        </Sans>
      </Sans>
      <Sans size="4" color="black50">
        {plan.caption}
      </Sans>
      <Spacer mb={5} />
      <PlanFeatures features={plan?.features} />
      <Spacer mb={5} />
      <Button block onClick={() => router.push("/signup")}>
        Apply for membership
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  background-color: ${color("white100")};
  border-radius: 8px;
  box-shadow: 0 0 48px 0 rgba(0, 0, 0, 0.12);
`
