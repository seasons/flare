import React, { useState } from "react"
import { BagBottomBar } from "../BagBottomBar"
import { useAuthContext } from "lib/auth/AuthContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { MAXIMUM_ITEM_COUNT } from "mobile/Bag/Bag"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useRouter } from "next/router"
import { Box, Button, Flex } from "components"

export const BagTabFooter = ({ data, sections, startReservation }) => {
  const router = useRouter()
  const [isMutating, setIsMutating] = useState(false)
  const { authState } = useAuthContext()
  const { openDrawer, closeDrawer } = useDrawerContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const isSignedIn = authState.isSignedIn

  const addedItems = sections?.find((section) => section.status === "Added")?.bagItems
  const hasAddedItems = addedItems?.length > 0
  const atHomeItems = sections?.find((section) => section.status === "AtHome")?.bagItems
  const hasAtHomeItems = atHomeItems?.length > 0
  const returnPendingItems = sections?.find((section) => section.status === "ReturnPending")?.bagItems
  const hasReturnPendingsItems = returnPendingItems?.length > 0
  const inboundTrackingUrl = sections?.find(
    (section) =>
      (section.status === "ScannedOnInbound" ||
        section.status === "InTransitInbound" ||
        section.status === "DeliveredToBusiness") &&
      !!section.deliverTrackingUrl
  )?.deliveryTrackingUrl

  const me = data?.me
  const customerStatus = me?.customer?.status
  const shippingAddress = data?.me?.customer?.detail?.shippingAddress
  const hasShippingAddress =
    !!shippingAddress?.address1 && !!shippingAddress?.city && !!shippingAddress?.state && !!shippingAddress?.zipCode

  const handleReserve = async () => {
    setIsMutating(true)
    if (!isSignedIn) {
      showPopUp({
        title: "Sign up to reserve your items",
        note: "You need to create an account before you can reserve items",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
        },
      })
    } else if (customerStatus === "Authorized") {
      showPopUp({
        title: "You need to choose a plan first",
        note: "Sign up to a plan to continue reserving your items",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
        },
      })
    } else if (addedItems?.length > MAXIMUM_ITEM_COUNT) {
      showPopUp({
        title: "You must remove some items first",
        note: `The maximum items you can reserve is ${MAXIMUM_ITEM_COUNT}.`,
        buttonText: "Got it",
        onClose: () => hidePopUp(),
      })
    } else if (!hasShippingAddress) {
      openDrawer("reservationShippingAddress", { shippingAddress })
      return
    } else {
      await startReservation()
    }
    setIsMutating(false)
  }

  let button = null

  // TODO: Implement return flow in Flare
  // const onReturnBagClicked = () => {
  //     openDrawer(hasAtHomeItems ? "ReturnYourBag" : "")
  // }

  if (hasAddedItems) {
    button = <BagBottomBar bagItems={addedItems} onReserve={handleReserve} />
    // } else if (hasAtHomeItems) {
    //   button = (
    //     <Box mx={2} my={2}>
    //       <Button block onPress={onReturnBagClicked} disabled={isMutating} loading={isMutating} variant="primaryWhite">
    //         Return bag
    //       </Button>
    //     </Box>
    //   )
  } else if (!!inboundTrackingUrl) {
    button = (
      <Button
        onPress={() => router.push(inboundTrackingUrl)}
        disabled={isMutating}
        loading={isMutating}
        block
        variant="primaryWhite"
      >
        Return label
      </Button>
    )
    // } else if (hasReturnPendingsItems) {
    //   button = (
    //     <Flex flexDirection="row" justifyContent="space-between" mx={2} my={2}>
    //       <Button onPress={handlePress} disabled={isMutating} loading={isMutating} block variant="primaryBlack">
    //         How to return
    //       </Button>
    //     </Flex>
    //   )
    // }
  } else {
    button = (
      <Button onPress={() => closeDrawer()} block variant="primaryWhite">
        Close
      </Button>
    )
  }

  return (
    button && (
      <Box width="100%" style={{ position: "absolute", bottom: 0, zIndex: 999 }}>
        {button}
      </Box>
    )
  )
}
