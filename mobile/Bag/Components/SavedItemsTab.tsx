import { Box } from "components"
import React from "react"

import { BagView } from "../Bag"
import { BagEmptyState } from "./BagEmptyState"
import { SavedItem } from "./SavedItem"

const SECTION_HEIGHT = 300

export const SavedItemsTab: React.FC<{ items; deleteBagItem; hasActiveReservation; bagIsFull }> = ({
  items,
  deleteBagItem,
  hasActiveReservation,
  bagIsFull,
}) => {
  return (
    <Box>
      {items?.length ? (
        items.map((bagItem, index) => {
          return (
            <Box mt={index === 0 ? 1 : 0} key={bagItem.id}>
              <SavedItem
                hasActiveReservation={hasActiveReservation}
                bagIsFull={bagIsFull}
                removeItemFromBag={deleteBagItem}
                sectionHeight={SECTION_HEIGHT}
                bagItem={bagItem}
              />
            </Box>
          )
        })
      ) : (
        <BagEmptyState currentView={BagView.Saved} />
      )}
    </Box>
  )
}
