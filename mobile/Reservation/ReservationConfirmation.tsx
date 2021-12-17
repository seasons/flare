import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { CheckWithBackground } from "components/SVGs"
import gql from "graphql-tag"
import { ProductPriceText_Product } from "@seasons/eclipse"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import React from "react"
import { DateTime } from "luxon"

import { ScrollView } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"
import { useQuery } from "@apollo/client"
import { ReservationItem } from "./Components/ReservationItem"
import { ReservationLineItems } from "./ReservationLineItems"

const GET_CUSTOMER_RESERVATION_CONFIRMATION = gql`
  query GetCustomerReservationConfirmation($reservationID: ID!) {
    me {
      user {
        id
        firstName
        lastName
        email
      }
      customer {
        id
        detail {
          id
          phoneNumber
          shippingAddress {
            id
            slug
            name
            address1
            address2
            city
            state
            zipCode
          }
        }
        reservations(where: { id: $reservationID }) {
          id
          reservationNumber
          pickupDate
          pickupWindow {
            display
          }
          shippingMethod {
            id
            displayText
            code
          }
          lineItems {
            id
            name
            price
            taxPrice
          }
          reservationPhysicalProducts {
            id
            physicalProduct {
              id
              productVariant {
                id
                product {
                  id
                  name
                  modelSize {
                    id
                    display
                  }
                  brand {
                    id
                    name
                  }
                  images {
                    id
                    url
                  }
                  variants {
                    id
                    displayShort
                    displayLong
                  }
                  ...ProductPriceText_Product
                }
              }
            }
          }
        }
      }
    }
  }
  ${ProductPriceText_Product}
`

export const ReservationConfirmation = screenTrack()((props) => {
  const tracking = useTracking()
  const { openDrawer } = useDrawerContext()
  const reservationID = props?.route?.params?.reservationID
  const { previousData, data = previousData, error } = useQuery(GET_CUSTOMER_RESERVATION_CONFIRMATION, {
    variables: {
      reservationID,
    },
  })
  if (error) {
    console.log("error reservationConfirmation:", error)
  }

  if (!data) {
    return <Loader />
  }

  const customer = data?.me?.customer
  const address = customer?.detail?.shippingAddress
  const reservation = customer?.reservations?.[0]
  const productVariants = reservation?.reservationPhysicalProducts.map((rpp) => rpp.physicalProduct.productVariant)

  const lineItems = reservation?.lineItems

  const SectionHeader = ({ title, content = null, bottomSpacing = 1, hideSeparator = false }) => {
    return (
      <>
        <Flex flexDirection="row" width="100%">
          <Sans size="4" color="black100">
            {title}
          </Sans>
          {content && (
            <Flex ml="auto" flexDirection="column">
              {content}
            </Flex>
          )}
        </Flex>
        <Spacer mb={bottomSpacing} />
        {!hideSeparator && <Separator />}
      </>
    )
  }

  const formatedAddress1 =
    !!address?.address1 && `${address?.address1}${address?.address2 ? " " + address?.address2 : ""},`
  const formatedAddress2 = !!address?.city && `${address?.city}, ${address?.state} ${address?.zipCode}`
  const shippingOption = reservation?.shippingOption
  const shippingDisplayText = shippingOption?.shippingMethod?.displayText

  const isPickup = reservation?.shippingMethod?.code === "Pickup"
  const timeWindowText = reservation?.pickupWindow?.display
  const pickupDateText = reservation?.pickupDate && DateTime.fromISO(reservation?.pickupDate).toFormat("cccc, MMMM dd")

  return (
    <Container>
      <Flex px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={52} />
          <CheckWithBackground />
          <Box my={4}>
            <Sans size="4" color="black100">
              We've got your order!
            </Sans>
            <Sans size="4" color="black50">
              We've emailed you a confirmation and we'll notify you when its out for delivery.
            </Sans>
          </Box>
          {lineItems?.length > 0 && (
            <>
              <Spacer pb={2} />
              <ReservationLineItems lineItems={lineItems} />
              <Spacer mb={2} />
            </>
          )}
          <Box>
            <SectionHeader
              title="Order number"
              content={
                <>
                  {!!reservation.reservationNumber && (
                    <Sans size="4" color="black100" textAlign="right" ml="auto">
                      {reservation.reservationNumber}
                    </Sans>
                  )}
                </>
              }
            />
          </Box>
          <Box pt={1}>
            <SectionHeader
              title="Shipping"
              content={
                <Box>
                  {!!formatedAddress1 && (
                    <Sans size="4" color="black100" textAlign="right">
                      {formatedAddress1}
                    </Sans>
                  )}
                  {!!formatedAddress2 && (
                    <Sans size="4" color="black100" textAlign="right">
                      {formatedAddress2}
                    </Sans>
                  )}
                </Box>
              }
              bottomSpacing={3}
            />
          </Box>
          <Box pt={1}>
            <SectionHeader
              title={isPickup ? "In-Office Pickup" : "Delivery"}
              content={
                <>
                  {!!shippingDisplayText && !isPickup && (
                    <Sans size="4" color="black100" ml="auto" textAlign="right">
                      {shippingDisplayText}
                    </Sans>
                  )}
                  {!!pickupDateText && (
                    <Sans size="4" color="black100" ml="auto" mt={1} textAlign="right">
                      {pickupDateText}
                    </Sans>
                  )}
                  {!!timeWindowText && (
                    <Sans size="4" color="black100" textAlign="right">
                      {timeWindowText}
                    </Sans>
                  )}
                </>
              }
              hideSeparator
              bottomSpacing={4}
            />
          </Box>
          <Box mb={5}>
            <SectionHeader title="Items" />
            <Box mt={1} mb={4}>
              {productVariants?.map((productVariant, i) => {
                return (
                  <Box key={productVariant.id}>
                    <ReservationItem index={i} productVariant={productVariant} navigation={props.navigation} />
                    <Spacer mb={1} />
                    {i !== productVariants.length - 1 && <Separator />}
                    <Spacer mb={1} />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </ScrollView>
      </Flex>
      <ButtonContainer p={2}>
        <Button
          onClick={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.ReservationConfirmationDoneButtonTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            openDrawer("bag")
          }}
          block
        >
          Done
        </Button>
      </ButtonContainer>
    </Container>
  )
})

const ButtonContainer = styled(Box)`
  position: fixed;
  width: 380px;
  bottom: 0;
  right: 0;
`
