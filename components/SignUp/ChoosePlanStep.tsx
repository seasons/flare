import Chargebee from "chargebee"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"

import { useQuery } from "@apollo/react-hooks"
import { useStripe } from "@stripe/react-stripe-js"

import { Box, ExternalLink, Flex, Sans, Spacer } from "../"
import { ChooseMembership } from "../../components/Homepage"

// import { apolloClientInstance } from "../components/apollo"

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

export type PlanID = "Essential" | "AllAccess"
export function GetChargebeeCheckout(planID: PlanID, userIDHash: string): Promise<boolean | void> {
  // Set up a graphQL mutation to sign the user up
  const getChargebeeCheckout = gql`
    query getChargebeeCheckout($planID: PlanID!, $userIDHash: String!) {
      chargebeeCheckout(planID: $planID, userIDHash: $userIDHash) {
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
  // Set up the mutation
  return new Promise((resolve, reject) => {
    apolloClientInstance
      .query({
        query: getChargebeeCheckout,
        variables: {
          planID,
          userIDHash,
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

export const ChoosePlanStep: React.FC<ChoosePlanStepProps> = ({ onPlanSelected }) => {
  const { data } = useQuery(PAYMENT_PLANS)

  function executeChargebeeCheckout(planID) {
    // @ts-ignore
    const chargebeeInstance = Chargebee.getInstance()

    chargebeeInstance.openCheckout({
      hostedPage: () => GetChargebeeCheckout(planID, ""),
      error: (error) => {
        // onError(error)
      },
      success: function StoreBillingInfoAndHandleSubmit(hostedPageId) {
        AcknowledgeCheckout(hostedPageId)
        handleSubmit()
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
          console.log(plan)
          onPlanSelected(plan)

          // const res = await fetch("/api/checkoutSession")
          // console.log(res)
          // // Redirect to stripe checkout

          // const data = await res.json()

          // stripe
          //   .redirectToCheckout({
          //     sessionId: data.checkoutSessionId,
          //   })
          //   .then(function (result) {
          //     console.log("error")
          //     // If `redirectToCheckout` fails due to a browser or network
          //     // error, display the localized error message to your customer
          //     // using `result.error.message`.
          //   })
          //   .catch(function (err) {
          //     console.log(err)
          //   })
        }}
      />
    </Box>
  )
}
