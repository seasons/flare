import { Box, FixedBackArrow, Flex, Sans, Separator, Spacer, SuggestedAddressPopupNote } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { UPDATE_PAYMENT_AND_SHIPPING } from "mobile/Account/PaymentAndShipping/EditShipping"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import { GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"
import { upperFirst } from "lodash"
import { useMutation, useQuery } from "@apollo/client"

import { ReservationItem } from "./Components/ReservationItem"
import { ReservationBottomBar } from "./ReservationBottomBar"
import { ReservationLineItems } from "./ReservationLineItems"
import { ReservationShippingOptionsSection } from "./Components/ReservationShippingOptionSection"
import { SectionHeader } from "./Components/SectionHeader"
import { GET_CUSTOMER, RESERVE_ITEMS } from "./queries"

export const Reservation = screenTrack()((props) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const [dateAndTimeWindow, setDateAndTimeWindow] = useState(null)

  const [shippingCode, setShippingCode] = useState("UPSGround")
  const { openDrawer } = useDrawerContext()

  const { previousData, data = previousData } = useQuery(GET_CUSTOMER, {
    variables: {
      shippingCode: shippingCode || "UPSGround",
    },
  })
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [updatePhoneAndShippingAddress] = useMutation(UPDATE_PAYMENT_AND_SHIPPING, {
    onError: (error) => {
      let popUpData = {
        buttonText: "Got it",
        note: "Please make sure your address is valid. If you're having trouble contact us.",
        title: "Something went wrong!",
        onClose: () => hidePopUp(),
      }
      showPopUp(popUpData)
      console.log("Error Reservation.tsx: ", error)
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
      console.log("error", error)
      let popUpData = {
        title: "Sorry!",
        note: "We couldn't process your order because of an unexpected error, please try again later",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      if (error.message === "Need to Suggest Address") {
        const suggestedAddress = error.graphQLErrors?.[0]?.extensions?.suggestedAddress
        if (!!suggestedAddress) {
          popUpData = {
            buttonText: "Use address",
            //@ts-ignore
            component: <SuggestedAddressPopupNote suggestedAddress={suggestedAddress} type="Reservation" />,
            secondaryButtonText: "Close",
            secondaryButtonOnPress: () => hidePopUp(),
            onClose: () => {
              updatePhoneAndShippingAddress({
                variables: {
                  phoneNumber,
                  shippingAddress: {
                    street1: suggestedAddress.street1,
                    street2: suggestedAddress.street2,
                    city: suggestedAddress.city,
                    state: suggestedAddress.state,
                    postalCode: suggestedAddress.zip,
                  },
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
  const customer = me?.customer
  const address = me?.customer?.detail?.shippingAddress
  const shippingOptions = customer?.detail?.shippingAddress?.shippingOptions
  const phoneNumber = customer?.detail?.phoneNumber
  const billingInfo = customer?.billingInfo
  const items = me?.bag
  const productVariants = me?.newBagItems?.map((i) => i.productVariant)
  const bottomBarDisabled = shippingCode === "Pickup" && !dateAndTimeWindow

  console.log("dateAndTimeWindow", dateAndTimeWindow)

  if (!customer || !items || !address) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <>
      <Container insetsTop insetsBottom={false} backgroundColor="white100">
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
        <Flex style={{ flex: 1 }} px={2}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Spacer mb={80} />
            <Box pb={4}>
              <Sans size="7" color="black100">
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
            <ReservationLineItems lineItems={me.reservationLineItems} />
            <Box mb={4}>
              <SectionHeader
                title="Payment method"
                rightText="Edit"
                onPressRightText={() => {
                  openDrawer("editPaymentMethod", {
                    previousScreen: "reservation",
                  })
                }}
              />
              <Spacer mb={1} />
              <Sans size="4" color="black50" mt={1}>
                {`${billingInfo?.brand ? upperFirst(billingInfo.brand) : "Card"} ending in ${billingInfo?.last_digits}`}
              </Sans>
            </Box>
            {address && (
              <Box mb={4}>
                <SectionHeader
                  rightText="Edit"
                  title="Shipping address"
                  onPressRightText={() => {
                    openDrawer("reservationShippingAddress", {
                      shippingAddress: address,
                      previousScreen: "reservation",
                    })
                  }}
                />
                <Spacer mb={1} />
                <Sans size="4" color="black50" mt={1}>
                  {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
                </Sans>
                <Sans size="4" color="black50">
                  {`${address.city}, ${address.state} ${address.zipCode}`}
                </Sans>
              </Box>
            )}
            <ReservationShippingOptionsSection
              shippingOptions={shippingOptions}
              onShippingOptionSelected={(option) => {
                setShippingCode(option.shippingMethod.code)
              }}
              onTimeWindowSelected={(data) => {
                setDateAndTimeWindow(data)
              }}
            />
            <Box mb={10}>
              <SectionHeader title="Bag items" />
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
        <ButtonContainer>
          <ReservationBottomBar
            disabled={bottomBarDisabled}
            lineItems={me.reservationLineItems}
            onReserve={async () => {
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
                  options: {
                    timeWindowID: dateAndTimeWindow?.timeWindow?.id,
                    pickupDate: dateAndTimeWindow?.date,
                  },
                  shippingCode,
                },
              })
              if (data?.reserveItems) {
                openDrawer("reservationConfirmation", {
                  reservationID: data.reserveItems.id,
                })
              }
            }}
            buttonProps={{ loading: isMutating }}
          />
        </ButtonContainer>
      </Container>
    </>
  )
})

const ButtonContainer = styled(Box)`
  position: absolute;
  width: 380px;
  bottom: 0;
  left: 0;
  right: 0;
`
