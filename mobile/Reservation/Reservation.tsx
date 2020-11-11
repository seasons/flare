import { Box, Button, FixedBackArrow, Flex, Sans, Separator, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import gql from "graphql-tag"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import { BagItemFragment, GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation, useQuery } from "@apollo/client"

import { ReservationItem } from "./Components/ReservationItem"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions) {
    reserveItems(items: $items, options: $options) {
      id
    }
  }
`

const GET_CUSTOMER = gql`
  query GetCustomer {
    me {
      user {
        id
        firstName
        lastName
        email
      }
      bag {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
      }
      customer {
        id
        membership {
          id
          plan {
            id
            itemCount
          }
        }
        detail {
          id
          phoneNumber
          shippingAddress {
            id
            address1
            address2
            city
            state
            zipCode
          }
        }
        billingInfo {
          id
          last_digits
        }
      }
    }
  }
  ${BagItemFragment}
`

const SectionHeader = ({ title }) => {
  return (
    <>
      <Flex flexDirection="row" width="100%">
        <Sans size="3" color="black">
          {title}
        </Sans>
      </Flex>
      <Spacer mb={1} />
      <Separator />
    </>
  )
}

export const Reservation = screenTrack()((props) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const { data } = useQuery(GET_CUSTOMER)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const [reserveItems] = useMutation(RESERVE_ITEMS, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      if (err.graphQLErrors?.[0]?.message.includes("Address Validation Error")) {
        showPopUp({
          title: "Sorry!",
          note:
            "UPS could not validate your shipping address, please double check your shipping address is valid in your account details.",
          buttonText: "Close",
          onClose: () => hidePopUp(),
        })
      } else {
        showPopUp({
          title: "Sorry!",
          note: "We couldn't process your order because of an unexpected error, please try again later",
          buttonText: "Close",
          onClose: () => hidePopUp(),
        })
      }
      console.log("Error reservation.tsx: ", err)
      setIsMutating(false)
    },
  })

  const customer = data?.me?.customer
  const address = data?.me?.customer?.detail?.shippingAddress

  const phoneNumber = customer?.detail?.phoneNumber
  const items = data?.me?.bag

  const planItemCount = data?.me?.customer?.membership?.plan?.itemCount

  if (!customer || !items || !address) {
    return <Loader />
  }

  return (
    <>
      <Container>
        <FixedBackArrow
          variant="whiteBackground"
          onPress={() => {
            openDrawer("bag")
          }}
        />
        <Flex px={2}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Spacer mb={80} />
            <Box pt={4} pb={1}>
              <Sans size="5" color="black100">
                Review your order
              </Sans>
            </Box>
            <Box mb={4}>
              <Sans size="3" color="black50">
                As a reminder, orders placed{" "}
                <Sans size="3" color="black100" style={{ textDecorationLine: "underline", display: "inline-block" }}>
                  after 4:00pm
                </Sans>{" "}
                will be processed the following business day.
              </Sans>
            </Box>
            <Box mb={4}>
              <SectionHeader title="Delivery Time" />
              <Sans size="3" color="black50" mt={1}>
                2-day Shipping
              </Sans>
            </Box>
            {address && (
              <Box mb={4}>
                <SectionHeader title="Shipping address" />
                <Sans size="3" color="black50" mt={1}>
                  {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
                </Sans>
                <Sans size="3" color="black50">
                  {`${address.city}, ${address.state} ${address.zipCode}`}
                </Sans>
              </Box>
            )}
            {!!phoneNumber && (
              <Box mb={4}>
                <SectionHeader title="Phone number" />
                <Sans size="3" color="black50" mt={1}>
                  {phoneNumber}
                </Sans>
              </Box>
            )}
            <Box mb={5}>
              <SectionHeader title="Items" />
              <Box mt={1} mb={4}>
                {!!items &&
                  items.map((item, i) => {
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
            loading={isMutating}
            disabled={isMutating}
            onClick={async () => {
              if (isMutating) {
                return
              }
              tracking.trackEvent({
                actionName: Schema.ActionNames.PlaceOrderTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              setIsMutating(true)
              const itemIDs = items?.map((item) => item?.productVariant?.id)
              const { data } = await reserveItems({
                variables: {
                  planItemCount,
                  items: itemIDs,
                },
              })
              if (data?.reserveItems) {
                openDrawer("reservationConfirmation", {
                  reservationID: data.reserveItems.id,
                })
              }
            }}
            style={{
              width: "100%",
            }}
          >
            Place order
          </Button>
        </ButtonContainer>
      </Container>
    </>
  )
})

const ButtonContainer = styled(Box)`
  position: fixed;
  width: 380px;
  bottom: 0;
  right: 0;
`
