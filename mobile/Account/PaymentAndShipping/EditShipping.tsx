import { Box, Button, Container, FixedBackArrow, Flex, Sans, Spacer, TextInput } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import gql from "graphql-tag"
import { space } from "helpers/space"
import React, { useState } from "react"
import { FlatList, KeyboardAvoidingView } from "react-native"
import styled from "styled-components"
import { screenTrack, identify } from "utils/analytics"
import { useMutation, useQuery } from "@apollo/client"
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

const UPDATE_PAYMENT_AND_SHIPPING = gql`
  mutation updateShippingAddress(
    $city: String!
    $zipCode: String!
    $state: String!
    $address1: String!
    $address2: String
    $phoneNumber: String!
  ) {
    addCustomerDetails(
      details: {
        shippingAddress: {
          create: { city: $city, zipCode: $zipCode, state: $state, address1: $address1, address2: $address2 }
        }
        phoneNumber: $phoneNumber
      }
    ) {
      id
    }
  }
`

const SHIPPING_ADDRESS = "Shipping address"
const PHONE_NUMBER = "Phone number"

export const EditShipping: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ navigation, route }) => {
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { previousData, data = previousData } = useQuery(GET_CURRENT_PLAN)
  const currentPhoneNumber = route?.params?.phoneNumber
  const currentShippingAddress = route?.params?.shippingAddress
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber)

  const [isMutating, setIsMutating] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    address1: currentShippingAddress?.address1 || "",
    address2: currentShippingAddress?.address2 || "",
    city: currentShippingAddress?.city || "",
    state: currentShippingAddress?.state || "",
    zipCode: currentShippingAddress?.zipCode || "",
  })
  const { openDrawer } = useDrawerContext()

  const [updatePaymentAndShipping] = useMutation(UPDATE_PAYMENT_AND_SHIPPING, {
    onError: (error) => {
      let popUpData = {
        buttonText: "Got it",
        note: "Make sure your shipping address and phone number are valid.",
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

  const handleSaveBtnPressed = async () => {
    setIsMutating(true)
    const result = await updatePaymentAndShipping({
      variables: {
        city: shippingCity,
        zipCode: shippingZipCode,
        state: shippingState,
        address1: shippingAddress1,
        address2: shippingAddress2,
        phoneNumber,
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

  const sections = [SHIPPING_ADDRESS, PHONE_NUMBER]

  const renderItem = ({ item: section }) => {
    switch (section) {
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
      default:
        return null
    }
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
                <Sans size="6">Edit Shipping</Sans>
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
    </>
  )
})

const FixedKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  position: absolute;
  left: ${space(2)};
`
