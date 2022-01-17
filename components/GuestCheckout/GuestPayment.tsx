import { Box, Button, Container, FixedBackArrow, Flex, Sans, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { Formik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { PaymentBillingAddress } from "components/Payment/PaymentBillingAddress"
import { PaymentForm } from "components/Payment"
import { Collapse } from "components/Collapse"
import { Checkbox } from "components/Checkbox"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import styled from "styled-components"
import { InputLabel } from "@material-ui/core"
import { useMutation } from "@apollo/client"
import { SUBMIT_ORDER } from "queries/orderQueries"
import { localCartVar } from "lib/apollo/cache"

export const GuestPayment = ({ order, email, shippingAddress }) => {
  const { openDrawer } = useDrawerContext()
  const elements = useElements()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const stripe = useStripe()
  const [isMutating, setIsMutating] = useState(false)
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [coupon, setCoupon] = useState("")
  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    onCompleted: () => {
      setIsMutating(false)
      localCartVar([])
      localStorage.setItem("localCartItems", "[]")
      openDrawer("orderConfirmation", { order, shippingAddress })
    },
    onError: (e) => {
      setIsMutating(false)
      showPopUp({
        title: "Oops! Try again!",
        note: "There was an issue purchasing this item. Please retry or contact us.",
        buttonText: "Close",
        onClose: () => {
          hidePopUp()
        },
      })
    },
  })

  const initialValues = {}

  // const valuesToAddressDetails = (values): { billingDetails: any } => {
  //   const billingDetails = {
  //     name: `${values.firstName} ${values.lastName}`,
  //     address: {
  //       line1: values.address1,
  //       line2: values.address2,
  //       city: values.city,
  //       state: values.state,
  //       postal_code: values.postalCode,
  //       country: "US",
  //     },
  //   }

  //   return { billingDetails }
  // }

  const handleSubmit = async (values) => {
    if (!stripe || !elements || isMutating) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    setIsMutating(true)

    const cardElement = elements.getElement(CardNumberElement)
    // const { billingDetails } = valuesToAddressDetails(values)

    const payload = await stripe.createSource(cardElement, {
      type: "card",
    })

    if (payload.error) {
      console.log("[error]", payload.error)
    } else {
      console.log("[Source]", payload.source)
      await submitOrder({
        variables: {
          input: {
            orderID: order.id,
            guest: {
              email,
              paymentMethodID: payload.source.id,
            },
          },
        },
      })
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
        validationSchema={sameAsShipping ? billingValidation : billingValidationWithAddress}
        height="100%"
        validateOnMount={true}
      >
        {({ handleSubmit, isValid, values, validateForm }) => (
          <form onSubmit={handleSubmit} style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Flex flexDirection="column" justifyContent="space-between" flex={1} height="100%">
              <Box px={2} pt={100}>
                <Sans size="7">Payment details</Sans>
                <PaymentForm />
                {/* <>
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
                            setTimeout(() => {
                              validateForm()
                            }, 100)
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
                          </> */}
              </Box>
              <Box p={2}>
                <Button size="medium" type="submit" disabled={isMutating || !isValid} loading={isMutating} block>
                  Confirm order
                </Button>
              </Box>
            </Flex>
          </form>
        )}
      </Formik>
    </Container>
  )
}

const Label = styled(InputLabel)`
  margin: 10px 0 5px 0;
`

const billingValidation = Yup.object().shape({})

const billingValidationWithAddress = Yup.object().shape({
  firstName: Yup.string().trim().required("Required"),
  lastName: Yup.string().trim().required("Required"),
  address1: Yup.string().trim().required("Required"),
  city: Yup.string().trim().required("Required"),
  state: Yup.string().trim().required("Required"),
  postalCode: Yup.string()
    .trim()
    .required("Required")
    .matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
})
