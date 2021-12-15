import React from "react"
import gql from "graphql-tag"
import { Box, Button, Flex } from "components"
import { useAuthContext } from "lib/auth/AuthContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { Schema as TrackSchema, useTracking } from "utils/analytics"
import { BagView, MAXIMUM_ITEM_COUNT } from "../Bag"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useRouter } from "next/router"
import { BagBottomBar } from "./BagBottomBar"

export const BagTabPrimaryCTAFragment_Me = gql`
  fragment BagTabPrimaryCTAFragment_Me on Me {
    customer {
      id
      status
      detail {
        id
        shippingAddress {
          id
          address1
          city
          state
          zipCode
        }
      }
    }
    bagSections {
      status
      bagItems {
        id
        reservationPhysicalProduct {
          id
          potentialInboundPackage {
            id
            shippingLabel {
              id
              image
            }
          }
        }
      }
    }
  }
`

export const BagTabPrimaryCTA = ({
  data,
  sections,
  startReservation,
  isMutating,
  setIsMutating,
  activeTab,
  onCartCheckout,
}) => {
  const { authState } = useAuthContext()
  const { openDrawer, closeDrawer } = useDrawerContext()
  const router = useRouter()

  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()
  const isSignedIn = authState.isSignedIn

  const addedItems = sections?.find((section) => section.status === "Added")?.bagItems
  const hasAddedItems = addedItems?.length > 0
  const atHomeItems = sections?.find((section) => section.status === "AtHome")?.bagItems
  const hasAtHomeItems = atHomeItems?.length > 0
  const returnPendingItems = sections?.find((section) => section.status === "ReturnPending")?.bagItems
  const hasReturnPendingsItems = returnPendingItems?.length > 0

  const me = data?.me
  const customerStatus = me?.customer?.status
  const shippingAddress = data?.me?.customer?.detail?.shippingAddress
  const hasShippingAddress =
    !!shippingAddress?.address1 && !!shippingAddress?.city && !!shippingAddress?.state && !!shippingAddress?.zipCode

  const pendingReturnBagItems = me?.bagSections?.filter((section) => {
    section?.status === "ReturnPending"
  })?.bagItems
  const bagItemWithInboundPackage = pendingReturnBagItems?.find(
    (item) => item?.reservationPhysicalProduct?.potentialInboundPackage
  )
  const labelImage =
    bagItemWithInboundPackage?.reservationPhysicalProduct?.potentialInboundPackage?.inboundPackage?.shippingLabel?.image

  const isBuyView = activeTab === BagView.Buy

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
      showPopUp({
        title: "Your shipping address is incomplete",
        note:
          "Please update your shipping address under Payment & Shipping in your account settings to complete your reservation.",
        buttonText: "Got it",
        onClose: () => hidePopUp(),
        secondaryButtonText: "Go to settings",
        secondaryButtonOnPress: () => {
          openDrawer("reservationShippingAddress", { shippingAddress })
          hidePopUp()
        },
      })
      // } else if (hasAtHomeItems && !hasReturnPendingsItems) {
      //   setShowReturnItemPopup(true)
    } else {
      await startReservation()
    }
    setIsMutating(false)
  }

  let button = null

  if (hasAddedItems || isBuyView) {
    button = (
      <BagBottomBar
        bagItems={isBuyView ? me?.cartItems : addedItems}
        onReserve={handleReserve}
        isMutating={isMutating}
        activeTab={activeTab}
        onCartCheckout={onCartCheckout}
      />
    )
    //   } else if (hasAtHomeItems) {
    //     button = (
    //       <Box mx={2} my={2}>
    //         <Button block onPress={handlePress} disabled={isMutating} loading={isMutating} variant="primaryWhite">
    //           Return bag
    //         </Button>
    //       </Box>
    //     )
  } else if (!!labelImage) {
    button = (
      <Button
        onPress={() => router.push(labelImage)}
        disabled={isMutating}
        loading={isMutating}
        block
        variant="primaryWhite"
      >
        Return label
      </Button>
    )
    //   } else if (hasReturnPendingsItems) {
    //     button = (
    //       <Flex flexDirection="row" justifyContent="space-between" mx={2} my={2}>
    //         <Button onPress={handlePress} disabled={isMutating} loading={isMutating} block variant="primaryBlack">
    //           How to return
    //         </Button>
    //       </Flex>
    //     )
  } else {
    button = (
      <BagBottomBar
        bagItems={isBuyView ? me?.cartItems : addedItems}
        onReserve={handleReserve}
        isMutating={isMutating}
        activeTab={activeTab}
        onCartCheckout={onCartCheckout}
      />
    )
  }

  return button && <>{button}</>
}
