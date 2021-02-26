import { Box, Flex } from "components"
import React, { useEffect, useState } from "react"

import { PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js"

import { PaypalButton } from "./PaypalButton"

export const PaymentExpressButtons = ({ plan }) => {
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
    <Flex flexDirection="row" width="80%" mt={2}>
      <Box width="30%" mr={2}>
        <PaypalButton plan={plan} />
      </Box>
      {paymentRequest && (
        <Box width="30%">
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
            }}
          />
        </Box>
      )}
    </Flex>
  )
}
