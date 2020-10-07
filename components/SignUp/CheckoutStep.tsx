import React, { useEffect, useState } from "react"
import { color } from "styled-system"

import {
  CardElement, Elements, PaymentRequestButtonElement, useElements, useStripe
} from "@stripe/react-stripe-js"

import { Display, Sans, Separator, Spacer } from "../"
import { Box } from "../Box"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

export const CheckoutStep = ({ plan }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [paymentRequest, setPaymentRequest] = useState(null)

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Demo total",
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })
    }
  }, [stripe])

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message)
    } else {
      setError(null)
    }
  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (error) {
      console.log("[error]", error)
    } else {
      console.log("[PaymentMethod]", paymentMethod)
    }
  }

  // Use a traditional checkout form.
  return (
    <Box>
      {plan && (
        <Box my={2}>
          <Sans size="4" color="black50">
            You selected:
          </Sans>
          <Display size="9">{plan.tier === "AllAccess" ? "All Access" : plan.tier}</Display>
          <Box>
            <Box px={2} pt={4}>
              <Sans color="black100" size="3">
                <span style={{ fontSize: "32px", color: `${color("black100")}` }}>{plan.itemCount} </span>
                {plan.itemCount > 1 ? " items" : " item"}
              </Sans>
            </Box>
            <Separator />
            <Spacer mb="60px" />
            <Box p={2}>
              <Sans color="black50" size="3">
                <span style={{ fontSize: "20px", color: `${color("black100")}` }}>${plan.price / 100}</span> / month
              </Sans>
            </Box>
          </Box>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}
        <label>
          Card details
          <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
        </label>

        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </Box>
  )
}
