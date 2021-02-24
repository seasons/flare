import { Separator } from "components"
import { Field } from "formik"
import { TextField } from "formik-material-ui"
import { color } from "helpers/color"
import React from "react"
import styled from "styled-components"

import { InputLabel } from "@material-ui/core"
import { Box, Flex } from "@seasons/eclipse"

export const PaymentField = ({ id, name, placeholder }) => {
  return (
    <Box flex={1} mr={2}>
      <Label htmlFor={id}>{name}</Label>
      <Field
        component={TextField}
        id={id}
        name={id}
        placeholder={placeholder}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <Separator color={color("black15")} />
    </Box>
  )
}

export const PaymentBillingAddress = () => {
  return (
    <Box width="100%" maxWidth="600px">
      <Flex mt={2}>
        <PaymentField id="firstName" name="First Name" placeholder="Will" />
        <PaymentField id="lastName" name="Last Name" placeholder="Smith" />
      </Flex>
      <Flex mt={2}>
        <PaymentField id="address1" name="Address 1" placeholder="123 Dream Blvd" />
        <PaymentField id="address2" name="Address 2" placeholder="" />
      </Flex>
      <Flex mt={2}>
        <PaymentField id="city" name="City" placeholder="Brooklyn" />
        <PaymentField id="state" name="State" placeholder="NY" />
      </Flex>
      <Flex mt={2}>
        <PaymentField id="postalCode" name="Postal Code" placeholder="12345" />
      </Flex>
    </Box>
  )
}

const Label = styled(InputLabel)`
  margin: 10px 0 5px 0;
`
