import React from "react"
import gql from "graphql-tag"
import { Flex, Sans } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useTracking, Schema } from "utils/analytics"

export const BagSectionHeaderFragment_BagSection = gql`
  fragment BagSectionHeaderFragment_BagSection on BagSection {
    title
  }
`

export const BagSectionHeader = ({ section, sectionIndex }) => {
  const { openDrawer } = useDrawerContext()
  const tracking = useTracking()

  const isFirstSection = sectionIndex === 0

  return (
    <Flex flexDirection="row" justifyContent={isFirstSection ? "space-between" : "flex-start"} flexWrap="nowrap">
      <Sans size="6">{section.title}</Sans>
      {isFirstSection && (
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
      )}
    </Flex>
  )
}
