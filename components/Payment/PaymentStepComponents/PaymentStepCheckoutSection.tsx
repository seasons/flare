import { Box, Flex, Sans, Spacer } from "components"
import React from "react"
import { Checkbox } from "components/Checkbox"
import { Collapse } from "components/Collapse"
import { PaymentBillingAddress } from "../PaymentBillingAddress"
import { PaymentShippingAddress } from "../PaymentShippingAddress"
import { PaymentForm } from "../PaymentForm"
import { PaymentExpressButtons } from "../PaymentExpressButtons"
import styled from "styled-components"
import { InputLabel } from "@material-ui/core"

const enableExpressCheckout = process.env.ENABLE_EXPRESS_CHECKOUT == "true"

export const PaymentStepCheckoutSection = ({
  errorMessage,
  valuesToAddressDetails,
  processPayment,
  sameAsShipping,
  setSameAsShipping,
  values,
  selectedPlan,
}) => {
  return (
    <Box>
      <Box p={[2, 2, 6]} pt={0}>
        {enableExpressCheckout && (
          <Box py={4}>
            <Sans size="7">Express checkout</Sans>
            <PaymentExpressButtons
              plan={selectedPlan}
              onPaymentMethodReceived={(paymentMethod) => {
                const { billingDetails, shippingDetails } = valuesToAddressDetails(values)
                processPayment(paymentMethod, values, billingDetails, shippingDetails)
              }}
            />
          </Box>
        )}
        <Box width="100%" py={[2, 2, 4]}>
          <Box>
            {errorMessage && (
              <>
                <ErrorResult size="3">{errorMessage}</ErrorResult>
                <Spacer mt={2} />
              </>
            )}
          </Box>
          <Sans size="7">Payment details</Sans>
          <Spacer mt={2} />
          <PaymentForm />
        </Box>
        <Box width="100%" py={[2, 2, 4]}>
          <Sans size="7">Shipping address</Sans>
          <Spacer mt={2} />
          <PaymentShippingAddress />
        </Box>
        <Box width="100%" py={[2, 2, 4]}>
          <Sans size="7">Billing address</Sans>
          <Spacer mt={2} />
          <Flex flexDirection="row" alignItems="center" width="100%" maxWidth="600px">
            <Flex flexDirection="row" alignItems="center" justifyContent="flex-start" width="50%">
              <Label>Same as shipping address</Label>
              <Box ml={3}>
                <Checkbox
                  isActive={sameAsShipping}
                  onClick={() => {
                    setSameAsShipping(!sameAsShipping)
                  }}
                />
              </Box>
            </Flex>
          </Flex>
          <Collapse open={!sameAsShipping}>
            <Spacer mt={2} />
            <PaymentBillingAddress />
          </Collapse>
        </Box>
        <Spacer mt={8} />
      </Box>
    </Box>
  )
}

const ErrorResult = styled((props) => <Sans {...props} />)`
  color: red;
`

const Label = styled(InputLabel)`
  margin: 10px 0 5px 0;
`
