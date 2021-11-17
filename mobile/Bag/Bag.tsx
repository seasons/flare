import { Box } from "components"
import { Container } from "mobile/Container"
import { TabBar } from "mobile/TabBar"
import { DELETE_BAG_ITEM } from "queries/bagQueries"
import React, { useState } from "react"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"

import { BagTab } from "./Components/BagTab"
import { ReservationHistoryTab } from "./Components/ReservationHistoryTab"
import { SavedItemsTab } from "./Components/SavedItemsTab"

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

  const CurrentTab = () => {
    switch (currentView) {
      case BagView.Bag:
        return <BagTab />
      case BagView.Saved:
        return <SavedItemsTab deleteBagItem={deleteBagItem} />
      case BagView.History:
        return <ReservationHistoryTab />
    }
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
