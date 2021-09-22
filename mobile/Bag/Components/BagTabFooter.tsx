import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useAuthContext } from "lib/auth/AuthContext"
import { CHECK_ITEMS, GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"
import { Schema as TrackSchema, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"
import { Box, Button, Flex } from "@seasons/eclipse"

import { BagBottomBar } from "./BagBottomBar"

const MAXIMUM_ITEM_COUNT = 6

export const BagTabFooter = ({ me, refetch }) => {
  const [isMutating, setMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const { authState } = useAuthContext()
  const tracking = useTracking()

  const bagItems = me?.bagItems
  const customerStatus = me?.customer?.status
  const hasActiveReservation = !!me?.activeReservation
  const isSignedIn = authState.isSignedIn
  const shippingAddress = me?.customer?.detail?.shippingAddress
  const hasAddedItems = me?.bagItems?.some((a) => a.status === "Added")
  const markedAsReturned = !!me?.activeReservation?.returnedAt
  const bagCount = bagItems?.length || 0

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS, {
    onCompleted: (res) => {
      setMutating(false)
      if (res.checkItemsAvailability) {
        openDrawer("bag")
      }
    },
    onError: (e) => {
      const { graphQLErrors } = e
      console.log("Bag.tsx handleReserve: ", graphQLErrors)
      const error = graphQLErrors.length > 0 ? graphQLErrors[0] : null
      if (error) {
        const { code } = error.extensions
        if (code === "515" || code === "511") {
          refetch()

          showPopUp({
            title: "One or more items have been reserved already",
            note:
              "Sorry, some of the items you had selected were confirmed before you, we've moved these to your saved items.",
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
    },
  })

  const handleCheckItems = async () => {
    await checkItemsAvailability({
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
  }

  const handleReserve = async () => {
    setMutating(true)
    if (!isSignedIn) {
      showPopUp({
        title: "Sign up to reserve your items",
        note: "You need to create an account before you can reserve items",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
          //   navigation.navigate("Modal", {
          //     screen: "CreateAccountModal",
          //   })
        },
      })
    } else if (customerStatus === "Authorized") {
      showPopUp({
        title: "You need to choose a plan first",
        note: "Sign up to a plan to continue reserving your items",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
          //   navigation.navigate("Modal", {
          //     screen: NavigationSchema.PageNames.CreateAccountModal,
          //     params: {
          //       initialState: CreateAccountState.ChoosePlan,
          //       initialUserState: CreateAccountUserState.Admitted,
          //     },
          //   })
        },
      })
    } else if (bagCount > MAXIMUM_ITEM_COUNT) {
      showPopUp({
        title: "You must remove some items first",
        note: `The maximum items you can reserve is ${MAXIMUM_ITEM_COUNT}.`,
        buttonText: "Got it",
        onClose: () => hidePopUp(),
      })
    } else {
      const hasShippingAddress =
        !!shippingAddress.address1 && !!shippingAddress.city && !!shippingAddress.state && !!shippingAddress.zipCode
      if (!hasShippingAddress) {
        showPopUp({
          title: "Your shipping address is incomplete",
          note:
            "Please update your shipping address under Payment & Shipping in your account settings to complete your reservation.",
          buttonText: "Got it",
          onClose: () => hidePopUp(),
          secondaryButtonText: "Go to settings",
          secondaryButtonOnPress: () => {
            // navigation.navigate(NavigationSchema.StackNames.AccountStack, {
            //   screen: NavigationSchema.PageNames.PaymentAndShipping,
            // })
            hidePopUp()
          },
        })
        setMutating(false)
        return
      }
      await handleCheckItems()
    }
    setMutating(false)
  }

  let button = null

  let handlePress = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ReserveButtonTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
    if (!hasActiveReservation || hasAddedItems) {
      handleReserve()
    } else {
      //   openDrawer(markedAsReturned ? "ReturnYourBag")
      //   navigation.navigate(
      //     markedAsReturned
      //       ? NavigationSchema.PageNames.ReturnYourBagConfirmation
      //       : NavigationSchema.PageNames.ReturnYourBag
      //   )
    }
  }

  if (hasAddedItems) {
    button = <BagBottomBar bagItems={bagItems} onReserve={handlePress} />
  } else if (hasActiveReservation) {
    if (me?.activeReservation?.status === "Delivered") {
      if (markedAsReturned) {
        const returnLabelUrl = me?.activeReservation?.returnedPackage?.shippingLabel?.trackingURL
        button = (
          <Flex flexDirection="row" justifyContent="space-between" mx={3} my={3}>
            {returnLabelUrl && (
              <Button
                onPress={() => window.open(returnLabelUrl)}
                disabled={isMutating}
                loading={isMutating}
                variant="primaryWhite"
                flex={1}
              >
                Return label
              </Button>
            )}
            <Button onPress={handlePress} disabled={isMutating} loading={isMutating} variant="primaryBlack" flex={1}>
              How to return
            </Button>
          </Flex>
        )
      } else {
        button = (
          <Box mx={2} my={2}>
            <Button block onPress={handlePress} disabled={isMutating} loading={isMutating} variant="primaryWhite">
              Return bag
            </Button>
          </Box>
        )
      }
    }
  }

  return (
    button && (
      <Box width="100%" style={{ position: "absolute", bottom: 0 }}>
        {button}
      </Box>
    )
  )
}
