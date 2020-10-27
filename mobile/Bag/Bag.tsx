import { Box, Button, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useAuthContext } from "lib/auth/AuthContext"
import { assign, fill } from "lodash"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import { TabBar } from "mobile/TabBar"
import {
  CHECK_ITEMS, GET_BAG, GET_LOCAL_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM
} from "queries/bagQueries"
import React, { useEffect, useState } from "react"
import { FlatList, RefreshControl } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation, useQuery } from "@apollo/client"

import { BagTab, ReservationHistoryTab, SavedItemsTab } from "./Components"

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

  const { data, refetch } = useQuery(GET_BAG)
  const { data: localItems } = useQuery(GET_LOCAL_BAG)

  const me = data?.me
  const customerStatus = me?.customer?.status
  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, {
    update(cache, { data }) {
      // Note: This mutation is being called in BagItem.tsx and has it's variables and refetchQueries listed there
      const { me, paymentPlans } = cache.readQuery({ query: GET_BAG })
      const key = currentView === BagView.Bag ? "bag" : "savedItems"
      const list = me[key]
      const filteredList = list.filter((a) => a.id !== data.removeFromBag.id)
      cache.writeQuery({
        query: GET_BAG,
        data: {
          me: {
            ...me,
            [key]: filteredList,
          },
          paymentPlans,
        },
      })
    },
  })

  const [removeFromBagAndSaveItem] = useMutation(REMOVE_FROM_BAG_AND_SAVE_ITEM, {
    update(cache, { data }) {
      const { me } = cache.readQuery({ query: GET_BAG })
      const old = currentView === BagView.Bag ? "bag" : "savedItems"
      const newKey = currentView === BagView.Bag ? "savedItems" : "bag"
      const list = me[old]
      const filteredList = list.filter((a) => a.id !== data.removeFromBag.id)
      const item = list.find((a) => a.id === data.removeFromBag.id)

      cache.writeQuery({
        query: GET_BAG,
        data: {
          me: {
            ...me,
            [old]: filteredList,
            [newKey]: me[newKey].concat(item),
          },
        },
      })
    },
  })

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS)

  if (isLoading) {
    return <Loader />
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  const items = !authState.isSignedIn
    ? localItems?.localBagItems || []
    : me?.bag?.map((item) => ({
        ...item,
        variantID: item.productVariant.id,
        productID: item.productVariant.product.id,
      })) || []

  const savedItems =
    me?.savedItems?.map((item) => ({
      ...item,
      variantID: item.productVariant.id,
      productID: item.productVariant.product.id,
    })) || []

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
            // navigation.navigate("Modal", {
            //   screen: "CreateAccountModal",
            // })
          },
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
              hidePopUp()
            },
          })
          setMutating(false)
          return
        }
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

        openDrawer("reservation")
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
  const reservations = me?.customer?.reservations
  const bagCount = items.length
  const bagIsFull = itemCount && bagCount === itemCount

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
            <></>
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
        />
      )
    } else {
      return <ReservationHistoryTab items={item.data} />
    }
  }

  let sections
  if (isBagView) {
    sections = [{ data: bagItems }]
  } else if (isSavedView) {
    sections = [{ data: savedItems }]
  } else {
    sections = [{ data: reservations }]
  }
  const footerMarginBottom = currentView === BagView.Bag ? 96 : 2

  return (
    <Container insetsBottom={false}>
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
          setCurrentView(page)
        }}
      />
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
        <ButtonContainer>
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
              borderRadius: 0,
            }}
          >
            Reserve
          </Button>
        </ButtonContainer>
      )}
    </Container>
  )
})

const ButtonContainer = styled(Box)`
  position: fixed;
  width: 380px;
  bottom: 0;
  right: 0;
`
