import { Field, useFormikContext } from "formik"
import { TextField } from "formik-material-ui"
import React from "react"
import styled from "styled-components"
import { colors } from "theme/colors"

import { InputLabel, makeStyles, withStyles } from "@material-ui/core"
import { Box, Flex } from "@seasons/eclipse"

const useStyles = makeStyles({
  underline: {
    "&&:before": {
      borderBottomColor: colors.black15,
    },
    "&&:not(.Mui-error):after": {
      borderBottomColor: colors.black50,
    },
  },
})

export const PaymentField = ({ id, name, ...rest }) => {
  const { errors, touched } = useFormikContext()
  const classes = useStyles()
  const hasError = errors[id] && touched[id]

  return (
    <Box flex={1} mr={2}>
      <Label htmlFor={id}>{name}</Label>
      <Field {...rest} component={TextField} id={id} name={id} error={hasError} fullWidth InputProps={{ classes }} />
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
        <PaymentField id="address2" name="Address 2" placeholder="Apt 3" />
      </Flex>
      <Flex mt={2}>
        <PaymentField id="city" name="City" placeholder="Brooklyn" />
        <PaymentField id="state" name="State" placeholder="NY" />
      </Flex>
      <Flex mt={2}>
        <PaymentField id="postalCode" type="number" name="Postal Code" placeholder="12345" />
      </Flex>
    </Box>
  )
}

const Label = styled(InputLabel)`
  margin: 10px 0 5px 0;
`
