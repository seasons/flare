import { SuggestedAddressPopupNote, Box, Button, FixedBackArrow, Flex, Sans, Separator, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import gql from "graphql-tag"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import { GET_BAG } from "queries/bagQueries"
import { BagItemFragment } from "queries/bagItemQueries"
import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"
import { DateTime } from "luxon"
import { useMutation, useQuery } from "@apollo/client"

import { ReservationItem } from "./Components/ReservationItem"
import { ShippingOption } from "./Components/ShippingOption"
import { ReservationLineItems } from "./ReservationLineItems"
import { UPDATE_PAYMENT_AND_SHIPPING } from "mobile/Account/PaymentAndShipping/EditShipping"
import { PopUpData } from "components/PopUp/PopUpProvider"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions, $shippingCode: ShippingCode) {
    reserveItems(items: $items, options: $options, shippingCode: $shippingCode) {
      id
    }
  }
`

const DrafReservationLineItems = gql`
  mutation DraftReservationLineItems($hasFreeSwap: Boolean) {
    draftReservationLineItems(hasFreeSwap: $hasFreeSwap) {
      id
      name
      price
      taxPrice
    }
  }
`

const GET_CUSTOMER = gql`
  query GetCustomer {
    me {
      id
      nextFreeSwapDate
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
        admissions {
          id
          allAccessEnabled
        }
        detail {
          id
          phoneNumber
          shippingAddress {
            id
            name
            address1
            address2
            city
            state
            zipCode
            shippingOptions {
              id
              externalCost
              averageDuration
              shippingMethod {
                id
                code
                displayText
              }
            }
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

const SectionHeader: React.FC<{ title: string; onEdit?: () => void }> = ({ title, onEdit }) => {
  return (
    <>
      <Flex flexDirection="row" width="100%" justifyContent={!!onEdit ? "space-between" : "flex-start"}>
        <Sans size="3" color="black">
          {title}
        </Sans>
        {!!onEdit && (
          <Sans size="3" color="black" style={{ textDecorationLine: "underline", cursor: "pointer" }} onClick={onEdit}>
            Edit
          </Sans>
        )}
      </Flex>
      <Spacer mb={1} />
      <Separator />
    </>
  )
}

export const Reservation = screenTrack()((props) => {
  const [isMutating, setIsMutating] = useState(false)
  const [shippingOptionIndex, setShippingOptionIndex] = useState(0)
  const tracking = useTracking()
  const { previousData, data = previousData } = useQuery(GET_CUSTOMER)

  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const [lineItems, setLineItems] = useState([])
  const [getReservationLineItems] = useMutation(DrafReservationLineItems)
  const [updatePaymentAndShipping] = useMutation(UPDATE_PAYMENT_AND_SHIPPING, {
    onError: (error) => {
      let popUpData = {
        buttonText: "Got it",
        note: "If this error persists, please contact us.",
        title: "Something went wrong!",
        onClose: () => hidePopUp(),
      }
      showPopUp(popUpData)
      console.log("Error Reservation.tsx", error)
    },
  })
  const [reserveItems] = useMutation(RESERVE_ITEMS, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (error) => {
      let popUpData = {
        title: "Sorry!",
        note: "We couldn't process your order because of an unexpected error, please try again later",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      } as PopUpData
      if (error.message === "Need to Suggest Address") {
        const suggestedAddress = error.graphQLErrors?.[0]?.extensions?.suggestedAddress
        if (!!suggestedAddress) {
          popUpData = {
            buttonText: "Use address",
            note: <SuggestedAddressPopupNote suggestedAddress={suggestedAddress} type="Reservation" />,
            title: "We suggest using this Address",
            secondaryButtonText: "Close",
            secondaryButtonOnPress: () => hidePopUp(),
            onClose: () => {
              updatePaymentAndShipping({
                variables: {
                  phoneNumber,
                  address1: suggestedAddress.street1,
                  address2: suggestedAddress.street2,
                  city: suggestedAddress.city,
                  state: suggestedAddress.state,
                  zipCode: suggestedAddress.zip,
                },
                refetchQueries: [{ query: GET_CUSTOMER }],
              })
              hidePopUp()
            },
          }
        }
      }
      showPopUp(popUpData)
      console.log("Error reservation.tsx: ", error)
      setIsMutating(false)
    },
  })

  const me = data?.me
  const nextFreeSwapDate = me?.nextFreeSwapDate
  const swapNotAvailable = nextFreeSwapDate?.length > 0 && DateTime.fromISO(nextFreeSwapDate) > DateTime.local()

  useEffect(() => {
    const getLineItems = async () => {
      const { data: resData } = await getReservationLineItems({
        variables: {
          hasFreeSwap: false,
        },
      })
      if (resData?.draftReservationLineItems?.length > 0) {
        setLineItems([...lineItems, ...resData?.draftReservationLineItems])
      }
    }
    if (swapNotAvailable === true && lineItems?.length === 0) {
      getLineItems()
    }
  }, [swapNotAvailable])

  const customer = data?.me?.customer
  const address = data?.me?.customer?.detail?.shippingAddress
  const shippingOptions = address?.shippingOptions

  useEffect(() => {
    if (shippingOptions?.length > 0) {
      const selectedShippingOption = shippingOptions[shippingOptionIndex]
      if (selectedShippingOption?.externalCost > 0) {
        setLineItems([
          ...lineItems,
          {
            name: "Shipping",
            price: selectedShippingOption?.externalCost,
            taxPrice: 0,
          },
        ])
      } else {
        setLineItems(lineItems.filter((item) => item.name !== "Shipping"))
      }
    }
  }, [shippingOptionIndex, setLineItems, shippingOptions])

  // Leaving this on for now for all users
  const allAccessEnabled = data?.me?.customer?.admissions?.allAccessEnabled && false

  const phoneNumber = customer?.detail?.phoneNumber
  const items = data?.me?.bag

  const planItemCount = data?.me?.customer?.membership?.plan?.itemCount

  if (!customer || !items || !address) {
    return <Loader />
  }

  return (
    <Container>
      <FixedBackArrow
        variant="whiteBackground"
        onPress={() => {
          if (props?.previousScreen && props?.previousScreen === "reservationShippingAddress") {
            openDrawer("reservationShippingAddress", { shippingAddress: address })
          } else {
            openDrawer("bag")
          }
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
                after 4:00pm EST
              </Sans>{" "}
              will be processed the following business day.
            </Sans>
          </Box>
          <Box mb={4}>
            <SectionHeader title="Delivery Time" />
            <Spacer mb={1} />
            <Sans size="3" color="black50" mt={1}>
              2-day Shipping
            </Sans>
          </Box>
          {address && (
            <Box mb={4}>
              <SectionHeader
                title="Shipping address"
                onEdit={() =>
                  openDrawer("reservationShippingAddress", {
                    shippingAddress: address,
                    previousScreen: "reservation",
                  })
                }
              />
              <Spacer mb={1} />
              <Sans size="3" color="black50" mt={1}>
                {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
              </Sans>
              <Sans size="3" color="black50">
                {`${address.city}, ${address.state} ${address.zipCode}`}
              </Sans>
            </Box>
          )}
          {lineItems?.length > 0 && <ReservationLineItems lineItems={lineItems} />}
          {shippingOptions?.length > 0 && !allAccessEnabled && (
            <Box mb={4}>
              <SectionHeader title="Select shipping" />
              <Spacer mb={1} />
              {shippingOptions.map((option, index) => {
                return (
                  <Box key={option?.id || index}>
                    <ShippingOption
                      option={option}
                      index={index}
                      setShippingOptionIndex={setShippingOptionIndex}
                      shippingOptionIndex={shippingOptionIndex}
                    />
                    <Separator />
                  </Box>
                )
              })}
              <Spacer mb={2} />
              <Sans size="3" color="black50">
                UPS Ground shipping averages 1-2 days in the NY metro area, 3-4 days for the Midwest + Southeast, and
                5-7 days on the West coast.
              </Sans>
            </Box>
          )}
          {!!phoneNumber && (
            <Box mb={4}>
              <SectionHeader title="Phone number" />
              <Spacer mb={2} />
              <Sans size="3" color="black50" mt={1}>
                {phoneNumber}
              </Sans>
            </Box>
          )}
          <Box mb={8}>
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
            const result = await reserveItems({
              variables: {
                planItemCount,
                items: itemIDs,
                shippingCode: shippingOptions?.[shippingOptionIndex]?.shippingMethod?.code,
              },
            })
            if (result?.data?.reserveItems) {
              openDrawer("reservationConfirmation", {
                reservationID: result.data.reserveItems.id,
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
  )
})

const ButtonContainer = styled(Box)`
  position: fixed;
  width: 380px;
  bottom: 0;
  right: 0;
`
