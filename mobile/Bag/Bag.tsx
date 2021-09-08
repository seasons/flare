import { Box, Button, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { BottomFade } from "components/SVGs/BottomFade"
import { useAuthContext } from "lib/auth/AuthContext"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import { PauseButtons } from "mobile/Account/Components/Pause"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import { TabBar } from "mobile/TabBar"
import {
  CHECK_ITEMS, GET_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM, ReservationHistoryTab_Query,
  SavedTab_Query
} from "queries/bagQueries"
import React, { useEffect, useState } from "react"
import { FlatList, RefreshControl } from "react-native"
import { identify, Schema, screenTrack, useTracking } from "utils/analytics"

import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { BagBottomBar, Flex } from "@seasons/eclipse"

import { BagTab } from "./Components/BagTab"
import { ReservationHistoryTab } from "./Components/ReservationHistoryTab"
import { SavedItemsTab } from "./Components/SavedItemsTab"
import { useBag } from "./useBag"

export enum BagView {
  Bag = 0,
  Saved = 1,
  History = 2,
}

const DEFAULT_ITEM_COUNT = 3

export const Bag = screenTrack()((props) => {
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const [isMutating, setMutating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const tracking = useTracking()

  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)

  const { data, bagItems, refetch } = useBag()

  const me = data?.me
  const customerStatus = me?.customer?.status
  const markedAsReturned = !!me?.activeReservation?.returnedAt

  useEffect(() => {
    if (data) {
      setIsLoading(false)
      identify(me?.customer?.user?.id, { bagItems: data?.me?.bag?.length + data?.me?.savedItems?.length })
    }
  }, [data])

  const [
    getReservationTab,
    {
      previousData: previousReservationTabData,
      data: reservationTabData = previousReservationTabData,
      loading: loadingReservationTab,
    },
  ] = useLazyQuery(ReservationHistoryTab_Query)

  const [
    getSavedTab,
    { previousData: previousSavedTabData, data: savedTabData = previousSavedTabData, loading: loadingSavedTab },
  ] = useLazyQuery(SavedTab_Query)

  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, { awaitRefetchQueries: true })
  const [removeFromBagAndSaveItem] = useMutation(REMOVE_FROM_BAG_AND_SAVE_ITEM)
  const [checkItemsAvailability] = useMutation(CHECK_ITEMS)

  if (isLoading) {
    return <Loader />
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  const savedItems = savedTabData?.me?.savedItems

  const planItemCount = data?.me?.customer?.membership?.plan?.itemCount || DEFAULT_ITEM_COUNT
  const bagItemsWithEmptyItems =
    (planItemCount && assign(fill(new Array(planItemCount), { variantID: "", productID: "" }), bagItems)) || []
  const hasActiveReservation = !!me?.activeReservation

  const hasActiveReservationAndBagRoom =
    hasActiveReservation &&
    planItemCount > me?.activeReservation?.products?.length &&
    bagItems.some((a) => a.status === "Added") &&
    ["Queued", "Picked", "Packed", "Delivered", "Received", "Shipped"].includes(me?.activeReservation?.status)

  const shippingAddress = data?.me?.customer?.detail?.shippingAddress
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

  const isBagView = BagView.Bag == currentView
  const isSavedView = BagView.Saved == currentView
  const bagCount = bagItems.length
  const bagIsFull = planItemCount && bagCount === planItemCount
  const reservationItems = reservationTabData?.me?.customer?.reservations
  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const pausePending = pauseRequest?.pausePending
  const nextFreeSwapDate = me?.nextFreeSwapDate
  const swapNotAvailable = nextFreeSwapDate?.length > 0 && DateTime.fromISO(nextFreeSwapDate) > DateTime.local()
  let pauseStatus = "active"

  if (customerStatus === "Paused") {
    pauseStatus = "paused"
  } else if (pausePending) {
    pauseStatus = "pending"
  }

  const renderItem = ({ item }) => {
    if (isBagView) {
      if (pauseStatus === "paused") {
        return (
          <Box
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
            }}
            px={2}
            pb={5}
          >
            <PauseButtons customer={me?.customer} fullScreen />
          </Box>
        )
      } else {
        return (
          <BagTab
            data={data}
            pauseStatus={pauseStatus}
            items={item.data}
            removeFromBagAndSaveItem={removeFromBagAndSaveItem}
            deleteBagItem={deleteBagItem}
          />
        )
      }
    } else if (isSavedView) {
      return (
        <SavedItemsTab
          items={item.data}
          bagIsFull={bagIsFull}
          hasActiveReservation={hasActiveReservation}
          deleteBagItem={deleteBagItem}
          loading={loadingSavedTab && !savedTabData}
        />
      )
    } else {
      return <ReservationHistoryTab items={item.data} loading={loadingReservationTab && !reservationTabData} />
    }
  }

  let sections
  if (isBagView) {
    sections = [{ data: bagItemsWithEmptyItems }]
  } else if (isSavedView) {
    sections = [{ data: savedItems }]
  } else {
    sections = [{ data: reservationItems }]
  }

  const PrimaryCTA = () => {
    if (!isBagView && pauseStatus !== "paused") {
      return null
    }

    let button = null

    let handlePress = () => {
      tracking.trackEvent({
        actionName: Schema.ActionNames.ReserveButtonTapped,
        actionType: Schema.ActionTypes.Tap,
        bagIsFull,
      })
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
      button = <BagBottomBar bagItems={bagItems} onReserve={handlePress} />
    } else if (hasActiveReservation) {
      if (me?.activeReservation?.status === "Delivered") {
        if (markedAsReturned) {
          const returnLabelUrl = me?.activeReservation?.returnedPackage?.shippingLabel?.trackingURL
          button = (
            <Flex flexDirection="row" justifyContent="space-between" mx={2}>
              {returnLabelUrl && (
                <Button
                  style={{ flex: 1 }}
                  onPress={() => window.open(returnLabelUrl, "_blank")}
                  disabled={isMutating}
                  loading={isMutating}
                  variant="primaryWhite"
                >
                  Return label
                </Button>
              )}
              <Button
                style={{ flex: 1 }}
                onPress={handlePress}
                disabled={isMutating}
                loading={isMutating}
                variant="primaryBlack"
              >
                How to return
              </Button>
            </Flex>
          )
        } else {
          button = (
            <Box mx={2}>
              <Button block onPress={handlePress} disabled={isMutating} loading={isMutating} variant="primaryWhite">
                Return bag
              </Button>
            </Box>
          )
        }
      }
    } else {
      button = <BagBottomBar bagItems={bagItems} onReserve={handlePress} />
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

  const footerMarginBottom = currentView === BagView.Bag ? 96 : 2

  const showReserveButton =
    isBagView && pauseStatus !== "paused" && (hasActiveReservationAndBagRoom || !hasActiveReservation)

  return (
    <Container insetsBottom={false}>
      <Box>
        <TabBar
          spaceEvenly
          tabs={["Bag", "Saved", "History"]}
          activeTab={currentView}
          goToPage={(page: BagView) => {
            tracking.trackEvent({
              actionName: () => {
                if (page === 0) {
                  return Schema.ActionNames.BagTabTapped
                } else if (page === 1) {
                  return Schema.ActionNames.SavedTabTapped
                } else {
                  return Schema.ActionNames.ReservationHistoryTabTapped
                }
              },
              actionType: Schema.ActionTypes.Tap,
            })
            if (page === BagView.Saved && !savedTabData) {
              getSavedTab()
            } else if (page === BagView.History && !reservationTabData) {
              getReservationTab()
            }
            setCurrentView(page)
          }}
        />
      </Box>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={sections}
        contentContainerStyle={{ height: "100%", width: "100%", position: "relative" }}
        keyExtractor={(item, index) => String(index) + item.id + String(currentView)}
        renderItem={(item) => {
          return renderItem(item)
        }}
        ListFooterComponent={() => <Spacer mb={footerMarginBottom} />}
      />
      <PrimaryCTA />
    </Container>
  )
})
