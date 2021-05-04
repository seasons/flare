import { Box, Flex, Sans, Spacer } from "components"
import { color, space } from "helpers"
import { DateTime } from "luxon"
import React from "react"
import { Image } from "mobile/Image"
import { gql } from "@apollo/client"
import { PRODUCT_ASPECT_RATIO } from "@seasons/eclipse"

export const ReservationHistoryItemFragment_Reservation = gql`
  fragment ReservationHistoryItemFragment_Reservation on Reservation {
    id
    status
    reservationNumber
    createdAt
    products {
      id
      productVariant {
        id
        displayShort
        product {
          id
          slug
          name
          images(size: Thumb) {
            id
            url
          }
          brand {
            id
            name
          }
        }
      }
    }
  }
`

export const ReservationHistoryItem = ({ item }) => {
  const date = item?.createdAt && DateTime.fromISO(item?.createdAt).toUTC().toFormat("MM/dd")
  const imageWidth = 100

  const items = [...item.products]
  if (items.length === 1) {
    items.push({})
    items.push({})
  } else if (items.length === 2) {
    items.push({})
  }

  return (
    <Box px={1}>
      <Box px={1}>
        <Spacer mb={2} />
        <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
          {item?.reservationNumber && <Sans size="4">{`Order #${item.reservationNumber}`}</Sans>}
          {item?.status && <Sans size="4">{item.status}</Sans>}
        </Flex>
        {!!date && (
          <Sans size="3" color="black50">
            {date}
          </Sans>
        )}
      </Box>
      <Spacer mb={3} />
      <Flex flexDirection="row" flexWrap="nowrap" px={0.5}>
        {items?.map((physicalProduct) => {
          const variant = physicalProduct?.productVariant
          const variantSizeDisplay = variant?.internalSize?.display
          const product = variant?.product
          const brandName = product?.brand?.name
          const image = product?.images?.[0]
          const imageURL = image?.url || ""
          return (
            <Flex key={physicalProduct.id} style={{ flex: 3 }}>
              <Box p={0.5}>
                {!!imageURL && (
                  <Image
                    source={{ uri: imageURL }}
                    style={{
                      backgroundColor: color("black04"),
                      height: imageWidth * PRODUCT_ASPECT_RATIO,
                      width: imageWidth,
                    }}
                  />
                )}
                <Spacer mb={0.5} />
                {!!brandName && <Sans size="3">{brandName}</Sans>}
                {!!variantSizeDisplay && (
                  <Sans size="3" color="black50">
                    {`Size ${variantSizeDisplay}`}
                  </Sans>
                )}
              </Box>
            </Flex>
          )
        })}
      </Flex>
      <Spacer mb={2} />
    </Box>
  )
}
