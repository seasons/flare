import { Box, Flex, Sans, Separator, Spacer } from "components"
import { color } from "helpers"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import { useAuthContext } from "mobile/Navigation/AuthContext"
import { usePopUpContext } from "mobile/Navigation/PopUp/PopUpContext"
import React, { useEffect, useState } from "react"
import { Schema, useTracking } from "utils/analytics"

import { useLazyQuery, useMutation } from "@apollo/client"

import { WantAnotherItemBagItem } from "./"
import { BagItem } from "./BagItem"
import { GET_BAG, GET_LOCAL_BAG_ITEMS } from "./BagQueries"
import { DeliveryStatus } from "./DeliveryStatus"
import { EmptyBagItem } from "./EmptyBagItem"

const DEFAULT_ITEM_COUNT = 3

export const BagTab: React.FC<{
  pauseStatus: any
  data: any
  items
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ pauseStatus, items, deleteBagItem, removeFromBagAndSaveItem, data }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()

  const me = data?.me
  const paymentPlans = data?.paymentPlans
  const activeReservation = me?.activeReservation
  const itemCount = me?.customer?.membership?.plan?.itemCount || DEFAULT_ITEM_COUNT
  const hasActiveReservation = !!activeReservation

  const [getLocalBag, { data: localItems }] = useLazyQuery(GET_LOCAL_BAG_ITEMS, {
    variables: {
      ids: items?.map((i) => i.productID),
    },
  })

  const bagItems = !authState.isSignedIn
    ? localItems?.products.map((item, i) => ({
        ...items?.[i],
        productVariant: item.variants[0],
        status: "Added",
      }))
    : items

  const paddedItems = assign(fill(new Array(itemCount), { variantID: "", productID: "" }), bagItems) || []

  useEffect(() => {
    if (!authState.isSignedIn) {
      getLocalBag()
    }
  }, [items])

  // const [removeScheduledPause] = useMutation(REMOVE_SCHEDULED_PAUSE, {
  //   refetchQueries: [
  //     {
  //       query: GET_BAG,
  //     },
  //   ],
  //   onCompleted: () => {
  //     setIsMutating(false)
  //     const popUpData = {
  //       title: "Got it!",
  //       note: "Your membership is no longer scheduled to be paused.",
  //       buttonText: "Close",
  //       onClose: () => hidePopUp(),
  //     }
  //     showPopUp(popUpData)
  //   },
  //   onError: (err) => {
  //     const popUpData = {
  //       title: "Oops!",
  //       note: "There was an error canceling the pause on your membership, please contact us.",
  //       buttonText: "Close",
  //       onClose: () => hidePopUp(),
  //     }

  //     console.log("err", err)
  //     showPopUp(popUpData)
  //     setIsMutating(false)
  //   },
  // })

  let returnReminder
  if (hasActiveReservation && me?.customer?.plan === "Essential" && !!me?.activeReservation?.returnAt) {
    const luxonDate = DateTime.fromISO(me?.activeReservation?.returnAt)
    returnReminder = `Return by ${luxonDate.weekdayLong}, ${luxonDate.monthLong} ${luxonDate.day}`
  }
  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const showPendingMessage = pauseStatus === "pending" && !!pauseRequest?.pauseDate

  return (
    <Box>
      <Box px={2} pt={4}>
        <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
          <Sans size="1">{hasActiveReservation ? "Current rotation" : "My bag"}</Sans>
          <Sans
            size="1"
            style={{ textDecorationLine: "underline" }}
            onPress={() => {
              // tracking.trackEvent({
              //   actionName: Schema.ActionNames.FAQButtonTapped,
              //   actionType: Schema.ActionTypes.Tap,
              // })

            }}
          >
            View FAQ
          </Sans>
        </Flex>
        <Sans size="1" color="black50">
          {hasActiveReservation && !!returnReminder ? returnReminder : "Reserve your order below"}
        </Sans>
        <Spacer mb={3} />
      </Box>
      {showPendingMessage && (
        <>
          <Box px={2}>
            <Separator color={color("black10")} />
          </Box>
          <Box px={2} py={2}>
            <Sans size="1" color="black50">
              {`Your membership is scheduled to be paused on ${DateTime.fromISO(pauseRequest.pauseDate).toFormat(
                "EEEE LLLL dd"
              )}. To continue it tap `}
              <Sans
                size="1"
                style={{ textDecorationLine: "underline" }}
                onPress={async () => {
                  if (isMutating) {
                    return
                  }
                  setIsMutating(true)
                  const subscriptionId = me?.customer?.invoices?.[0]?.subscriptionId || ""
                  // await removeScheduledPause({
                  //   variables: {
                  //     subscriptionID: subscriptionId,
                  //   },
                  // })
                }}
              >
                here
              </Sans>
              .
            </Sans>
          </Box>
        </>
      )}
      <Separator />
      <Spacer mb={3} />
      {hasActiveReservation && <DeliveryStatus activeReservation={activeReservation} />}
      {paddedItems?.map((bagItem, index) => {
        return bagItem?.productID?.length > 0 ? (
          <Box key={bagItem.productID} px={2} pt={hasActiveReservation ? 0 : 2}>
            <BagItem
              removeItemFromBag={deleteBagItem}
              removeFromBagAndSaveItem={removeFromBagAndSaveItem}
              index={index}
              bagItem={bagItem}
            />
            {!hasActiveReservation && index !== items.length - 1 && <Separator color={color("black10")} />}
          </Box>
        ) : (
          <Box key={index} px={2}>
            <EmptyBagItem index={index} />
            {!hasActiveReservation && index !== items.length - 1 && <Separator color={color("black10")} />}
          </Box>
        )
      })}
      {/* {!hasActiveReservation && items && items.length < 3 && (
        <Box px={2}>
          <WantAnotherItemBagItem plan={me?.customer?.membership?.plan} paymentPlans={paymentPlans} />
        </Box>
      )} */}
    </Box>
  )
}
