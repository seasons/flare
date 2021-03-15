import { Box, Button, Container, FixedBackArrow, Sans, Separator, Spacer, Flex } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import gql from "graphql-tag"
import { color } from "helpers/color"
import { Loader } from "mobile/Loader"
import React, { useEffect } from "react"
import { FlatList } from "react-native"
import { screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"

export const GET_PAYMENT_DATA = gql`
  query GetUserPaymentData {
    me {
      customer {
        id
        detail {
          id
          phoneNumber
          shippingAddress {
            id
            name
            company
            address1
            address2
            city
            state
            zipCode
          }
        }
        billingInfo {
          id
          brand
          city
          expiration_month
          expiration_year
          last_digits
          name
          postal_code
          state
          street1
          street2
        }
      }
      activeReservation {
        id
        customer {
          id
          billingInfo {
            id
            last_digits
            street1
            street2
            city
            state
            postal_code
          }
        }
      }
    }
  }
`

export const createShippingAddress = (shippingAddress) => {
  const addressArray = []
  if (shippingAddress.address1) {
    addressArray.push(shippingAddress.address1)
  }
  if (shippingAddress.address2) {
    addressArray.push(shippingAddress.address2)
  }
  if (shippingAddress.city && shippingAddress.state && shippingAddress.zipCode) {
    addressArray.push(`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}`)
  }
  return addressArray
}

export const createBillingAddress = (billingInfo) => {
  const addressArray = []
  if (billingInfo.street1) {
    addressArray.push(billingInfo.street1)
  }
  if (billingInfo.street2) {
    addressArray.push(billingInfo.street2)
  }
  if (billingInfo.city && billingInfo.state && billingInfo.postal_code) {
    addressArray.push(`${billingInfo.city}, ${billingInfo.state}, ${billingInfo.postal_code}`)
  }
  return addressArray
}

const AccountSection: React.FC<{ title: string; value: string | [string]; onClick: () => void }> = ({
  title,
  value,
  onClick,
}) => {
  return (
    <Box key={title} px={2}>
      <Flex justifyContent="space-between">
        <Sans size="4">{title}</Sans>
        <Sans size="4" style={{ textDecoration: "underline" }} onClick={onClick}>
          Edit
        </Sans>
      </Flex>
      <Box mb={1} />
      <Separator color={color("black10")} />
      <Box mb={1} />
      {Array.isArray(value) ? (
        value.map((text) => (
          <Sans key={text} size="3" color="black50">
            {text}
          </Sans>
        ))
      ) : (
        <Sans size="3" color="black50">
          {value}
        </Sans>
      )}
      <Spacer mb={4} />
    </Box>
  )
}

export const PaymentAndShipping = screenTrack()(({ navigation }) => {
  const { error, previousData, data = previousData, startPolling, stopPolling } = useQuery(GET_PAYMENT_DATA)
  const { openDrawer } = useDrawerContext()

  useEffect(() => {
    // The Chargebee address update takes multiple seconds to update
    // therefore we must check and refetch data if the user leaves this view
    const unsubscribe = navigation?.addListener("focus", () => {
      if (data) {
        startPolling(1500)
        setTimeout(stopPolling, 20000)
      }
    })

    return unsubscribe
  }, [navigation])

  if (!data || error) {
    if (error) console.error("error PaymentAndShipping.tsx: ", error)
    return (
      <>
        <FixedBackArrow
          navigation={navigation}
          variant="whiteBackground"
          onPress={() => {
            openDrawer("profile")
          }}
        />
        <Loader />
      </>
    )
  }

  const sections = []
  let shippingAddress = null
  let billingInfo = null
  let phoneNumber = null
  const customer = data?.me?.customer

  const openEditAddressesAndPhoneNumber = () => {
    openDrawer("editPaymentAndShipping", {
      billingInfo: customer?.billingInfo,
      shippingAddress: customer?.detail?.shippingAddress,
      phoneNumber: customer?.detail?.phoneNumber,
    })
  }

  if (customer) {
    const details = customer.detail
    if (details?.shippingAddress) {
      shippingAddress = details.shippingAddress
      sections.push({
        title: "Shipping address",
        value: createShippingAddress(details.shippingAddress),
        onClick: openEditAddressesAndPhoneNumber,
      })
    }

    if (customer?.billingInfo) {
      billingInfo = customer.billingInfo
      sections.push({
        title: "Billing address",
        value: createBillingAddress(customer.billingInfo),
        onClick: openEditAddressesAndPhoneNumber,
      })

      sections.push({
        title: "Payment info",
        value: `${customer.billingInfo.brand.toUpperCase()} ${customer.billingInfo.last_digits}`,
        onClick: () => openDrawer("editPaymentMethod"),
      })
    }

    if (details?.phoneNumber) {
      phoneNumber = details?.phoneNumber
      sections.push({ title: "Phone number", value: details.phoneNumber, onClick: openEditAddressesAndPhoneNumber })
    }
  }

  const renderItem = (item) => {
    return <AccountSection title={item.title} value={item.value} onClick={item.onClick} />
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow
        navigation={navigation}
        variant="whiteBackground"
        onPress={() => {
          openDrawer("profile")
        }}
      />
      <FlatList
        data={sections}
        ListHeaderComponent={() => (
          <Box px={2} pt={4}>
            <Spacer mb={80} />
            <Sans size="6">Payment & Shipping</Sans>
            <Spacer mb={4} />
          </Box>
        )}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => renderItem(item)}
      />
    </Container>
  )
})
