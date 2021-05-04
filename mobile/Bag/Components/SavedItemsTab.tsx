import gql from "graphql-tag"
import { Box, Flex } from "components"
import React from "react"

import { BagView } from "../Bag"
import { BagEmptyState } from "./BagEmptyState"
import { SavedItem, SavedItemFragment_BagItem } from "./SavedItem"
import { Loader } from "@seasons/eclipse"

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

export const SavedItemsTab: React.FC<{ items; deleteBagItem; hasActiveReservation; bagIsFull; loading: boolean }> = ({
  items,
  deleteBagItem,
  hasActiveReservation,
  bagIsFull,
  loading,
}) => {
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
        items.map((bagItem, index) => {
          return (
            <Box mt={index === 0 ? 1 : 0} key={bagItem.id}>
              <SavedItem
                hasActiveReservation={hasActiveReservation}
                bagIsFull={bagIsFull}
                removeItemFromBag={deleteBagItem}
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
