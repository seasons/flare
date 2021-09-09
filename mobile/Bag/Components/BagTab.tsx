import { Box, Sans, Separator, Spacer } from "components"
import { color } from "helpers"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import React, { useState } from "react"

import { ProductBuyAlertTabType } from "@seasons/eclipse"

import { BagItem } from "./BagItem"
import { BagTabHeader } from "./BagTabHeader"
import { EmptyBagItem } from "./EmptyBagItem"
import { ProductBuyAlert } from "./ProductBuyAlert"

const DEFAULT_ITEM_COUNT = 3

export const BagTab: React.FC<{
  me
  bagItems
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ bagItems, deleteBagItem, removeFromBagAndSaveItem, me }) => {
  const activeReservation = me?.activeReservation
  const itemCount = me?.customer?.membership?.plan?.itemCount || DEFAULT_ITEM_COUNT
  const hasActiveReservation = !!activeReservation

  const [productBuyAlertTabs, setProductBuyAlertTabs] = useState(null)

  const paddedItems =
    assign(fill(new Array(Math.min(itemCount, bagItems.length + 1)), { variantID: "", productID: "" }), bagItems) || []

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

  const updatedMoreThan24HoursAgo =
    activeReservation?.updatedAt && DateTime.fromISO(activeReservation?.updatedAt).diffNow("days")?.values?.days <= -1
  const atHome = status && status === "Delivered" && updatedMoreThan24HoursAgo

  return (
    <Box>
      <BagTabHeader atHome={atHome} me={me} />
      <Separator />
      <Spacer mb={3} />
      {paddedItems?.map((bagItem, index) => {
        return (
          <>
            <Box key={bagItem.productID} px={2} pt={hasActiveReservation ? 0 : 2}>
              {bagItem?.productID?.length > 0 ? (
                <BagItem
                  removeItemFromBag={deleteBagItem}
                  removeFromBagAndSaveItem={removeFromBagAndSaveItem}
                  onShowBuyAlert={handleShowBuyAlert}
                  index={index}
                  bagItem={bagItem}
                />
              ) : (
                <EmptyBagItem index={index} />
              )}
            </Box>
            {!hasActiveReservation && index !== paddedItems.length - 1 && (
              <Box pt={1}>
                <Separator color={color("black10")} />
              </Box>
            )}
          </>
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
