import React, { useRef, useState } from "react"
import { FlatList, RefreshControl, View } from "react-native"
import { ReservationHistoryTab } from "./ReservationHistoryTab/ReservationHistoryTab"
import { useLazyQuery, useQuery } from "@apollo/client"
import { Container, FixedBackArrow, Spacer } from "components"
import { TabBar } from "mobile/TabBar"
import { Schema as TrackSchema, useTracking, screenTrack } from "utils/analytics"
import { Loader } from "mobile/Loader"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { ReservationHistoryTab_Query, SavedTab_Query } from "./queries"
import { SavedItemsTab } from "./SavedItemsTab/SavedItemsTab"

export enum SavedAndHistoryView {
  Saved = 0,
  History = 1,
}

export const SavedAndHistory = screenTrack()(() => {
  const { previousData, data = previousData, refetch } = useQuery(SavedTab_Query)
  const [
    getReservationData,
    { previousData: prevHistoryData, data: historyData = prevHistoryData, loading: loadingHistory },
  ] = useLazyQuery(ReservationHistoryTab_Query)
  const { openDrawer, closeDrawer } = useDrawerContext()

  const [refreshing, setRefreshing] = useState(false)
  const flatListRef = useRef(null)
  const tracking = useTracking()

  const [currentView, setCurrentView] = useState<SavedAndHistoryView>(SavedAndHistoryView.Saved)

  const isSavedView = SavedAndHistoryView.Saved == currentView

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  if (!data) {
    return (
      <>
        <FixedBackArrow
          variant="whiteBackground"
          onPress={() => {
            openDrawer("Account")
          }}
        />
        <Loader />
      </>
    )
  }

  const renderItem = ({ item }) => {
    if (isSavedView) {
      return <SavedItemsTab items={item.data?.me?.savedItems} />
    } else {
      return <ReservationHistoryTab items={item.data?.me?.customer?.reservations} loading={loadingHistory} />
    }
  }

  let sections
  if (isSavedView) {
    sections = [{ data: data }]
  } else {
    sections = [{ data: historyData }]
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <FixedBackArrow
        variant="whiteBackground"
        onPress={() => {
          openDrawer("Account")
        }}
      />
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Spacer mb={8} />
        <TabBar
          spaceEvenly
          tabs={[{ name: "Saved items" }, { name: "History" }]}
          activeTab={currentView}
          goToPage={(page: SavedAndHistoryView) => {
            tracking.trackEvent({
              actionName: (() => {
                if (page === SavedAndHistoryView.Saved) {
                  return TrackSchema.ActionNames.SavedTabTapped
                } else {
                  getReservationData()
                  return TrackSchema.ActionNames.HistoryTabTapped
                }
              })(),
              actionType: TrackSchema.ActionTypes.Tap,
            })
            setCurrentView(page)
          }}
        />
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={sections}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => String(index) + item.id + String(currentView)}
          renderItem={(item) => {
            return renderItem(item)
          }}
          ref={flatListRef}
        />
      </View>
    </Container>
  )
})
