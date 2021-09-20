import { Box, Sans, Separator, Spacer } from "components"
import { color } from "helpers"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { ProductBuyAlertTabType } from "@seasons/eclipse"
import { BagItem } from "./BagItem"
import { EmptyBagItem } from "./EmptyBagItem"
import { ProductBuyAlert } from "./ProductBuyAlert"
import { BagTabHeader } from "./BagTabHeader"
import { MAXIMUM_ITEM_COUNT } from "../Bag"

export const BagTab: React.FC<{
  pauseStatus: any
  data: any
  items
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ pauseStatus, items, deleteBagItem, removeFromBagAndSaveItem, data }) => {
  const [isMutating, setIsMutating] = useState(false)
  const me = data?.me
  const activeReservation = me?.activeReservation
  const itemCount = me?.customer?.membership?.plan?.itemCount || MAXIMUM_ITEM_COUNT
  const hasActiveReservation = !!activeReservation

  const [productBuyAlertTabs, setProductBuyAlertTabs] = useState(null)

  const paddedItems =
    assign(fill(new Array(Math.min(itemCount, items.length + 1)), { variantID: "", productID: "" }), items) || []

  const handleShowBuyAlert = ({ bagItem, variantToUse }) => {
    const { name: brandName, websiteUrl: brandHref, logoImage } = bagItem?.productVariant?.product?.brand
    const price = variantToUse?.price || {
      buyNewEnabled: false,
      buNewAvailableForSale: false,
      buyUsedEnabled: false,
      buyUsedAvailableForSale: false,
    }

    const newTab = price.buyNewAvailableForSale
      ? {
          type: ProductBuyAlertTabType.NEW,
          price: price.buyNewPrice,
          brandHref,
          brandName,
          brandLogoUri: logoImage?.url,
        }
      : { type: ProductBuyAlertTabType.NEW_UNAVAILABLE, brandHref, brandName, brandLogoUri: logoImage?.url }

    const usedTab = price.buyUsedAvailableForSale
      ? { type: ProductBuyAlertTabType.USED, price: price.buyUsedPrice, brandHref, brandName }
      : { type: ProductBuyAlertTabType.USED_UNAVAILABLE }

    setProductBuyAlertTabs({
      tabs: [newTab, usedTab],
      initialTab: price.buyNewEnabled ? 0 : 1,
      productVariantId: bagItem?.productVariant?.id,
    })
  }

  let returnReminder
  if (hasActiveReservation && me?.customer?.plan === "Essential" && !!me?.activeReservation?.returnAt) {
    const luxonDate = DateTime.fromISO(me?.activeReservation?.returnAt)
    returnReminder = `Return by ${luxonDate.weekdayLong}, ${luxonDate.monthLong} ${luxonDate.day}`
  }
  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const showPendingMessage = pauseStatus === "pending" && !!pauseRequest?.pauseDate

  const pauseType = pauseRequest?.pauseType
  const isPaused = pauseStatus === "paused"
  const pausedWithoutItems = isPaused && pauseType === "WithoutItems"

  const updatedMoreThan24HoursAgo =
    activeReservation?.updatedAt && DateTime.fromISO(activeReservation?.updatedAt).diffNow("days")?.values?.days <= -1
  const atHome = status && status === "Delivered" && updatedMoreThan24HoursAgo

  return (
    <Box>
      <BagTabHeader atHome={atHome} me={me} pausedWithoutItems={pausedWithoutItems} />
      {showPendingMessage && (
        <>
          <Box px={2}>
            <Separator color={color("black10")} />
          </Box>
          <Box px={2} py={2}>
            <Sans size="3" color="black50">
              {`Your membership is scheduled to be paused on ${DateTime.fromISO(pauseRequest.pauseDate).toFormat(
                "EEEE LLLL dd"
              )}. To continue it tap `}
              <Sans
                size="3"
                style={{ textDecorationLine: "underline", cursor: "pointer" }}
                onPress={async () => {
                  if (isMutating) {
                    return
                  }
                  setIsMutating(true)
                  const subscriptionId = me?.customer?.invoices?.[0]?.subscriptionId || ""
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

      {paddedItems
        ?.sort((a, b) => {
          const aWeight = a.status === "Reserved" ? 1 : 0
          const bWeight = b.status === "Reserved" ? 1 : 0
          return aWeight - bWeight
        })
        ?.map((bagItem, index) => {
          return bagItem?.productID?.length > 0 ? (
            <Box key={bagItem.productID} px={2} pt={hasActiveReservation ? 0 : 2}>
              <BagItem
                removeItemFromBag={deleteBagItem}
                removeFromBagAndSaveItem={removeFromBagAndSaveItem}
                onShowBuyAlert={handleShowBuyAlert}
                index={index}
                bagItem={bagItem}
              />
              {!hasActiveReservation && index !== items.length - 1 && (
                <Box pt={1}>
                  <Separator color={color("black10")} />
                </Box>
              )}
            </Box>
          ) : (
            <Box key={index} px={2}>
              <EmptyBagItem text="Add another item" />
            </Box>
          )
        })}

      {hasActiveReservation && (
        <Box px={2}>
          <Spacer mb={3} />
          <Sans size="4" color="black50" style={{ textAlign: "center" }}>
            Questions about your order?{" "}
            <a
              href="mailto:membership@seasons.nyc?subject=Support"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>Contact us</span>
            </a>
          </Sans>
        </Box>
      )}
      {productBuyAlertTabs && (
        <ProductBuyAlert onDismiss={() => setProductBuyAlertTabs(null)} {...productBuyAlertTabs} />
      )}
    </Box>
  )
}
