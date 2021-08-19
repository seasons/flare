import { Box, Flex, Separator, Spacer } from "components"
import { Checkbox } from "components/Checkbox"
import { Collapse } from "components/Collapse"
import { FormFooter } from "components/Forms/FormFooter"
import { Col, Grid, Row } from "components/Grid"
import { BackArrowIcon } from "components/Icons"
import { GET_SIGNUP_USER } from "components/SignUp/queries"
import { Sans } from "components/Typography"
import { Formik } from "formik"
import { BagItemFragment } from "queries/bagItemQueries"
import { REMOVE_FROM_BAG } from "queries/bagQueries"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { media } from "styled-bootstrap-grid"
import styled from "styled-components"
import { colors } from "theme/colors"
import * as Yup from "yup"
import { MembershipCard } from "../../mobile/Account/MembershipInfo/Components/MembershipCard"
import { gql, useMutation, useQuery } from "@apollo/client"
import { InputLabel } from "@material-ui/core"
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { PaymentBagItem } from "./PaymentBagItem"
import { PaymentBillingAddress } from "./PaymentBillingAddress"
import { PaymentCouponField } from "./PaymentCouponField"
import { PaymentExpressButtons } from "./PaymentExpressButtons"
import { PaymentForm } from "./PaymentForm"
import { PaymentOrderSummary } from "./PaymentOrderSummary"
import { PaymentShippingAddress } from "./PaymentShippingAddress"
import { PlanButton } from "./PlanButton"
import { PlanFeatures } from "./PlanFeatures"

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
  initialCoupon: { id: string; type: "FixedAmount" | "Percentage"; amount: number; percentage: number }
}

const PaymentStep_Query = gql`
  query PaymentStep_Query($couponID: String) {
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
      estimate(couponID: $couponID)
      features
      caption
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
        detail {
          id
          shippingAddress {
            id
            city
            state
            zipCode
          }
        }
        user {
          id
          email
          firstName
          lastName
        }
        admissions {
          id
          admissable
          authorizationsCount
          authorizationWindowClosesAt
        }
        coupon {
          id
          amount
          percentage
          type
        }
      }
    }
  }
  ${BagItemFragment}
`
const enableExpressCheckout = process.env.ENABLE_EXPRESS_CHECKOUT == "true"
const showDiscoverBag = process.env.SHOW_DISCOVER_BAG_STEP === "true"

const SubmitPayment_Mutation = gql`
  mutation SubmitPayment(
    $paymentMethodID: String!
    $planID: String!
    $couponID: String
    $billing: JSON
    $shipping: JSON
  ) {
    processPayment(
      paymentMethodID: $paymentMethodID
      planID: $planID
      couponID: $couponID
      billing: $billing
      shipping: $shipping
    )
  }
`

const ConfirmPayment_Mutation = gql`
  mutation ConfirmPayment(
    $paymentIntentID: String!
    $planID: String!
    $couponID: String
    $billing: JSON
    $shipping: JSON
  ) {
    confirmPayment(
      paymentIntentID: $paymentIntentID
      planID: $planID
      couponID: $couponID
      billing: $billing
      shipping: $shipping
    )
  }
`

export const PaymentStep: React.FC<PaymentStepProps> = ({ onSuccess, onError, onBack, initialCoupon }) => {
  const elements = useElements()
  const stripe = useStripe()
  const [submitPayment] = useMutation(SubmitPayment_Mutation)
  const [confirmPayment] = useMutation(ConfirmPayment_Mutation, {
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
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const initialCouponWithCode = !!initialCoupon ? { ...initialCoupon, code: initialCoupon.id } : null
  const [coupon, setCoupon] = useState(initialCouponWithCode)
  const [plan, setPlan] = useState(null)
  const { previousData, data = previousData, loading, refetch } = useQuery(PaymentStep_Query, {
    fetchPolicy: "network-only",
    variables: {
      couponID: !!coupon ? coupon.code : null,
    },
  })
  const [planError, setPlanError] = useState(null)
  const [removeFromBag] = useMutation(REMOVE_FROM_BAG, {
    refetchQueries: [
      {
        query: PaymentStep_Query,
      },
    ],
    awaitRefetchQueries: true,
  })

  const features = plan?.features
  const validationSchema = sameAsShipping ? sameAsShippingValidation : shippingAndBillingValidation
  const sortedPlans = data?.paymentPlans?.slice()?.sort((a, b) => b.price - a.price)
  const lowestPlanPrice = sortedPlans?.map((plan) => plan.price)?.reduce((a, b) => Math.min(a, b))

  useEffect(() => {
    if (data && !loading) {
      if (sortedPlans && !plan) {
        setPlan(sortedPlans[0])
      }
      // If they came straight to checkout and therefore did not get
      // an initialCoupon, query it and update accordingly.
      const couponId = data?.me?.customer?.coupon?.id
      if (!!couponId && !coupon) {
        setCoupon({
          ...data?.me?.customer?.coupon,
          code: couponId,
        })
        refetch()
      }
    }
  }, [sortedPlans, loading, setPlan, plan])

  const valuesToAddressDetails = (values): { billingDetails: any; shippingDetails: any } => {
    const email = data?.me?.customer?.user?.email
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
      email,
    }
    let billingDetails
    if (sameAsShipping) {
      billingDetails = shippingDetails
    } else {
      billingDetails = {
        name: `${values.firstName} ${values.lastName}`,
        address: {
          line1: values.address1,
          line2: values.address2,
          city: values.city,
          state: values.state,
          postal_code: values.postalCode,
          country: "US",
        },
        email,
      }
    }
    return {
      billingDetails,
      shippingDetails: {
        ...shippingDetails,
        firstName: values.shippingFirstName,
        lastName: values.shippingLastName,
      },
    }
  }

  const handleSubmit = async (values) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const cardElement = elements.getElement(CardNumberElement)
    const { billingDetails, shippingDetails } = valuesToAddressDetails(values)

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
      processPayment(payload.paymentMethod, values, billingDetails, shippingDetails)
    }
  }

  const processPayment = async (paymentMethod, values, billingDetails, shippingDetails) => {
    if (isProcessingPayment) {
      return
    }
    setIsProcessingPayment(true)
    const billing = {
      ...billingDetails,
      user: {
        firstName: sameAsShipping ? values.shippingFirstName : values.firstName,
        lastName: sameAsShipping ? values.shippingLastName : values.lastName,
        email: billingDetails.email,
      },
    }

    const response = await submitPayment({
      variables: {
        paymentMethodID: paymentMethod.id,
        planID: plan?.planID,
        billing,
      },
    })

    const paymentIntent = response.data.processPayment
    await stripe.handleCardAction(paymentIntent.client_secret)

    await confirmPayment({
      variables: {
        paymentIntentID: paymentIntent.id,
        planID: plan?.planID,
        couponID: !!coupon ? coupon.code : null,
        shipping: shippingDetails,
        billing,
      },
    })
  }

  const user = data?.me?.customer?.user
  const customerFirstName = user?.firstName
  const customerLastName = user?.lastName

  return (
    <Box width="100%" height="100%" style={{ overflowY: "scroll" }}>
      <Formik onSubmit={handleSubmit} initialValues={{}} validationSchema={validationSchema}>
        {({ handleSubmit, isValid, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid>
              <Row>
                <LeftColumn md={8}>
                  {showDiscoverBag && (
                    <TouchableOpacity
                      onPress={() => {
                        onBack?.()
                      }}
                    >
                      <Arrow color={colors.black100} />
                    </TouchableOpacity>
                  )}
                  <Box px={[2, 2, 5, 5, 5]} pb={2} mt={[4, 4, 12]}>
                    <Sans size="8" weight="medium">
                      You're in! Choose your plan
                    </Sans>
                    <Spacer mt={3} />
                    <PlanFeatures features={features} />
                    <Spacer mt={2} />
                    {sortedPlans?.map((p) => {
                      return (
                        <PlanButton
                          key={p.id}
                          lowestPlanPrice={lowestPlanPrice}
                          plan={p}
                          shouldSelect={(selectedPlan) => setPlan(selectedPlan)}
                          selected={plan?.id === p.id}
                        />
                      )
                    })}
                  </Box>
                  <Box my={2}>
                    <Separator />
                  </Box>
                  <Box>
                    <Box p={[2, 2, 6]} pt={0}>
                      {enableExpressCheckout && (
                        <Box py={4}>
                          <Sans size="7">Express checkout</Sans>
                          <PaymentExpressButtons
                            plan={data?.paymentPlan}
                            onPaymentMethodReceived={(paymentMethod) => {
                              const { billingDetails, shippingDetails } = valuesToAddressDetails(values)
                              processPayment(paymentMethod, values, billingDetails, shippingDetails)
                            }}
                          />
                        </Box>
                      )}
                      <Box width="100%" py={[2, 2, 4]}>
                        <Sans size="7">Shipping address</Sans>
                        <Spacer mt={2} />
                        <PaymentShippingAddress />
                      </Box>
                      <Box width="100%" py={[2, 2, 4]}>
                        <Sans size="7">Billing address</Sans>
                        <Spacer mt={2} />
                        <Flex flexDirection="row" alignItems="center" width="100%" maxWidth="600px">
                          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" width="50%">
                            <Label>Same as shipping address</Label>
                            <Box pr={2}>
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
                      <Spacer mt={4} />
                    </Box>
                  </Box>
                </LeftColumn>
                <RightColumn md={4}>
                  <Box style={{ height: "100%", minHeight: "100vh" }}>
                    <Box px={[0, 0, 2, 2]} mt={[4, 4, 12]}>
                      {data?.me?.bag.length > 0 && (
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
                      )}
                      <Box>
                        <Sans size="8">Order summary</Sans>
                        <Spacer mb={5} />
                        <MembershipCard memberName={`${customerFirstName} ${customerLastName}`} />
                        <Box pt={4} pb={3}>
                          <PaymentOrderSummary plan={plan} coupon={coupon} />
                        </Box>
                        <PaymentCouponField
                          onApplyPromoCode={(amount, percentage, type, code) => {
                            setCoupon({
                              amount: amount as number,
                              percentage: percentage as number,
                              type: type as "FixedAmount" | "Percentage",
                              code: code as string,
                              id: code,
                            })
                          }}
                        />
                      </Box>
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

const sameAsShippingValidation = Yup.object().shape({
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

const shippingAndBillingValidation = Yup.object().shape({
  firstName: Yup.string().trim().required("Required"),
  lastName: Yup.string().trim().required("Required"),
  address1: Yup.string().trim().required("Required"),
  city: Yup.string().trim().required("Required"),
  state: Yup.string().trim().required("Required"),
  postalCode: Yup.string()
    .trim()
    .required("Required")
    .matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
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
  top: 70px;

  ${media.xs`
    left: 16px;
    top: 30px;
  `}
`

const FAQWrapper = styled(Box)`
  width: 100%;
  height: 100%;
`

const ErrorResult = styled((props) => <Sans {...props} />)`
  color: red;
`

const Label = styled(InputLabel)`
  margin: 10px 0 5px 0;
`
