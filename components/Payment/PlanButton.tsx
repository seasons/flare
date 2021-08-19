import { Box, Flex, Sans, Spacer } from "components"
import { Radio } from "components/Radio/Radio"
import { color } from "helpers"
import React from "react"
import styled from "styled-components"

interface PlanButtonProps {
  shouldSelect: (plan: any) => void
  selected: boolean
  plan: any
  lowestPlanPrice: number
}

export const PlanButton: React.FC<PlanButtonProps> = ({ lowestPlanPrice, shouldSelect, selected, plan }) => {
  const { price, name, caption } = plan
  const monthlyPrice = plan.price / 12
  const planDiscount = 100 - (monthlyPrice / lowestPlanPrice) * 100
  const showYearlyDiscount = plan.planID === "access-yearly" && selected && planDiscount

  const formatPrice = (price) =>
    (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

  return (
    <StyledFlex width="100%" height={72} mb={1} px={2} selected={selected} onClick={() => shouldSelect(plan)}>
      {showYearlyDiscount && (
        <PlanDiscount px={0.5}>
          <Sans size="3" color="white100">
            {planDiscount}% Off
          </Sans>
        </PlanDiscount>
      )}
      <Flex flexDirection="row" alignItems="center">
        <Radio selected={selected} />
        <Spacer mr={1} />
        <Flex flexDirection="column">
          <Sans color="black100" size="5">
            {name}
          </Sans>
          <Sans size="2" color="black50">
            {caption}
          </Sans>
        </Flex>
      </Flex>
      <Sans color="black100" size="5">
        {formatPrice(price)}
      </Sans>
    </StyledFlex>
  )
}

const StyledFlex = styled(Box)<{ selected: boolean }>`
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  display: flex;
  z-index: 10;
  border: 1px solid ${(p) => (p.selected ? color("black100") : color("black25"))};
  position: relative;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.1);
  max-width: 592px;
`

const PlanDiscount = styled(Box)`
  position: absolute;
  top: -10px;
  right: 20px;
  border-radius: 4px;
  background-color: ${color("black100")};
`
