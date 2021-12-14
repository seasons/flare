import React from "react"
import { ReservationHistoryItem, ReservationHistoryItemFragment_Reservation } from "./ReservationHistoryItem"
import { gql } from "@apollo/client"
import { Dimensions } from "react-native"
import { Flex, Box, Separator } from "components"
import { Loader } from "mobile/Loader"
import { BagEmptyState } from "mobile/Bag/Components/BagEmptyState"
import { color } from "helpers"
import { SavedAndHistoryView } from "../SavedAndHistory"

export const ReservationHistoryTabFragment_Customer = gql`
  fragment ReservationHistoryTabFragment_Customer on Customer {
    id
    reservations(orderBy: createdAt_DESC) {
      ...ReservationHistoryItemFragment_Reservation
    }
  }
  ${ReservationHistoryItemFragment_Reservation}
`

export const ReservationHistoryTab: React.FC<{ items; loading: boolean }> = ({ items, loading }) => {
  if (loading) {
    return (
      <Flex height="100%" width="100%" justifyContent="center" alignItems="center" flexDirection="column">
        <Loader />
      </Flex>
    )
  }

  return (
    <Flex style={{ flex: 1 }}>
      {items?.length ? (
        items?.map((bagItem, index) => {
          return (
            <Box key={index}>
              <ReservationHistoryItem item={bagItem} />
              {index !== items.length - 1 && <Separator color={color("black10")} />}
            </Box>
          )
        })
      ) : (
        <BagEmptyState currentView={SavedAndHistoryView.History} />
      )}
    </Flex>
  )
}
