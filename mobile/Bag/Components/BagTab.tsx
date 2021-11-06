import { Box, Flex, Sans, Separator, Spacer } from "components"
import { color } from "helpers"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import { Loader } from "mobile/Loader"
import React, { useEffect, useState } from "react"
import { RefreshControl, ScrollView } from "react-native"
import { identify } from "utils/analytics"

import { ProductBuyAlertTabType } from "@seasons/eclipse"

import { useBag } from "../useBag"
import { BagItem } from "./BagItem"
import { BagTabFooter } from "./BagTabFooter"
import { BagTabHeader } from "./BagTabHeader"
import { EmptyBagItem } from "./EmptyBagItem"
import { ProductBuyAlert } from "./ProductBuyAlert"

const MAXIMUM_ITEM_COUNT = 6

export const BagTab: React.FC<{
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ deleteBagItem, removeFromBagAndSaveItem }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { data, bagItems, loading, refetch } = useBag()

  useEffect(() => {
    if (data) {
      setIsLoading(false)
      identify(me?.customer?.user?.id, { bagItems: data?.me?.bag?.length + data?.me?.savedItems?.length })
    }
  }, [data])

  const me = data?.me
  const activeReservation = me?.activeReservation
  const itemCount = me?.customer?.membership?.plan?.itemCount || MAXIMUM_ITEM_COUNT
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

  if (isLoading) {
    return (
      <Flex height={"100%"} width="100%" justifyContent="center" alignItems="center" flexDirection="column">
        <Loader />
      </Flex>
    )
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)
              // refetch()
              setRefreshing(false)
            }}
          />
        }
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        <Box>
          <BagTabHeader atHome={atHome} me={me} />
          <Separator />
          <Spacer mb={1} />
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
                    <EmptyBagItem text="Add another item" />
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
      </ScrollView>
      <BagTabFooter bagItems={bagItems} me={me} refetch={refetch} />
    </>
  )
}
