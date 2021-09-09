import { Box, Flex } from "components"
import gql from "graphql-tag"
import React from "react"

import { useQuery } from "@apollo/client"
import { Loader } from "@seasons/eclipse"

import { BagView } from "../Bag"
import { BagEmptyState } from "./BagEmptyState"
import { SavedItem } from "./SavedItem"

export const SavedTab_Query = gql`
  query SavedTab_Query {
    me {
      id
      activeReservation {
        id
      }
      savedItems {
        id
        saved
        productVariant {
          id
          reservable
          displayLong
          hasRestockNotification
          product {
            id
            slug
            name
            brand {
              id
              name
            }
            images(size: Thumb) {
              id
              url
            }
          }
        }
      }
    }
  }
`

export const SavedItemsTab: React.FC<{ deleteBagItem }> = ({ deleteBagItem }) => {
  const { previousData, data = previousData, loading } = useQuery(SavedTab_Query)

  const wrapperHeight = "calc(100vh - 136px)"

  if (loading || !data) {
    return (
      <Flex height={wrapperHeight} width="100%" justifyContent="center" alignItems="center" flexDirection="column">
        <Loader />
      </Flex>
    )
  }

  const items = data?.me?.savedItems
  const hasActiveReservation = !!data?.me?.activeReservation
  const bagIsFull = false

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
