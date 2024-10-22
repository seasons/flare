import { Box, Sans, Spacer } from "components"
import gql from "graphql-tag"
import { get } from "lodash"
import { DateTime } from "luxon"
import { Container } from "mobile/Container"
import { Loader } from "mobile/Loader"
import React, { useEffect } from "react"
import { FlatList } from "react-native"

import { useQuery } from "@apollo/client"

import { Bag } from "./Bag"
import { CurrentRotationItem } from "./Components/CurrentRotationItem"

const ACTIVE_RESERVATION = gql`
  query ActiveReservation {
    me {
      activeReservation {
        id
        shipped
        createdAt
        products {
          id
          seasonsUID
          inventoryStatus
          productStatus
          productVariant {
            id
            size
            product {
              id
              name
              retailPrice
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
  }
`

export const CurrentRotation = (props) => {
  const { previousData, data = previousData, loading, refetch } = useQuery(ACTIVE_RESERVATION)

  useEffect(() => {
    refetch()
  }, [get(props, "route.params.reservationID", "")])

  if (loading) {
    return <Loader />
  }

  const activeReservation = get(data, "me.activeReservation", null)

  if (!activeReservation) {
    return <Bag {...props} />
  }

  const returnDate = !!activeReservation
    ? DateTime.fromISO(activeReservation.createdAt).plus({ days: 30 }).toLocaleString(DateTime.DATE_FULL)
    : ""

  const renderItem = ({ item, index }) => {
    return (
      <Box mx={2} key={index}>
        <CurrentRotationItem physicalProduct={item} />
      </Box>
    )
  }

  return (
    <Container>
      <Box>
        <FlatList
          data={activeReservation ? activeReservation.products : []}
          ListHeaderComponent={() => (
            <Box p={2}>
              <Sans size="3" color="black">
                Current Rotation
              </Sans>
              <Sans size="2" color="black50">
                Return By {returnDate}
              </Sans>
            </Box>
          )}
          ItemSeparatorComponent={() => (
            <Box px={2}>
              <Spacer mb={2} />
            </Box>
          )}
          keyExtractor={(_item, index) => String(index)}
          renderItem={(item) => renderItem(item)}
          ListFooterComponent={() => <Spacer mb={40} />}
        />
      </Box>
    </Container>
  )
}
