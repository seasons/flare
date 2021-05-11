import { Box, Flex, Sans, Spacer } from "components"
import { color } from "helpers"
import React from "react"

import { BagView } from "../Bag"

export const BagEmptyState: React.FC<{ currentView: BagView; wrapperHeight?: number }> = ({
  currentView,
  wrapperHeight,
}) => {
  const title = currentView === BagView.Saved ? "Nothing saved" : "No history"
  const text =
    currentView === BagView.Saved ? "You haven’t saved any items." : "You haven't placed any reservations yet."

  return (
    <Flex style={{ height: "100%", width: "100%" }} flexDirection="column" justifyContent="center" alignItems="center">
      <Flex
        style={{ flex: 1, height: "100%" }}
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        height="100%"
      >
        <Box>
          <Sans size="4" style={{ textAlign: "center" }}>
            {title}
          </Sans>
          <Spacer mb={1} />
          <Sans size="4" color={color("black50")} style={{ textAlign: "center" }}>
            {text}
          </Sans>
        </Box>
      </Flex>
    </Flex>
  )
}
