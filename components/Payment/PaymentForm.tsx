import { Box, Button, Container, Flex, Separator } from "components"
import { color } from "helpers/color"
import React, { useState } from "react"
import styled from "styled-components"
import { colors } from "theme/colors"

import { gql, useMutation } from "@apollo/client"
import { InputLabel, TextField } from "@material-ui/core"
import { Sans } from "@seasons/eclipse"
import {
  CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe
} from "@stripe/react-stripe-js"

const logEvent = (name) => (event) => {
  console.log(`[${name}]`, event)
}

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      color: colors.black85,
      letterSpacing: "0.025em",
      fontFamily: "'ProximaNova-Medium', sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#949494",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
}

const SUBMIT_PAYMENT_METHOD = gql`
  mutation SubmitPaymentMethod($paymentMethodID: String!) {
    processPaymentMethod(paymentMethodID: $paymentMethodID)
  }
`

interface PaymentFormProps {
  planID?: string
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ planID }) => {
  const elements = useElements()
  const stripe = useStripe()
  const [submitPaymentMethod] = useMutation(SUBMIT_PAYMENT_METHOD, {
    onCompleted: async (data) => {
      console.log(data)

      await stripe.handleCardAction(data.processPaymentMethod.client_secret)
    },
  })
  const [name, setName] = useState("")
  const [postal, setPostal] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const cardElement = elements.getElement(CardNumberElement)

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name,
        address: {
          postal_code: postal,
        },
      },
    })

    if (payload.error) {
      console.log("[error]", payload.error)
      setErrorMessage(payload.error.message)
      setPaymentMethod(null)
    } else {
      console.log("[PaymentMethod]", payload.paymentMethod)
      setPaymentMethod(payload.paymentMethod)
      await submitPaymentMethod({
        variables: {
          paymentMethodID: payload.paymentMethod.id,
        },
      })
      setErrorMessage(null)
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Box>
          <Label htmlFor="fullName">Full Name</Label>
          <TextField
            id="fullName"
            value={name}
            placeholder={"Will Smith"}
            onChange={(e) => {
              setName(e.target.value)
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Separator color={color("black15")} />
        </Box>
        <Box py={2}>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Box pt="5px" pb="3px">
            <CardNumberElement
              id="cardNumber"
              onChange={logEvent("change")}
              onReady={logEvent("ready")}
              options={ELEMENT_OPTIONS}
            />
          </Box>
          <Separator color={color("black15")} />
        </Box>
        <Flex flexDirection="row">
          <Box py={2} flex="1" mr={2}>
            <Label htmlFor="cardNumber">Card Expiration</Label>
            <Box pt="5px" pb="3px">
              <CardExpiryElement
                id="expiry"
                onChange={logEvent("change")}
                onReady={logEvent("ready")}
                options={ELEMENT_OPTIONS}
              />
            </Box>
            <Separator color={color("black15")} />
          </Box>
          <Box py={2} flex="1">
            <Label htmlFor="cardNumber">CVC</Label>
            <Box pt="5px" pb="3px">
              <CardCvcElement
                id="cvc"
                onChange={logEvent("change")}
                onReady={logEvent("ready")}
                options={ELEMENT_OPTIONS}
              />
            </Box>
            <Separator color={color("black15")} />
          </Box>
        </Flex>
        <Box py={2}>
          <Label htmlFor="postalCode">Postal Code</Label>
          <TextField
            value={postal}
            id="postalCode"
            placeholder={"12345"}
            onChange={(e) => {
              setPostal(e.target.value)
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Separator color={color("black15")} />
        </Box>
        {errorMessage && <ErrorResult size="3">{errorMessage}</ErrorResult>}
        {paymentMethod && <Box>Got PaymentMethod: {paymentMethod.id}</Box>}
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </Container>
    </Form>
  )
}

const Form = styled.form`
  width: 100%;
  max-width: 80%;

  input {
    -webkit-font-smoothing: antialiased;
  }
`

const ErrorResult = styled(Sans)`
  color: red;
`

const Label = styled(InputLabel)`
  margin: 10px 0 5px 0;
`
