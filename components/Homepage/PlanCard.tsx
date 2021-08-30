import React from "react"
import { Box, Display, Flex, Sans, Spacer, Button } from "components"
import styled from "styled-components"
import { color } from "helpers"

export const PlanCard = ({ plan }) => {
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

      <Spacer mb={5} />
      <Button block>Apply for membership</Button>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  background-color: ${color("white100")};
  border-radius: 8px;
  box-shadow: 0 0 48px 0 rgba(0, 0, 0, 0.12);
`
