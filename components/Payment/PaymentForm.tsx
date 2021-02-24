import { Box, Flex, Separator } from "components"
import { Field } from "formik"
import { TextField } from "formik-material-ui"
import { color } from "helpers/color"
import React from "react"
import styled from "styled-components"
import { colors } from "theme/colors"

import { InputLabel } from "@material-ui/core"
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js"

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

interface PaymentFormProps {
  planID?: string
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ planID }) => {
  return (
    <>
      <Box>
        <Label htmlFor="fullName">Full Name</Label>
        <Field
          component={TextField}
          id="fullName"
          name="fullName"
          placeholder="Will Smith"
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
    </>
  )
}

const Label = styled(InputLabel)`
  margin: 10px 0 5px 0;
`
