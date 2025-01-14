import { Box, Button, CloseButton, Container, Flex, Sans, Spacer } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { TextInput } from "components/TextInput"
import gql from "graphql-tag"
import { isWholeNumber } from "helpers/validation"
import React, { useState } from "react"
import { FlatList } from "react-native"

import { useMutation } from "@apollo/client"

import { StatePickerPopUp } from "./StatePickerPopup"

const UPDATE_ADDRESS = gql`
  mutation updateShippingAddress(
    $name: String!
    $city: String!
    $zipCode: String!
    $state: String!
    $address1: String!
    $address2: String
  ) {
    addCustomerDetails(
      details: {
        shippingAddress: {
          create: {
            name: $name
            city: $city
            zipCode: $zipCode
            state: $state
            address1: $address1
            address2: $address2
          }
        }
      }
    ) {
      id
    }
  }
`

export interface ShippingAddress {
  name: string
  address1: string
  address2: string
  zipCode: string
  city: string
  state: string
}

interface Params {
  title: string
  subtitle: string
  onNext: () => void
  shippingAddress: ShippingAddress
}

enum Row {
  Name,
  Address1,
  Address2_ZipCode,
  City_State,
}

export const EditShippingAddress: React.FC<Params> = ({ onNext, shippingAddress, title, subtitle }) => {
  const [name, setName] = useState((shippingAddress?.name as string) || "")
  const [address1, setAddress1] = useState((shippingAddress?.address1 as string) || "")
  const [address2, setAddress2] = useState((shippingAddress?.address2 as string) || "")
  const [zipCode, setZipCode] = useState((shippingAddress?.zipCode as string) || "")
  const [city, setCity] = useState((shippingAddress?.city as string) || "")
  const [state, setState] = useState((shippingAddress?.state as string) || "")

  const [isStatePickerVisible, setIsStatePickerVisible] = useState(false)

  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [updateAddress] = useMutation(UPDATE_ADDRESS, {
    onCompleted: () => {
      setIsMutating(false)
      onNext()
    },
    onError: (err) => {
      console.log("Error EditShippingAddress.tsx", err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "Double check that your address is valid and try again.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const handleUpdateAddress = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)

    await updateAddress({
      variables: {
        name,
        city,
        zipCode,
        state,
        address1,
        address2,
      },
    })
  }

  const renderItem = (row: Row) => {
    switch (row) {
      case Row.Name:
        return (
          <TextInput
            autoCapitalize="words"
            currentValue={name}
            headerText="Name"
            onChangeText={(_, val) => setName(val)}
          />
        )
      case Row.Address1:
        return (
          <TextInput
            autoCapitalize="words"
            currentValue={address1}
            headerText="Address 1"
            onChangeText={(_, val) => setAddress1(val)}
          />
        )
      case Row.Address2_ZipCode:
        return (
          <Flex flexDirection="row">
            <TextInput
              autoCapitalize="words"
              currentValue={address2}
              headerText="Address 2"
              onChangeText={(_, val) => setAddress2(val)}
              style={{ flex: 1 }}
            />
            <Spacer width={9} />
            <TextInput
              currentValue={zipCode}
              headerText="ZIP"
              onChangeText={(_, val) => setZipCode(val)}
              style={{ flex: 1 }}
            />
          </Flex>
        )
      case Row.City_State:
        return (
          <Flex flexDirection="row">
            <TextInput
              autoCapitalize="words"
              currentValue={city}
              headerText="City"
              onChangeText={(_, val) => setCity(val)}
              style={{ flex: 1 }}
            />
            <Spacer width={9} />
            <TextInput
              currentValue={state}
              headerText="State"
              onPress={() => {
                setIsStatePickerVisible(true)
              }}
              style={{ flex: 1 }}
            />
          </Flex>
        )
    }
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <CloseButton variant="light" />
      <FlatList
        data={[Row.Name, Row.Address1, Row.Address2_ZipCode, Row.City_State]}
        ItemSeparatorComponent={() => <Spacer mb={4} />}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => item + String(index)}
        ListHeaderComponent={() => (
          <Box mt={5}>
            <Spacer mb={10} />
            <Sans size="5">{title}</Sans>
            <Sans size="3" color="black50">
              {subtitle}
            </Sans>
            <Spacer mb={4} />
          </Box>
        )}
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16, overflow: "visible", flex: 1 }}
      />
      <Flex p={2} flexDirection="row">
        <Button
          block
          disabled={
            !name.trim() ||
            !address1.trim() ||
            !isWholeNumber(zipCode) ||
            zipCode.length !== 5 ||
            !city.trim() ||
            !state
          }
          loading={isMutating}
          onClick={handleUpdateAddress}
          variant="primaryBlack"
        >
          Continue
        </Button>
      </Flex>

      <StatePickerPopUp
        initialState={state}
        onRequestClose={(state) => {
          setState(state)
          setIsStatePickerVisible(false)
        }}
        visible={isStatePickerVisible}
      />
    </Container>
  )
}
