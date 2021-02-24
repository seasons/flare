import { Separator } from "components"
import { CollapsableFAQ } from "components/CollapsableFAQ"
import { Formik } from "formik"
import { color } from "helpers/color"
import React, { useState } from "react"
import styled from "styled-components"
import { colors } from "theme/colors"

import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Col, Flex, Grid, Row, Sans, Spacer } from "@seasons/eclipse"
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { PaymentBillingAddress } from "./PaymentBillingAddress"
import { PaymentForm } from "./PaymentForm"

interface PaymentStepProps {
  plan: {
    id: string
  }
}

export const PAYMENT_PLANS = gql`
  query GetPaymentPlans {
    faq(sectionType: PaymentPlanPage) {
      sections {
        title
        subsections {
          title
          text
        }
      }
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

const SUBMIT_PAYMENT_METHOD = gql`
  mutation SubmitPaymentMethod($paymentMethodID: String!, $planID: String!, $billing: JSON) {
    processPaymentMethod(paymentMethodID: $paymentMethodID, planID: $planID, billing: $billing)
  }
`

export const PaymentStep: React.FC<PaymentStepProps> = ({ plan }) => {
  const { previousData, data = previousData } = useQuery(PAYMENT_PLANS)
  const elements = useElements()
  const stripe = useStripe()
  const [submitPaymentMethod] = useMutation(SUBMIT_PAYMENT_METHOD, {
    onCompleted: async (data) => {
      console.log(data)
    },
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)

  const handleSubmit = async (values) => {
    console.log(values)

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const cardElement = elements.getElement(CardNumberElement)

    const billingDetails = {
      name: values.name,
      address: {
        line1: values.address1,
        line2: values.address2,
        city: values.city,
        state: values.state,
        postal_code: values.postalCode,
        country: "US",
      },
      email: data?.me?.customer?.user?.email || "luc@seasons.nyc",
    }

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
      const { data, errors } = await submitPaymentMethod({
        variables: {
          paymentMethodID: payload.paymentMethod.id,
          planID: plan?.id,
          billing: {
            ...billingDetails,
            user: {
              firstName: values.firstName,
              lastName: values.lastName,
              email: "luc@seasons.nyc",
            },
          },
        },
      })

      // handle errors
      if (errors) {
        console.log(errors)
      } else {
        const result = await stripe.confirmCardPayment(data.processPaymentMethod.client_secret, {
          payment_method: payload.paymentMethod.id,
        })

        console.log("HandleCardAction: ", result)
        setErrorMessage(null)
      }
    }
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={{}}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Box width="100%" height="100%" style={{ overflowY: "scroll" }}>
            <Grid>
              <Row>
                <BorderedCol md={7}>
                  <Box p={4}>
                    <Box mt={12} p={2}>
                      <Sans size="7" weight="medium">
                        Finish checking out
                      </Sans>
                      <Sans size="5" color="black50">
                        Add your billing address and payment details
                      </Sans>
                    </Box>
                    <Box>
                      <Flex flexDirection="row" alignItems="center" justifyContent="space-between" px={2} pb={2}>
                        <Box mt={2}>
                          <Sans size="6">Order Total</Sans>
                          <Sans size="4" color="black50">
                            Billed every 30-days
                          </Sans>
                        </Box>
                        <Box>
                          <Sans size="8">$65</Sans>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Box my={2}>
                    <Separator />
                  </Box>
                  <Box>
                    <Box p={6}>
                      <Box width="100%" py={4}>
                        <Sans size="7">Billing address</Sans>
                        <Spacer mt={2} />
                        <PaymentBillingAddress />
                      </Box>
                      <Box width="100%" py={4}>
                        <Sans size="7">Payment details</Sans>
                        <Spacer mt={2} />
                        <PaymentForm />
                      </Box>
                      <Box>
                        {errorMessage && <ErrorResult size="3">{errorMessage}</ErrorResult>}
                        {paymentMethod && <Box>Got PaymentMethod: {paymentMethod.id}</Box>}
                        <Button type="submit">Pay</Button>
                      </Box>
                    </Box>
                  </Box>
                </BorderedCol>
                <Col md={5}>
                  <Box
                    style={{ borderRight: `1px solid ${color("black15")}`, height: "100%", minHeight: "100vh" }}
                    px={[2, 2, 2, 5, 5]}
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
          </Box>
        </form>
      )}
    </Formik>
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
