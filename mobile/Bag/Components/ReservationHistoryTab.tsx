import { Box, Flex, Separator } from "components"
import { color } from "helpers"
import React from "react"
import { BagView } from "../Bag"
import { BagEmptyState } from "./BagEmptyState"
import { ReservationHistoryItem, ReservationHistoryItemFragment_Reservation } from "./ReservationHistoryItem"
import gql from "graphql-tag"
import { Loader } from "@seasons/eclipse"

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
  const wrapperHeight = "calc(100vh - 136px)"
  if (loading) {
    return (
      <Flex height={wrapperHeight} width="100%" justifyContent="center" alignItems="center" flexDirection="column">
        <Loader />
      </Flex>
    )
  }

  return (
    <Box style={{ height: wrapperHeight }}>
      {items?.length ? (
        items?.map((bagItem, index) => {
          return (
            <Box key={index} width="100%">
              <ReservationHistoryItem item={bagItem} />
              {index !== items.length - 1 && <Separator color={color("black10")} />}
            </Box>
          )
        })
      ) : (
        <BagEmptyState currentView={BagView.History} wrapperHeight={400} />
      )}
    </Box>
  )
}
