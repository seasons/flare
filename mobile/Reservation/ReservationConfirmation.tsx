import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { CheckWithBackground } from "components/SVGs"
import gql from "graphql-tag"
import { color } from "helpers/color"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import React from "react"
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
          shippingOption {
            id
            externalCost
            shippingMethod {
              id
              displayText
            }
          }
          lineItems {
            id
            name
            price
            taxPrice
          }
          products {
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
                  size
                  displayShort
                }
              }
            }
          }
        }
      }
    }
  }
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
  const items = reservation?.products
  const lineItems = reservation?.lineItems

  const SectionHeader = ({ title, content = null, bottomSpacing = 1, hideSeparator = false }) => {
    return (
      <>
        <Flex flexDirection="row" width="100%">
          <Sans size="3" color="black100">
            {title}
          </Sans>
          {content && <Box ml="auto">{content}</Box>}
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

  return (
    <Container>
      <Flex px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={52} />
          <CheckWithBackground />
          <Box my={4}>
            <Sans size="3" color="black100">
              We've got your order!
            </Sans>
            <Sans size="3" color="black50">
              We've emailed you a confirmation and we'll notify you when its out for delivery.
            </Sans>
          </Box>
          {lineItems?.length > 0 && (
            <>
              <Spacer pb={4} />
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
                    <Sans size="3" color="black100" textAlign="right" ml="auto">
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
                <>
                  {!!formatedAddress1 && (
                    <Sans size="3" color="black100" textAlign="right">
                      {formatedAddress1}
                    </Sans>
                  )}
                  {!!formatedAddress2 && (
                    <Sans size="3" color="black100" textAlign="right">
                      {formatedAddress2}
                    </Sans>
                  )}
                </>
              }
              bottomSpacing={3}
            />
          </Box>
          <Box pt={1}>
            <SectionHeader
              title="Delivery"
              content={
                <>
                  {!!shippingDisplayText && (
                    <Sans size="3" color="black100" ml="auto" textAlign="right">
                      {shippingDisplayText}
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
              {items?.map((item, i) => {
                return (
                  <Box key={item.id}>
                    <ReservationItem sectionHeight={206} index={i} bagItem={item} navigation={props.navigation} />
                    <Spacer mb={1} />
                    {i !== items.length - 1 && <Separator />}
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
