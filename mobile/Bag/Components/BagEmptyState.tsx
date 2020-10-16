import { Box, Flex, Sans, Spacer } from "components"
import { color } from "helpers"
import React from "react"
import { Dimensions } from "react-native"

import { BagView } from "../Bag"

export const BagEmptyState: React.FC<{ currentView: BagView }> = ({ currentView }) => {
  const { height } = Dimensions.get("window")
  const rowHeight = height - 140
  const title = currentView === BagView.Saved ? "Nothing saved" : "No history"
  const text =
    currentView === BagView.Saved ? "You haven’t saved any items." : "You haven't placed any reservations yet."
  return (
    <Box p={2} style={{ height: rowHeight }}>
      <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center" flexDirection="column">
        <Box>
          <Sans size="1" style={{ textAlign: "center" }}>
            {title}
          </Sans>
          <Spacer mb={1} />
          <Sans size="1" color={color("black50")} style={{ textAlign: "center" }}>
            {text}
          </Sans>
        </Box>
      </Flex>
    </Box>
  )
}
