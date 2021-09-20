import { Box, Button, Flex, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { BottomFade } from "components/SVGs/BottomFade"
import { useAuthContext } from "lib/auth/AuthContext"
import { DateTime } from "luxon"
import { CHECK_ITEMS, GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"

import { useMutation } from "@apollo/client"

import { BagActiveReservationBar } from "./BagActiveReservationBar"
import { BagCheckoutBar } from "./BagCheckoutBar"

const DEFAULT_ITEM_COUNT = 3

export const BagReserveButton = ({ data, refetch }) => {
  const { authState } = useAuthContext()
  const { openDrawer } = useDrawerContext()
  const [isMutating, setMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [checkItemsAvailability] = useMutation(CHECK_ITEMS)

  const me = data?.me
  const bagItems = data?.me?.bag

  const planItemCount = data?.me?.customer?.membership?.plan?.itemCount || DEFAULT_ITEM_COUNT
  const shippingAddress = data?.me?.customer?.detail?.shippingAddress
  const hasActiveReservation = !!me?.activeReservation

  const hasActiveReservationAndBagRoom =
    hasActiveReservation &&
    planItemCount > me?.activeReservation?.products?.length &&
    bagItems.some((a) => a.status === "Added") &&
    ["Queued", "Picked", "Packed", "Delivered", "Received", "Shipped"].includes(me?.activeReservation?.status)

  const handleReserve = async () => {
    setMutating(true)
    try {
      if (!authState.isSignedIn) {
        showPopUp({
          title: "Sign up to Reserve your items",
          note: "You need to create an account before you can reserve items",
          buttonText: "Got it",
          onClose: () => {
            hidePopUp()
          },
        })
      } else {
        const hasShippingAddress =
          !!shippingAddress.address1 && !!shippingAddress.city && !!shippingAddress.state && !!shippingAddress.zipCode

        const { data } = await checkItemsAvailability({
          variables: {
            items: bagItems.map((item) => item.variantID),
          },
          refetchQueries: [
            {
              query: GET_BAG,
            },
          ],
          update(cache, { data, errors }) {
            console.log(data, errors)
          },
        })
        if (hasShippingAddress) {
          const nextFreeSwapDate = me?.nextFreeSwapDate
          const swapNotAvailable = nextFreeSwapDate?.length > 0 && DateTime.fromISO(nextFreeSwapDate) > DateTime.local()

          if (swapNotAvailable) {
            showPopUp({
              title: "Heads up this will be extra",
              note: `You’ve already placed an order this month. Get an extra shipment now for $30 or wait until ${DateTime.fromISO(
                nextFreeSwapDate
              ).toFormat("LLLL d")}.`,
              secondaryButtonText: "Got it",
              secondaryButtonOnPress: () => hidePopUp(),
              onClose: () => {
                openDrawer("reservation")
                hidePopUp()
              },
              buttonText: "Continue",
            })
            return
          } else {
            openDrawer("reservation")
          }
        } else {
          openDrawer("reservationShippingAddress", { shippingAddress })
        }
      }
      setMutating(false)
    } catch (e) {
      const { graphQLErrors } = e
      console.log("Bag.tsx handleReserve: ", graphQLErrors)
      const error = graphQLErrors.length > 0 ? graphQLErrors[0] : null
      if (error) {
        const { code } = error.extensions
        if (code === "511") {
          refetch()

          showPopUp({
            title: "One or more items have been reserved already",
            note:
              "Sorry, some of the items you had selected were confirmed before you, please replace them with available items",
            buttonText: "Got it",
            onClose: () => hidePopUp(),
          })
        } else {
          showPopUp({
            title: "Sorry!",
            note: "We couldn't process your order because of an unexpected error, please try again later",
            buttonText: "Got it",
            onClose: () => hidePopUp(),
          })
        }
      }
      setMutating(false)
    }
  }

  let button = null

  let handlePress = () => {
    // tracking.trackEvent({
    //   actionName: Schema.ActionNames.ReserveButtonTapped,
    //   actionType: Schema.ActionTypes.Tap,
    // })
    if (!hasActiveReservation || hasActiveReservationAndBagRoom) {
      handleReserve()
    } else {
      // navigation.navigate(
      //   markedAsReturned
      //     ? NavigationSchema.PageNames.ReturnYourBagConfirmation
      //     : NavigationSchema.PageNames.ReturnYourBag
      // )
    }
  }

  if (hasActiveReservationAndBagRoom) {
    button = <BagCheckoutBar bagItems={bagItems} onReserve={handlePress} />
  } else if (hasActiveReservation) {
    button = (
      <BagActiveReservationBar reservation={me?.activeReservation} handlePress={handlePress} isLoading={isMutating} />
    )
  } else {
    button = <BagCheckoutBar bagItems={bagItems} onReserve={handlePress} />
  }

  return (
    button && (
      <BottomFade width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Spacer mb={2} />
        <Box>{button}</Box>
        <Spacer mb={2} />
      </BottomFade>
    )
  )
}
