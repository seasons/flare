import { Box } from "components"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import { TabBar } from "mobile/TabBar"
import { REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM } from "queries/bagQueries"
import React, { useEffect, useState } from "react"
import { RefreshControl, ScrollView } from "react-native"
import { identify, Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"

import { BagReserveButton } from "./Components/BagReserveButton"
import { BagTab } from "./Components/BagTab"
import { ReservationHistoryTab } from "./Components/ReservationHistoryTab"
import { SavedItemsTab } from "./Components/SavedItemsTab"
import { useBag } from "./useBag"

export enum BagView {
  Bag = 0,
  Saved = 1,
  History = 2,
}

export const Bag = screenTrack()(() => {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const tracking = useTracking()

  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)
  const { data, bagItems, loading, refetch } = useBag()

  const me = data?.me

  useEffect(() => {
    if (data) {
      setIsLoading(false)
      identify(me?.customer?.user?.id, { bagItems: data?.me?.bag?.length + data?.me?.savedItems?.length })
    }
  }, [data, loading])

  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, { awaitRefetchQueries: true })
  const [removeFromBagAndSaveItem] = useMutation(REMOVE_FROM_BAG_AND_SAVE_ITEM)

  if (isLoading) {
    return <Loader />
  }

  const CurrentTab = () => {
    switch (currentView) {
      case BagView.Bag:
        return (
          <>
            <BagTab
              me={data.me}
              bagItems={bagItems}
              removeFromBagAndSaveItem={removeFromBagAndSaveItem}
              deleteBagItem={deleteBagItem}
            />
            {/* <BagReserveButton data={data} refetch={refetch} /> */}
          </>
        )
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)
              refetch()
              setRefreshing(false)
            }}
          />
        }
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        <CurrentTab />
      </ScrollView>
    </Container>
  )
})
