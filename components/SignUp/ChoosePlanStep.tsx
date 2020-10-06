import { gql } from "apollo-boost"
import React, { useEffect, useState } from "react"

import { useQuery } from "@apollo/react-hooks"
import { loadStripe, Stripe } from "@stripe/stripe-js"

import { Box, ExternalLink, Flex, Sans, Spacer } from "../"
import { ChooseMembership } from "../../components/Homepage"

export const PAYMENT_PLANS = gql`
  query GetPaymentPlans {
    paymentPlans(where: { status: "active" }) {
      id
      name
      description
      tagline
      price
      planID
      tier
      itemCount
    }
  }
`

interface ChoosePlanStepProps {
  onPlanSelected: (plan: any) => void
}

export const ChoosePlanStep: React.FC<ChoosePlanStepProps> = ({ onPlanSelected }) => {
  const { data } = useQuery(PAYMENT_PLANS)
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    const load = async () => {
      const stripe = await loadStripe("pk_test_RUHQ0ADqBJHmknHqApuPBGS900fJpiEabb")
      setStripe(stripe)
      return stripe
    }
    load()
  }, [])

  return (
    <Box mx="auto" my={4} p={4}>
      <Box ml="80px">
        <Sans size="8" color="black100">
          You're In. Let's choose your plan
        </Sans>
        <Spacer mb={1} />
        <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
          Here’s whats included in this membership:
        </Sans>
      </Box>
      <Spacer mb={3} />
      <ChooseMembership
        paymentPlans={data?.paymentPlans}
        onSelectPlan={async (plan) => {
          console.log(plan)
          onPlanSelected(plan)

          const res = await fetch("/api/checkoutSession")
          console.log(res)
          // Redirect to stripe checkout

          const data = await res.json()

          stripe
            .redirectToCheckout({
              sessionId: data.checkoutSessionId,
            })
            .then(function (result) {
              console.log("error")
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer
              // using `result.error.message`.
            })
            .catch(function (err) {
              console.log(err)
            })
        }}
      />
    </Box>
  )
}
