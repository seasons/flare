import { Separator } from "components"
import { CollapsableFAQ } from "components/CollapsableFAQ"
import { FormFooter } from "components/Forms/FormFooter"
import { Formik } from "formik"
import { color } from "helpers/color"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { colors } from "theme/colors"
import * as Yup from "yup"

import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Col, Grid, Row, Sans, Spacer } from "@seasons/eclipse"
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { PaymentBillingAddress } from "./PaymentBillingAddress"
import { PaymentExpressButtons } from "./PaymentExpressButtons"
import { PaymentForm } from "./PaymentForm"
import { PaymentOrderSummary } from "./PaymentOrderSummary"
import { GET_SIGNUP_USER } from "components/SignUp/queries"

interface PaymentStepProps {
  plan: {
    id: string
    planID: string
    name: string
    price: number
  }
  onSuccess?: (data: any) => void
  onError?: (data: any) => void
}

export const PAYMENT_PLANS = gql`
  query GetPaymentPlans($planID: String!) {
    faq(sectionType: PaymentPlanPage) {
      sections {
        title
        subsections {
          title
          text
        }
      }
    }
    paymentPlan(where: { planID: $planID }) {
      id
      name
      planID
      price
      estimate
    }
    me {
      customer {
        id
        user {
          id
          email
        }
        admissions {
          id
          admissable
          authorizationsCount
          authorizationWindowClosesAt
        }
      }
    }
  }
`
const EnableExpressCheckout = process.env.ENABLE_EXPRESS_CHECKOUT == "true"

const SUBMIT_PAYMENT = gql`
  mutation SubmitPayment($paymentMethodID: String!, $planID: String!, $billing: JSON) {
    processPayment(paymentMethodID: $paymentMethodID, planID: $planID, billing: $billing)
  }
`

export const PaymentStep: React.FC<PaymentStepProps> = ({ plan, onSuccess, onError }) => {
  const elements = useElements()
  const stripe = useStripe()
  const [submitPayment] = useMutation(SUBMIT_PAYMENT, {
    onError: (error) => {
      console.error(error)
      setErrorMessage(error?.message)
      setIsProcessingPayment(false)
    },
    onCompleted: () => {
      onSuccess(data)
      setErrorMessage(null)
      setIsProcessingPayment(false)
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_SIGNUP_USER,
      },
    ],
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [planID, setPlanID] = useState(plan?.planID)
  const { previousData, data = previousData } = useQuery(PAYMENT_PLANS, {
    variables: {
      planID,
    },
  })

  useEffect(() => {
    if (plan) {
      setPlanID(plan.planID)
    }
  }, [plan])

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
      setPaymentMethod(null)
    } else {
      console.log("[PaymentMethod]", payload.paymentMethod)
      setPaymentMethod(payload.paymentMethod)
      processPayment(payload.paymentMethod, values, billingDetails)
    }
  }

  const processPayment = async (paymentMethod, values, billingDetails) => {
    if (isProcessingPayment) {
      return
    }
    setIsProcessingPayment(true)
    await submitPayment({
      variables: {
        paymentMethodID: paymentMethod.id,
        planID: plan?.planID,
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

  return (
    <Box width="100%" height="100%" style={{ overflowY: "scroll" }}>
      <Formik onSubmit={handleSubmit} initialValues={{}} validationSchema={validationSchema}>
        {({ handleSubmit, isValid, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid>
              <Row>
                <BorderedCol md={7}>
                  <Box pt={4} px={4} pb={2}>
                    <Box mt={12} p={2}>
                      <Sans size="8" weight="medium">
                        Finish checking out
                      </Sans>
                      <Spacer mt={1} />
                      <Sans size="4" color="black50">
                        Add your billing address and payment details
                      </Sans>
                    </Box>
                  </Box>
                  <Box my={2}>
                    <Separator />
                  </Box>
                  <PaymentOrderSummary plan={data?.paymentPlan} />
                  <Box my={2}>
                    <Separator />
                  </Box>
                  <Box>
                    <Box p={6}>
                      {EnableExpressCheckout && (
                        <Box py={4}>
                          <Sans size="7">Express checkout</Sans>
                          <PaymentExpressButtons
                            plan={data?.paymentPlan}
                            onPaymentMethodReceived={(paymentMethod) => {
                              processPayment(paymentMethod, values, valuesToBillingDetails(values))
                            }}
                          />
                        </Box>
                      )}
                      <Box width="100%" py={4}>
                        <Sans size="7">Billing address</Sans>
                        <Spacer mt={2} />
                        <PaymentBillingAddress />
                      </Box>
                      <Box width="100%" py={4}>
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
                      <Spacer mt={4} />
                    </Box>
                  </Box>
                </BorderedCol>
                <Col md={5}>
                  <Box
                    style={{ borderRight: `1px solid ${color("black15")}`, height: "100%", minHeight: "100vh" }}
                    px={[2, 2, 2, 2, 2]}
                    pt={150}
                  >
                    <FAQWrapper>
                      <Sans size="8" color="black100">
                        FAQ
                      </Sans>
                      <Spacer mb={1} />
                      <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
                        What to know about membership
                      </Sans>
                      <Spacer mb={5} />
                      <CollapsableFAQ faqSections={data?.faq?.sections} />
                    </FAQWrapper>
                  </Box>
                </Col>
              </Row>
            </Grid>
            <FormFooter
              footerText={<>You can upgrade or change your plan at any time from your account settings.</>}
              buttonText="Checkout"
              isSubmitting={isProcessingPayment}
              disabled={!isValid || isProcessingPayment}
              handleSubmit={() => {
                // onCompleted?.()
              }}
            />
          </form>
        )}
      </Formik>
    </Box>
  )
}

const BorderedCol = styled(Col)`
  border-left: 1px solid ${colors.black15};
  border-right: 1px solid ${colors.black15};
`

const FAQWrapper = styled(Box)`
  width: 100%;
  height: 100%;
`

const ErrorResult = styled(Sans)`
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
