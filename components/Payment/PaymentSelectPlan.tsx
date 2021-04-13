import clsx from "classnames"
import { Box, Sans } from "components"
import React from "react"
import styled from "styled-components"
import { colors } from "theme/colors"

interface PaymentSelectPlanProps {
  paymentPlans: any
  selectedPlan: any
  onPlanSelected?: (plan: any) => void
}

export const PaymentSelectPlan: React.FC<PaymentSelectPlanProps> = ({ paymentPlans, selectedPlan, onPlanSelected }) => {
  if (!paymentPlans) {
    return null
  }

  return (
    <ButtonGroup mx={2}>
      {paymentPlans?.map((paymentPlan, index) => {
        const count = paymentPlan?.itemCount
        return (
          <Button key={index} active={paymentPlan.id === selectedPlan?.id} onClick={() => onPlanSelected(paymentPlan)}>
            {count} {count === 1 ? "item" : "items"}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

const Button = ({ active, children, ...rest }) => {
  return (
    <Container {...rest} className={clsx({ active })}>
      <Sans weight="medium" size="4" style={{ textAlign: "center" }}>
        {children}
      </Sans>
    </Container>
  )
}

const ButtonGroup = styled(Box)`
  flex-direction: row;
  display: flex;
  overflow: hidden;
`

const Container = styled.button`
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  border-style: solid;

  border: 0.5px solid ${colors.black15};
  border-left-width: 0px;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-left-width: 0.5px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  height: 56px;
  flex: 1;

  background-color: ${colors.black04};
  color: ${colors.black50};

  &.active {
    background-color: ${colors.black100};
    border-color: ${colors.black100};
    color: ${colors.white100};
  }
`
