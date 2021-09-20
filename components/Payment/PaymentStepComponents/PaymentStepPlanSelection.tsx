import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import React from "react"

import { PlanButton } from "../PlanButton"
import { PlanFeatures } from "../PlanFeatures"

export const PaymentStepPlanSelection = ({ plans, features, selectedPlan, setPlan }) => {
  const lowestPlanPrice = plans?.map((plan) => plan.price)?.reduce((a, b) => Math.min(a, b))

  return (
    <>
      <Sans size="8" weight="medium">
        You're in! Choose your plan
      </Sans>
      <Spacer mt={3} />
      <PlanFeatures features={features} />
      <Spacer mt={2} />
      {plans?.map((p) => {
        return (
          <PlanButton
            key={p.id}
            lowestPlanPrice={lowestPlanPrice}
            plan={p}
            shouldSelect={(selectedPlan) => setPlan(selectedPlan)}
            selected={selectedPlan?.id === p.id}
          />
        )
      })}
    </>
  )
}
