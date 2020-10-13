import { Box, Sans, Spacer } from "components"
import { ChooseMembership } from "components/Homepage"
import gql from "graphql-tag"
import { apolloClient } from "lib/apollo"
import React, { useEffect } from "react"

import { useQuery } from "@apollo/client"

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
  onError: (error: any) => void
  onSuccess: () => void
}

const GET_CHARGEBEE_CHECKOUT = gql`
  query getChargebeeCheckout($planID: String!, $email: String) {
    chargebeeCheckout(planID: $planID, email: $email) {
      id
      type
      url
      state
      embed
      created_at
      expires_at
    }
  }
`

export function GetChargebeeCheckout(planID: string): Promise<boolean | void> {
  // Set up the mutation
  return new Promise((resolve, reject) => {
    apolloClient
      .query({
        query: GET_CHARGEBEE_CHECKOUT,
        variables: {
          planID,
          email: localStorage.getItem("email"),
        },
      })
      .then((resp) => {
        resolve(resp.data.chargebeeCheckout)
      })
      .catch((error) => {
        // if they already subscribed, provide specific error message
        if (error.message.includes("already has a subscription")) {
          reject("Already subscribed. Please contact support@seasons.nyc to update your subscription")
        } else {
          reject("Something went wrong. Please try again later")
        }
      })
  })
}

export const ChoosePlanStep: React.FC<ChoosePlanStepProps> = ({ onPlanSelected, onError, onSuccess }) => {
  const { data } = useQuery(PAYMENT_PLANS)

  useEffect(() => {
    // @ts-ignore
    Chargebee.init({
      site: process.env.GATSBY_CHARGEBEE_SITE || "seasons-test",
    })
  }, [])

  function executeChargebeeCheckout(planID) {
    // @ts-ignore
    const chargebee = Chargebee.getInstance()
    chargebee.openCheckout({
      hostedPage: async () => {
        return await GetChargebeeCheckout(planID)
      },
      error: (error) => {
        console.error(error)
        onError(error)
      },
      success: (hostedPageId) => {
        onSuccess()
      },
    })
  }

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
          onPlanSelected(plan)
          executeChargebeeCheckout(plan.planID)
        }}
      />
    </Box>
  )
}
