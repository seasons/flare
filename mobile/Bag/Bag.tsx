import { Box, Button, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useAuthContext } from "lib/auth/AuthContext"
import { assign, fill } from "lodash"
import { PauseButtons } from "mobile/Account/Components/Pause"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import { TabBar } from "mobile/TabBar"
import { CHECK_ITEMS, GET_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM } from "queries/bagQueries"
import React, { useEffect, useState } from "react"
import { FlatList, RefreshControl } from "react-native"
import { identify, Schema, screenTrack, useTracking } from "utils/analytics"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { SavedItemsTab } from "./Components/SavedItemsTab"
import { ReservationHistoryTab } from "./Components/ReservationHistoryTab"
import { BagTab } from "./Components/BagTab"
import { ReservationHistoryTab_Query, SavedTab_Query } from "queries/bagQueries"

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

  const { previousData, data = previousData, refetch } = useQuery(GET_BAG)

  const me = data?.me
  const customerStatus = me?.customer?.status
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

  const items =
    me?.bag?.map((item) => ({
      ...item,
      variantID: item.productVariant.id,
      productID: item.productVariant.product.id,
    })) || []

  const savedItems = savedTabData?.me?.savedItems

  const itemCount = data?.me?.customer?.membership?.plan?.itemCount || DEFAULT_ITEM_COUNT
  const bagItems = (itemCount && assign(fill(new Array(itemCount), { variantID: "", productID: "" }), items)) || []
  const hasActiveReservation = !!me?.activeReservation

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
            items: items.map((item) => item.variantID),
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
          openDrawer("reservation")
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
  const bagCount = items.length
  const bagIsFull = itemCount && bagCount === itemCount
  const reservationItems = reservationTabData?.me?.customer?.reservations
  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const pausePending = pauseRequest?.pausePending
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
    sections = [{ data: bagItems }]
  } else if (isSavedView) {
    sections = [{ data: savedItems }]
  } else {
    sections = [{ data: reservationItems }]
  }
  const footerMarginBottom = currentView === BagView.Bag ? 96 : 2

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
      {isBagView && pauseStatus !== "paused" && !hasActiveReservation && (
        <Box px={2}>
          <Button
            block
            onClick={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.ReserveButtonTapped,
                actionType: Schema.ActionTypes.Tap,
                bagIsFull,
              })
              handleReserve()
            }}
            disabled={!bagIsFull || isMutating}
            loading={isMutating}
            style={{
              width: "100%",
            }}
          >
            Reserve
          </Button>
        </Box>
      )}
    </Container>
  )
})
