import { Box, Button, Sans, Spacer } from "components"
import React, { useState } from "react"
import styled from "styled-components"
import * as Yup from "yup"
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { gql, useMutation } from "@apollo/client"
import {
  PaymentExpressButtons,
  PaymentExpressButtonsFragment_PaymentPlan,
} from "components/Payment/PaymentExpressButtons"
import { PaymentBillingAddress } from "components/Payment/PaymentBillingAddress"
import { PaymentForm } from "components/Payment"
import { Formik } from "formik"
import { EditPaymentMethod_Query } from "./EditPaymentMethod"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useNotificationBarContext } from "@seasons/eclipse"

const EnableExpressCheckout = process.env.ENABLE_EXPRESS_CHECKOUT == "true"

export const EditPaymentFormFragment_Query = gql`
  fragment EditPaymentFormFragment_Query on Query {
    me {
      id
      customer {
        id
        membership {
          id
          plan {
            id
            planID
          }
        }
        user {
          id
          email
        }
      }
    }
  }
`

const UpdatePaymentMethod_Mutation = gql`
  mutation UpdatePaymentMethod_Mutation($paymentMethodID: String!, $planID: String!, $billing: JSON) {
    updatePaymentMethod(paymentMethodID: $paymentMethodID, planID: $planID, billing: $billing)
  }
`

export const EditPaymentForm: React.FC<{ data: any }> = ({ data }) => {
  const elements = useElements()
  const { openDrawer } = useDrawerContext()
  const { hideNotificationBar } = useNotificationBarContext()
  const stripe = useStripe()
  const [updatePaymentMethod] = useMutation(UpdatePaymentMethod_Mutation, {
    onError: (error) => {
      console.error(error)
      setErrorMessage(error?.message)
      setIsProcessingPayment(false)
    },
    onCompleted: () => {
      setErrorMessage(null)
      setIsProcessingPayment(false)
      hideNotificationBar()
      openDrawer("paymentAndShipping")
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: EditPaymentMethod_Query,
      },
    ],
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const planID = data?.me?.customer?.membership?.plan?.planID

  console.log("data", data)

  const valuesToBillingDetails = (values) => ({
    name: values.name,
    address: {
      line1: values.address1,
      line2: values.address2,
      city: values.city,
      state: values.state,
      postal_code: values.postalCode,
      country: "US",
    },
    email: data?.me?.customer?.user?.email,
  })

  const handleUpdatePayment = async (paymentMethod, values, billingDetails) => {
    if (isProcessingPayment) {
      return
    }
    setIsProcessingPayment(true)
    await updatePaymentMethod({
      variables: {
        paymentMethodID: paymentMethod.id,
        planID,
        billing: {
          ...billingDetails,
          user: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: billingDetails.email,
          },
        },
      },
    })
  }

  const handleSubmit = async (values) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const cardElement = elements.getElement(CardNumberElement)
    const billingDetails = valuesToBillingDetails(values)

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    })

    if (payload.error) {
      console.log("[error]", payload.error)
      setErrorMessage(payload.error.message)
    } else {
      console.log("[PaymentMethod]", payload.paymentMethod)
      handleUpdatePayment(payload.paymentMethod, values, billingDetails)
    }
  }

  return (
    <Box width="100%" height="100%" style={{ overflowY: "scroll" }}>
      <Formik onSubmit={handleSubmit} initialValues={{}} validationSchema={validationSchema}>
        {({ handleSubmit, isValid, values }) => (
          <form onSubmit={handleSubmit}>
            <Spacer mt={10} />
            <Box px={2}>
              <Spacer mb={112} />
              <Sans size="6">Edit payment and billing</Sans>
            </Box>
            <Box p={[2, 2, 2]}>
              {/* {EnableExpressCheckout && (
                <Box py={4}>
                  <Sans size="4">Express checkout</Sans>
                  <PaymentExpressButtons
                    plan={paymentPlan}
                    onPaymentMethodReceived={(paymentMethod) => {
                      handleUpdatePayment(paymentMethod, values, valuesToBillingDetails(values))
                    }}
                  />
                </Box>
              )} */}
              <Box width="100%" py={[2, 2, 4]}>
                <Sans size="4">Billing address</Sans>
                <Spacer mt={2} />
                <PaymentBillingAddress />
              </Box>
              <Box width="100%" py={[2, 2, 4]}>
                <Box style={{ maxWidth: "320px", overflow: "hidden" }}>
                  {errorMessage && (
                    <>
                      <ErrorResult size="3">{errorMessage}</ErrorResult>
                      <Spacer mt={2} />
                    </>
                  )}
                </Box>
                <Sans size="4">Payment details</Sans>
                <Spacer mt={2} />
                <PaymentForm />
              </Box>
              <Button
                type="submit"
                block
                variant="primaryBlack"
                loading={isProcessingPayment}
                disabled={!isValid || isProcessingPayment}
              >
                Submit
              </Button>
              <Spacer mt={10} />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const ErrorResult = styled((props) => <Sans {...props} />)`
  color: red;
`

const validationSchema = Yup.object().shape({
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
