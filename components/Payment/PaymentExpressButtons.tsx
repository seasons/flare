import { Box, Flex } from "components"
import React, { useEffect, useState } from "react"
import FadeIn from "react-fade-in"

import { PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js"

import { PaypalButton, PayPalFragment_PaymentPlan } from "./PaypalButton"
import { gql } from "@apollo/client"

export const PaymentExpressButtonsFragment_PaymentPlan = gql`
  fragment PaymentExpressButtonsFragment_PaymentPlan on PaymentPlan {
    id
    name
    estimate
    ...PayPalFragment_PaymentPlan
  }
  ${PayPalFragment_PaymentPlan}
`

export const PaymentExpressButtons = ({ plan, onPaymentMethodReceived }) => {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState(null)

  useEffect(() => {
    if (stripe && plan) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: plan.name,
          amount: plan.estimate?.total,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })

      pr.on("paymentmethod", async (ev) => {
        onPaymentMethodReceived?.(ev.paymentMethod)
      })

      // Check the availability of the Payment Request API.
      pr.canMakePayment()
        .then((result) => {
          if (result) {
            setPaymentRequest(pr)
          }
        })
        .catch((err) => console.error(err))
    }
  }, [stripe, plan])

  return (
    <Flex flexDirection="row" width="80%" height="45px" mt={2}>
      <Box width="30%" mr={2}>
        <PaypalButton plan={plan} />
      </Box>

      {paymentRequest && (
        <Box width="30%">
          <FadeIn>
            <PaymentRequestButtonElement
              options={{
                paymentRequest,
              }}
            />
          </FadeIn>
        </Box>
      )}
    </Flex>
  )
}
