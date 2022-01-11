import { Box, FixedBackArrow, Separator } from "components"
import { FormFooter } from "components/Forms/FormFooter"
import { Col, Grid, Row } from "components/Grid"
import { BackArrowIcon } from "components/Icons"
import { GET_SIGNUP_USER } from "components/SignUp/queries"
import { Formik } from "formik"
import { Loader } from "mobile/Loader"
import { BagItemFragment } from "queries/bagItemQueries"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { media } from "styled-bootstrap-grid"
import styled from "styled-components"
import { colors } from "theme/colors"
import * as Yup from "yup"

import { gql, useMutation, useQuery } from "@apollo/client"
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { PaymentStepCheckoutSection } from "./PaymentStepComponents/PaymentStepCheckoutSection"
import { PaymentStepOrderSummarySection } from "./PaymentStepComponents/PaymentStepOrderSummarySection"
import { PaymentStepPlanSelection } from "./PaymentStepComponents/PaymentStepPlanSelection"

interface PaymentStepProps {
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
      features {
        included
        excluded
      }
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
const showDiscoverBag = process.env.SHOW_DISCOVER_BAG_STEP === "true"

export const SubmitPayment_Mutation = gql`
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

export const ConfirmPayment_Mutation = gql`
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
    onCompleted: (data) => {
      const selectedPlan = data?.paymentsPlans?.find((p) => p.id === plan?.id)
      setPlan(selectedPlan)
    },
  })

  const features = plan?.features
  const validationSchema = sameAsShipping ? sameAsShippingValidation : shippingAndBillingValidation
  const sortedPlans = data?.paymentPlans?.slice()?.sort((a, b) => b.price - a.price)

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

  const customer = data?.me?.customer
  const user = customer?.user
  const customerShippingAddress = customer?.detail?.shippingAddress

  const initialValues = {
    shippingFirstName: user?.firstName,
    shippingLastName: user?.lastName,
    shippingState: customerShippingAddress?.state,
    shippingCity: customerShippingAddress?.city,
    shippingPostalCode: customerShippingAddress?.zipCode,
  }

  if (!data) {
    // Wait for data, otherwise initial values wont register
    return <Loader />
  }

  return (
    <Box width="100%" height="100%">
      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {({ handleSubmit, isValid, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid>
              <Row>
                <LeftColumn md={6} mdOffset={1}>
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
                    <PaymentStepPlanSelection
                      plans={sortedPlans}
                      features={features}
                      selectedPlan={plan}
                      setPlan={setPlan}
                    />
                  </Box>
                  <Box my={2}>
                    <Separator />
                  </Box>
                  <PaymentStepCheckoutSection
                    values={values}
                    errorMessage={errorMessage}
                    valuesToAddressDetails={valuesToAddressDetails}
                    processPayment={processPayment}
                    sameAsShipping={sameAsShipping}
                    setSameAsShipping={setSameAsShipping}
                    selectedPlan={plan}
                  />
                </LeftColumn>
                <RightColumn md={5}>
                  <Box style={{ height: "100%", minHeight: "100vh", maxWidth: "345px" }}>
                    <Box px={[0, 0, 2, 2]} mt={[4, 4, 12]}>
                      <PaymentStepOrderSummarySection
                        onCouponUpdate={(coupon) => {
                          setCoupon(coupon)
                          refetch()
                        }}
                        selectedPlan={plan}
                        user={user}
                        coupon={coupon}
                      />
                    </Box>
                  </Box>
                </RightColumn>
              </Row>
            </Grid>
            <FormFooter
              footerText={<>As a reminder, membership auto-renews every month or year unless canceled.</>}
              buttonText="Sign up"
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
