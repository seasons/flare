import {
  Box, Button, FixedBackArrow, Flex, Sans, Separator, Spacer, SuggestedAddressPopupNote
} from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { PopUpData } from "components/PopUp/PopUpProvider"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import { UPDATE_PAYMENT_AND_SHIPPING } from "mobile/Account/PaymentAndShipping/EditShipping"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import { BagItemFragment } from "queries/bagItemQueries"
import { GET_BAG } from "queries/bagQueries"
import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation, useQuery } from "@apollo/client"

import { ReservationItem } from "./Components/ReservationItem"
import { ShippingOption } from "./Components/ShippingOption"
import { ReservationBottomBar } from "./ReservationBottomBar"
import { ReservationLineItems } from "./ReservationLineItems"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions, $shippingCode: ShippingCode) {
    reserveItems(items: $items, options: $options, shippingCode: $shippingCode) {
      id
    }
  }
`

const GET_CUSTOMER = gql`
  query GetCustomer($shippingCode: String) {
    shippingMethods {
      id
      displayText
      code
      position
      timeWindows {
        id
        startTime
        endTime
        display
      }
    }
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
      newBagItems: bag(status: Added) {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
      }
      reservationLineItems(filterBy: NewItems, shippingCode: $shippingCode) {
        id
        name
        price
        recordType
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
  const tracking = useTracking()

  const [shippingOptionIndex, setShippingOptionIndex] = useState(0)
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

  useEffect(() => {
    if (shippingOptions?.length > 0) {
      const selectedShippingOption = shippingOptions[shippingOptionIndex]
      setShippingCode(selectedShippingOption?.shippingMethod?.code)
    }
  }, [shippingOptionIndex, shippingOptions])

  const phoneNumber = customer?.detail?.phoneNumber
  const billingInfo = customer?.billingInfo
  const items = me?.bag
  const newBagItems = me?.newBagItems

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
              <SectionHeader title="Payment method" onEdit={() => {}} />
              <Sans size="4" color="black50" mt={1}>
                {`${billingInfo.brand} ending in ${billingInfo.last_digits}`}
              </Sans>
            </Box>
            {address && (
              <Box mb={4}>
                <SectionHeader
                  title="Shipping address"
                  onEdit={() => {
                    openDrawer("reservationShippingAddress", {
                      shippingAddress: address,
                      previousScreen: "reservation",
                    })
                  }}
                />
                <Sans size="3" color="black50" mt={1}>
                  {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
                </Sans>
                <Sans size="3" color="black50">
                  {`${address.city}, ${address.state} ${address.zipCode}`}
                </Sans>
              </Box>
            )}
            {shippingOptions?.length > 0 && (
              <Box mb={4}>
                <SectionHeader title="Select shipping" />
                <Spacer mb={1} />{" "}
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
            <Box mb={5}>
              <SectionHeader title="Bag items" />
              <Box mt={1} mb={4}>
                {!!newBagItems &&
                  newBagItems.map((item, i) => {
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
        <ButtonContainer>
          <ReservationBottomBar
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
                  items: itemIDs,
                  shippingCode: shippingOptions?.[shippingOptionIndex]?.shippingMethod?.code,
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
