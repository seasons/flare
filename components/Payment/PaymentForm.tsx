import classNames from "classnames"
import { Box, Flex } from "components"
import React, { useState } from "react"
import styled from "styled-components"
import { colors } from "theme/colors"

import { FormHelperText, InputLabel } from "@material-ui/core"
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
      color: "#f44336",
    },
  },
}

interface PaymentFormProps {
  planID?: string
}

const Field = ({ Element, id, label }) => {
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(null)
  return (
    <>
      <FieldContainer pt={2} pb={1} className={classNames({ focused: focused, error: !!error })}>
        <Label htmlFor={id}>{label}</Label>
        <Box pt="5px">
          <Element
            id={id}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setError(e.error)
            }}
            onReady={logEvent("ready")}
            options={ELEMENT_OPTIONS}
          />
        </Box>
      </FieldContainer>
      <FormHelperText error={!!error}>{error?.message ?? " "}</FormHelperText>
    </>
  )
}

const FieldContainer = styled(Box)`
  border-bottom: 1px solid ${colors.black15};
  margin-bottom: 1px;
  transition: all 0.1s;

  &:hover,
  &.focused {
    border-bottom: 2px solid ${colors.black85};
    margin-bottom: 0px;
  }

  &.error {
    border-bottom: 2px solid #f44336;
    margin-bottom: 0px;
  }
`

export const PaymentForm: React.FC<PaymentFormProps> = () => {
  return (
    <Box width="100%" maxWidth="600px">
      <Field Element={CardNumberElement} id="cardNumber" label="Card Number" />
      <Flex flexDirection="row">
        <Box flex="1" mr={2}>
          <Field Element={CardExpiryElement} id="expiry" label="Card Expiration" />
        </Box>
        <Box flex="1">
          <Field Element={CardCvcElement} id="cardCVC" label="CVC" />
        </Box>
      </Flex>
    </Box>
  )
}

const Label = styled(InputLabel)`
  margin: 10px 0 5px 0;
`
