import { SavedAndHistoryView } from "mobile/Account/SavedAndHistory/SavedAndHistory"
import React from "react"
import { Box, Flex, Sans, Spacer } from "components"
import { color } from "helpers/color"

export const SavedAndHistoryEmptyState: React.FC<{ currentView: SavedAndHistoryView }> = ({ currentView }) => {
  const title = currentView === SavedAndHistoryView.Saved ? "Nothing saved" : "No history"
  const text =
    currentView === SavedAndHistoryView.Saved
      ? "You haven’t saved any items."
      : "You haven't placed any reservations yet."

  return (
    <Flex
      style={{ flex: 1, height: "100%" }}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      px={2}
      pt={5}
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
  )
}
