import { useMutation } from "@apollo/client"
import { Box } from "components"
import gql from "graphql-tag"
import { DELETE_BAG_ITEM } from "queries/bagQueries"
import React from "react"
import { SavedAndHistoryView } from "../SavedAndHistory"
import { SavedAndHistoryEmptyState } from "../SavedAndHistoryEmptyState"
import { SavedItem, SavedItemFragment_BagItem } from "./SavedItem"

export const SavedItemsTabFragment_Me = gql`
  fragment SavedItemsTabFragment_Me on Me {
    id
    savedItems {
      id
      ...SavedItemFragment_BagItem
    }
  }
  ${SavedItemFragment_BagItem}
`

export const SavedItemsTab: React.FC<{
  items
}> = ({ items }) => {
  return (
    <Box>
      {items?.length ? (
        items.map((bagItem, index) => {
          return (
            <Box mt={index === 0 ? 1 : 0} key={bagItem.id}>
              <SavedItem bagItem={bagItem} />
            </Box>
          )
        })
      ) : (
        <SavedAndHistoryEmptyState currentView={SavedAndHistoryView.Saved} />
      )}
    </Box>
  )
}
