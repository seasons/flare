import React from "react"
import { useTracking, Schema } from "utils/analytics"
import { Box, Sans, Flex } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"

export const BagTabHeader = ({ title }) => {
  const tracking = useTracking()
  const { openDrawer } = useDrawerContext()

  return (
    <Box px={2} pt={4} pb={3}>
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap" pb={1}>
        <Sans size="6">{title}</Sans>
        <Sans
          size="6"
          style={{ textDecorationLine: "underline" }}
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.FAQButtonTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            openDrawer("faq")
          }}
        >
          FAQ
        </Sans>
      </Flex>
      <Sans size="4" color="black50">
        Added items will appear below
      </Sans>
    </Box>
  )
}
