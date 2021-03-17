import { Separator } from "components"
import { CollapsableFAQ } from "components/CollapsableFAQ"
import { FormFooter } from "components/Forms/FormFooter"
import { BackArrowIcon } from "components/Icons"
import { GET_SIGNUP_USER } from "components/SignUp/queries"
import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { media } from "styled-bootstrap-grid"
import styled from "styled-components"
import { colors } from "theme/colors"
import * as Yup from "yup"

import { gql, useMutation, useQuery } from "@apollo/client"
import { BagItemFragment, Box, Col, Grid, REMOVE_FROM_BAG, Row, Sans, Spacer } from "@seasons/eclipse"
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { PaymentBagItem } from "./PaymentBagItem"
import { PaymentBillingAddress } from "./PaymentBillingAddress"
import { PaymentExpressButtons } from "./PaymentExpressButtons"
import { PaymentForm } from "./PaymentForm"
import { PaymentOrderSummary } from "./PaymentOrderSummary"
import { PaymentSelectPlan } from "./PaymentSelectPlan"

interface PaymentStepProps {
  plan: {
    id: string
    planID: string
    name: string
    price: number
  }
  onSuccess?: (data: any) => void
  onError?: (data: any) => void
  onBack?: () => void
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
    paymentPlans(where: { status: "active" }, orderBy: itemCount_ASC) {
      id
      name
      price
      planID
      itemCount
      estimate
    }
    me {
      bag {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
        position
        saved
        status
      }
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
  ${BagItemFragment}
`
const EnableExpressCheckout = process.env.ENABLE_EXPRESS_CHECKOUT == "true"

const SUBMIT_PAYMENT = gql`
  mutation SubmitPayment($paymentMethodID: String!, $planID: String!, $billing: JSON) {
    processPayment(paymentMethodID: $paymentMethodID, planID: $planID, billing: $billing)
  }
`

export const PaymentStep: React.FC<PaymentStepProps> = ({ onSuccess, onError, onBack }) => {
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
  const [plan, setPlan] = useState(null)
  const { previousData, data = previousData, loading } = useQuery(PAYMENT_PLANS, {
    fetchPolicy: "network-only",
  })
  const [planError, setPlanError] = useState(null)
  const [removeFromBag] = useMutation(REMOVE_FROM_BAG, {
    refetchQueries: [
      {
        query: PAYMENT_PLANS,
      },
    ],
    awaitRefetchQueries: true,
  })

  useEffect(() => {
    if (data && !loading) {
      const bagCount = data?.me?.bag.length || 3
      const paymentPlanIndex = bagCount - 1 < data?.paymentPlans?.length ? bagCount - 1 : 0
      setPlan(data?.paymentPlans?.[paymentPlanIndex])
    }
  }, [data, loading])

  useEffect(() => {
    if (plan) {
      if (plan.itemCount < data?.me?.bag.length) {
        // TODO: set error
        setPlanError(data?.me?.bag.length - plan.itemCount)
      } else {
        setPlanError(null)
      }
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
                <LeftColumn md={8}>
                  <TouchableOpacity
                    onPress={() => {
                      onBack?.()
                    }}
                  >
                    <Arrow color={colors.black100} />
                  </TouchableOpacity>
                  <Box pt={4} px={4} pb={2}>
                    <Box mt={12} p={2}>
                      <Sans size="8" weight="medium">
                        Finish checking out
                      </Sans>
                      <Spacer mt={1} />
                      <Sans size="4" color="black50">
                        You're checking out with a {plan?.itemCount}-item plan. To change plans, update your bag.
                      </Sans>
                    </Box>
                    <Spacer mt={2} />
                    <PaymentSelectPlan
                      paymentPlans={data?.paymentPlans}
                      selectedPlan={plan}
                      onPlanSelected={(selectedPlan) => setPlan(selectedPlan)}
                    />
                  </Box>
                  <Box my={2}>
                    <Separator />
                  </Box>
                  <PaymentOrderSummary plan={plan} />
                  <Box my={2}>
                    <Separator />
                  </Box>
                  <Box>
                    <Box p={6} pt={2}>
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
                      <Box width="100%" py={[2, 2, 4]}>
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
                </LeftColumn>
                <RightColumn md={4}>
                  <Box style={{ height: "100%", minHeight: "100vh" }}>
                    <Box px={[2, 2, 2, 5, 5]} pt={[50, 50, 150]}>
                      <Box mb={4}>
                        <Sans size="8" color="black100">
                          Your bag
                        </Sans>
                        <Spacer mb={1} />
                        <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
                          Finish checking out to reserve these today
                        </Sans>
                        <Spacer mb={3} />
                        {planError && (
                          <>
                            <ErrorResult size="3">Please remove {planError} item(s) in your bag</ErrorResult>
                            <Spacer mt={2} />
                          </>
                        )}

                        {data?.me?.bag?.map((bagItem, index) => {
                          return (
                            <Box pb={1}>
                              <PaymentBagItem index={index} bagItem={bagItem} removeFromBag={removeFromBag} />
                            </Box>
                          )
                        })}
                      </Box>

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
                        <Spacer pb={10} />
                      </FAQWrapper>
                    </Box>
                  </Box>
                </RightColumn>
              </Row>
            </Grid>
            <FormFooter
              footerText={<>You can upgrade or change your plan at any time from your account settings.</>}
              buttonText="Checkout"
              isSubmitting={isProcessingPayment}
              disabled={!isValid || isProcessingPayment || planError}
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

const LeftColumn = styled(Col)`
  border-left: 1px solid ${colors.black15};
  border-right: 1px solid ${colors.black15};
  border-top: 1px solid ${colors.black15};

  ${media.md`
    border-top: 0px;
  `}
`

const RightColumn = styled(LeftColumn)`
  padding: 0 20px;

  ${media.md`
    border-left: 0px;
    border-top: 0px;
  `}
`

const Arrow = styled(BackArrowIcon)`
  position: absolute;
  left: 50px;
  top: 90px;
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
