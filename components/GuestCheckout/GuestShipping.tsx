import { Box, Button, Container, FixedBackArrow, Flex, Sans, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { PaymentShippingAddress } from "components/Payment/PaymentShippingAddress"
import { Formik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import { PaymentField } from "components/Payment/PaymentBillingAddress"

export const GuestShipping = () => {
  const { openDrawer } = useDrawerContext()
  const [isMutating, setIsMutating] = useState(false)

  const initialValues = {
    shippingFirstName: "",
    shippingLastName: "",
    shippingState: "",
    shippingCity: "",
    shippingPostalCode: "",
    shippingAddress1: "",
    email: "",
  }

  const valuesToAddressDetails = (values): { shippingDetails: any } => {
    const shippingDetails = {
      name: `${values.shippingFirstName} ${values.shippingLastName}`,
      address: {
        line1: values.shippingAddress1,
        line2: values.shippingAddress2,
        city: values.shippingCity,
        state: values.shippingState,
        postal_code: values.shippingPostalCode,
        country: "US",
      },
      email: values.email,
    }

    return { shippingDetails }
  }

  const handleSubmit = async (values) => {
    if (!isMutating) {
      setIsMutating(true)
      const { shippingDetails } = valuesToAddressDetails(values)

      //   processPayment(payload.paymentMethod, values, billingDetails, shippingDetails)
    }
  }

  return (
    <Container>
      <FixedBackArrow
        variant="whiteBackground"
        onPress={() => {
          openDrawer("bag")
        }}
      />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={shippingValidation}
        height="100%"
        validateOnMount={true}
      >
        {({ handleSubmit, isValid, values }) => (
          <form onSubmit={handleSubmit} style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Flex flexDirection="column" justifyContent="space-between" flex={1} height="100%">
              <Box px={2} pt={100}>
                <Sans size="7">Contact</Sans>
                <Spacer mt={2} />
                <PaymentField id="email" name="Email address" placeholder="Your email" />
                <Spacer mt={4} />
                <Sans size="7">Shipping address</Sans>
                <Spacer mt={2} />
                <PaymentShippingAddress />
                <Spacer mt={4} />
              </Box>
              <Box p={2}>
                <Button size="medium" type="submit" disabled={isMutating || !isValid} loading={isMutating} block>
                  Next
                </Button>
              </Box>
            </Flex>
          </form>
        )}
      </Formik>
    </Container>
  )
}

const shippingValidation = Yup.object().shape({
  email: Yup.string().trim().required("Required").email("Invalid email"),
  shippingFirstName: Yup.string().trim().required("Required"),
  shippingLastName: Yup.string().trim().required("Required"),
  shippingAddress1: Yup.string().trim().required("Required"),
  shippingCity: Yup.string().trim().required("Required"),
  shippingState: Yup.string().trim().required("Required"),
  shippingPostalCode: Yup.string()
    .trim()
    .required("Required")
    .matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
})
