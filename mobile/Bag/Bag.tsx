import { Box } from "components"
import { Container } from "mobile/Container"
import { TabBar } from "mobile/TabBar"
import { CHECK_ITEMS, DELETE_BAG_ITEM, GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"

import { BagTab } from "./Components/BagTab"
import { ReservationHistoryTab } from "./Components/ReservationHistoryTab"
import { SavedItemsTab } from "./Components/SavedItemsTab"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useBag } from "./useBag"

export enum BagView {
  Bag = 0,
  Saved = 1,
  History = 2,
}

export const MAXIMUM_ITEM_COUNT = 6

export const Bag = screenTrack()(() => {
  const tracking = useTracking()
  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)
  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM, { awaitRefetchQueries: true })
  const [primaryCtaMutating, setPrimaryCtaMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const { bagSections } = useBag()

  const addedItems = bagSections?.find((section) => section.status === "Added")?.bagItems

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS, {
    onCompleted: (res) => {
      setPrimaryCtaMutating(false)
      if (res.checkItemsAvailability) {
        openDrawer("reservation")
      }
    },
    onError: (e) => {
      setPrimaryCtaMutating(false)
      const { graphQLErrors } = e
      console.log("Bag.tsx handleReserve: ", graphQLErrors)
      const error = graphQLErrors.length > 0 ? graphQLErrors[0] : null
      if (error) {
        const { code } = error.extensions
        if (code === "515" || code === "511") {
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
    },
  })

  const CurrentTab = () => {
    switch (currentView) {
      case BagView.Bag:
        return (
          <BagTab
            startReservation={startReservation}
            setPrimaryCtaMutating={setPrimaryCtaMutating}
            primaryCtaMutating={primaryCtaMutating}
          />
        )
      case BagView.Saved:
        return <SavedItemsTab deleteBagItem={deleteBagItem} />
      case BagView.History:
        return <ReservationHistoryTab />
    }
  }

  const startReservation = async () => {
    await checkItemsAvailability({
      variables: {
        items: addedItems.map((item) => item.productVariant.id),
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

            setCurrentView(page)
          }}
        />
      </Box>

      <CurrentTab />
    </Container>
  )
})
