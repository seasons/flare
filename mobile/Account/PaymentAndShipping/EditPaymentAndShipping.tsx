import { Box, Button, Container, FixedBackArrow, Flex, Sans, Spacer, TextInput } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import gql from "graphql-tag"
import { space } from "helpers/space"
import React, { useState } from "react"
import { FlatList, KeyboardAvoidingView } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking, identify } from "utils/analytics"

import { useMutation, useQuery } from "@apollo/client"
import { Radio } from "@material-ui/core"

import { GET_PAYMENT_DATA } from "./PaymentAndShipping"

export const GET_CURRENT_PLAN = gql`
  query GetCurrentPlan {
    me {
      customer {
        id
        user {
          id
        }
        paymentPlan {
          id
          planID
          price
          name
        }
      }
    }
  }
`

export const PAYMENT_UPDATE = gql`
  mutation applePayUpdatePaymentMethod($planID: String!, $token: StripeToken!, $tokenType: String) {
    applePayUpdatePaymentMethod(planID: $planID, token: $token, tokenType: $tokenType)
  }
`

const UPDATE_PAYMENT_AND_SHIPPING = gql`
  mutation updatePaymentAndShipping(
    $billingAddress: AddressInput!
    $shippingAddress: AddressInput!
    $phoneNumber: String!
  ) {
    updatePaymentAndShipping(
      billingAddress: $billingAddress
      shippingAddress: $shippingAddress
      phoneNumber: $phoneNumber
    )
  }
`

const BILLING_ADDRESS = "Billing address"
const EDIT_BILLING_INFO = "Edit billing info"
const PHONE_NUMBER = "Phone number"
const SHIPPING_ADDRESS = "Shipping address"

export const EditPaymentAndShipping: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ navigation, route }) => {
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { previousData, data = previousData } = useQuery(GET_CURRENT_PLAN)
  const [openPaymentPopUp, setOpenPaymentPopUp] = useState(false)
  const billingInfo = route?.params?.billingInfo
  const currentShippingAddress = route?.params?.shippingAddress
  const currentPhoneNumber = route?.params?.phoneNumber

  const [isMutating, setIsMutating] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    address1: currentShippingAddress?.address1 || "",
    address2: currentShippingAddress?.address2 || "",
    city: currentShippingAddress?.city || "",
    state: currentShippingAddress?.state || "",
    zipCode: currentShippingAddress?.zipCode || "",
  })
  const [billingAddress, setBillingAddress] = useState({
    address1: billingInfo?.street1 || "",
    address2: billingInfo?.street2 || "",
    city: billingInfo?.city || "",
    state: billingInfo?.state || "",
    zipCode: billingInfo?.postal_code || "",
  })
  const [sameAsDeliveryRadioSelected, setSameAsDeliveryRadioSelected] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber)
  const { openDrawer } = useDrawerContext()

  const [applePayUpdatePayment] = useMutation(PAYMENT_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
      setOpenPaymentPopUp(false)
    },
    refetchQueries: [
      {
        query: GET_PAYMENT_DATA,
      },
    ],
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)

      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue updating your payment method. Please retry or contact us.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const [updatePaymentAndShipping] = useMutation(UPDATE_PAYMENT_AND_SHIPPING, {
    onError: (error) => {
      let popUpData = {
        buttonText: "Got it",
        note: "Make sure your shipping and billing address are valid.",
        title: "Something went wrong!",
        onClose: () => hidePopUp(),
      }

      showPopUp(popUpData)
      console.log("Error EditView.tsx: ", error)
    },
    onCompleted: () => {
      identify(data?.me?.customer?.user?.id, { state: shippingAddress.state })
    },
  })

  const {
    address1: shippingAddress1,
    address2: shippingAddress2,
    city: shippingCity,
    state: shippingState,
    zipCode: shippingZipCode,
  } = shippingAddress

  const {
    address1: billingAddress1,
    address2: billingAddress2,
    city: billingCity,
    state: billingState,
    zipCode: billingZipCode,
  } = billingAddress

  const paymentPlan = data?.me?.customer?.paymentPlan

  const handleSameAsDeliveryAddress = () => {
    if (sameAsDeliveryRadioSelected) {
      setBillingAddress({
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      })
    } else {
      setBillingAddress({
        address1: shippingAddress1,
        address2: shippingAddress2,
        city: shippingCity,
        state: shippingState,
        zipCode: shippingZipCode,
      })
    }
    setSameAsDeliveryRadioSelected(!sameAsDeliveryRadioSelected)
  }

  const handleSaveBtnPressed = async () => {
    setIsMutating(true)
    const result = await updatePaymentAndShipping({
      variables: {
        billingAddress: {
          city: billingCity,
          postalCode: billingZipCode,
          state: billingState,
          street1: billingAddress1,
          street2: billingAddress2,
        },
        phoneNumber,
        shippingAddress: {
          city: shippingCity,
          postalCode: shippingZipCode,
          state: shippingState,
          street1: shippingAddress1,
          street2: shippingAddress2,
        },
      },
      refetchQueries: [
        {
          query: GET_PAYMENT_DATA,
        },
      ],
    })
    setIsMutating(false)
    if (result) {
      goBack()
    }
  }

  const onApplePay = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    // tracking.trackEvent({
    //   actionName: TrackSchema.ActionNames.ApplePayTapped,
    //   actionType: TrackSchema.ActionTypes.Tap,
    // })
    // const applePaySupportedOnDevice = await stripe.deviceSupportsApplePay()
    // if (applePaySupportedOnDevice) {
    //   const canMakeApplePayment = await stripe.canMakeApplePayPayments()
    //   if (canMakeApplePayment) {
    //     // Customer has a payment card set up
    //     try {
    //       const token = await stripe.paymentRequestWithNativePay(
    //         {
    //           requiredBillingAddressFields: ["all"],
    //         },
    //         [
    //           {
    //             label: `${paymentPlan.name} plan`,
    //             amount: `${paymentPlan.price / 100}.00`,
    //           },
    //         ]
    //       )
    //       applePayUpdatePayment({
    //         variables: {
    //           planID: paymentPlan.planID,
    //           token,
    //           tokenType: "apple_pay",
    //         },
    //         awaitRefetchQueries: true,
    //       })
    //       // You should complete the operation by calling
    //       stripe.completeApplePayRequest()
    //     } catch (error) {
    //       console.log("error", error)
    //       stripe.cancelApplePayRequest()
    //       setIsMutating(false)
    //     }
    //   } else {
    //     // Customer hasn't set up apple pay on this device so we request payment setup
    //     stripe.openApplePaySetup()
    //     setIsMutating(false)
    //   }
    // }
  }

  const sections = [SHIPPING_ADDRESS, BILLING_ADDRESS, PHONE_NUMBER]

  const renderItem = ({ item: section }) => {
    switch (section) {
      case SHIPPING_ADDRESS:
        return (
          <>
            <Sans size="4">{SHIPPING_ADDRESS}</Sans>
            <Spacer mb={2} />
            <TextInput
              currentValue={shippingAddress1}
              placeholder="Address 1"
              onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, address1: text })}
            />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
              <TextInput
                currentValue={shippingAddress2}
                placeholder="Address 2"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, address2: text })}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={shippingZipCode}
                placeholder="Zipcode"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, zipCode: text })}
              />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput
                currentValue={shippingCity}
                placeholder="City"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => {
                  setShippingAddress({ ...shippingAddress, city: text })
                }}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={shippingState}
                placeholder="State"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => {
                  setShippingAddress({ ...shippingAddress, state: text })
                }}
              />
            </Flex>
          </>
        )
      case BILLING_ADDRESS:
        return (
          <>
            <Flex alignItems="center">
              <Sans size="4">Same as my shipping adress</Sans>
              <Radio checked={sameAsDeliveryRadioSelected} onClick={handleSameAsDeliveryAddress} />
            </Flex>
            <Spacer mb={2} />
            <Sans size="4">{BILLING_ADDRESS}</Sans>
            <Spacer mb={2} />
            <TextInput
              currentValue={billingAddress1}
              placeholder="Address 1"
              onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, address1: text })}
            />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput
                currentValue={billingAddress2}
                placeholder="Address 2"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, address2: text })}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={billingZipCode}
                placeholder="Zipcode"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, zipCode: text })}
              />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput
                currentValue={billingCity}
                placeholder="City"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, city: text })}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={billingState}
                placeholder="State"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, state: text })}
              />
            </Flex>
          </>
        )
      case PHONE_NUMBER:
        return (
          <>
            <Sans size="4">{PHONE_NUMBER}</Sans>
            <Spacer mb={2} />
            <TextInput
              currentValue={phoneNumber}
              placeholder="Phone number"
              onChangeText={(inputKey, text) => setPhoneNumber(text)}
            />
          </>
        )
      case EDIT_BILLING_INFO:
        return (
          <Flex flexDirection="row" justifyContent="space-between">
            {paymentPlan && (
              <Button variant="primaryWhite" size="large" width="100%" onPress={() => setOpenPaymentPopUp(true)}>
                Edit payment method
              </Button>
            )}
          </Flex>
        )
      default:
        return null
    }
  }

  const onAddCreditCard = () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.AddCreditCardTapped,
      actionType: Schema.ActionTypes.Tap,
    })
  }

  const goBack = () => {
    openDrawer("paymentAndShipping")
  }

  return (
    <>
      <Container insetsBottom={false}>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" onPress={goBack} />
        <Box px={2}>
          <FlatList
            data={sections}
            ListHeaderComponent={() => (
              <Box pt={4}>
                <Spacer mb={80} />
                <Sans size="6">Edit Payment & Shipping</Sans>
                <Spacer mb={4} />
              </Box>
            )}
            ItemSeparatorComponent={() => <Spacer mb={6} />}
            keyExtractor={(item, index) => item + String(index)}
            renderItem={renderItem}
            ListFooterComponent={() => <Spacer mb={2} />}
            showsVerticalScrollIndicator={false}
          />
        </Box>
        <FixedKeyboardAvoidingView behavior="padding" keyboardVerticalOffset={space(2)}>
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" p={2}>
            <Button variant="primaryWhite" size="large" block style={{ flex: 1 }} onClick={goBack}>
              Cancel
            </Button>
            <Spacer ml={1} />
            <Button
              loading={isMutating}
              variant="secondaryOutline"
              size="large"
              onClick={handleSaveBtnPressed}
              style={{ flex: 1 }}
            >
              Save
            </Button>
          </Flex>
        </FixedKeyboardAvoidingView>
      </Container>

      {/* <EditPaymentPopUp
        planID={paymentPlan?.planID}
        billingAddress={billingAddress}
        setOpenPopUp={setOpenPaymentPopUp}
        openPopUp={openPaymentPopUp}
        onApplePay={onApplePay}
        onAddCreditCard={onAddCreditCard}
      /> */}
    </>
  )
})

const FixedKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  position: absolute;
  left: ${space(2)};
`
