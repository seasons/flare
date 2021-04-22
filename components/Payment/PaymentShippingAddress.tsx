import React from "react"
import { Box, Flex } from "@seasons/eclipse"
import { PaymentField } from "./PaymentBillingAddress"

export const PaymentShippingAddress = () => {
  return (
    <Box width="100%" maxWidth="600px">
      <Flex mt={2}>
        <PaymentField id="shippingFirstName" name="First Name" placeholder="Will" />
        <PaymentField id="shippingLastName" name="Last Name" placeholder="Smith" />
      </Flex>
      <Flex mt={2}>
        <PaymentField id="shippingAddress1" name="Address 1" placeholder="123 Dream Blvd" />
        <PaymentField id="shippingAddress2" name="Address 2" placeholder="Suite or Apt #" />
      </Flex>
      <Flex mt={2}>
        <PaymentField id="shippingCity" name="City" placeholder="Brooklyn" />
        <PaymentField id="shippingState" name="State" placeholder="NY" />
      </Flex>
      <Flex mt={2}>
        <PaymentField id="shippingPostalCode" type="text" name="Postal Code" placeholder="12345" />
      </Flex>
    </Box>
  )
}
