import { Box, Flex, Separator } from "components"
import { color } from "helpers"
import React from "react"

import { BagView } from "../Bag"
import { BagEmptyState } from "./BagEmptyState"
import { ReservationHistoryItem } from "./ReservationHistoryItem"

export const ReservationHistoryTab: React.FC<{ items }> = ({ items }) => {
  return (
    <Flex style={{ flex: 1 }}>
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
        <BagEmptyState currentView={BagView.History} />
      )}
    </Flex>
  )
}