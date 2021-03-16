import clsx from "classnames"
import { Flex, Sans } from "components"
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
    <ButtonGroup>
      {paymentPlans?.map((paymentPlan, index) => (
        <Button
          key={index}
          active={paymentPlan.id === selectedPlan?.id}
          onClick={() => {
            onPlanSelected(paymentPlan)
          }}
        >
          {paymentPlan?.name}
        </Button>
      ))}
    </ButtonGroup>
  )
}

const Button = ({ onClick, active, children, ...rest }) => {
  return (
    <Container {...rest} onClick={onClick} className={clsx({ active })}>
      <Sans weight="medium" size="4" style={{ textAlign: "center" }}>
        {children}
      </Sans>
    </Container>
  )
}

const ButtonGroup = styled(Flex)`
  flex-direction: row;
  overflow: hidden;
`

const Container = styled.button`
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  border-style: solid;

  border: 0.5px solid ${colors.black100};
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

  background-color: ${colors.white100};
  border-color: ${colors.black100};
  color: ${colors.black100};

  &.active {
    background-color: ${colors.black100};
    border-color: ${colors.black100};
    color: ${colors.white100};
  }
`
