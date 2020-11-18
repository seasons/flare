import { Box, Flex, Sans, Spacer } from "components"
import { color, space } from "helpers"
import { DateTime } from "luxon"
import React from "react"
import { Dimensions, Image, TouchableOpacity } from "react-native"
import styled from "styled-components"

export const ReservationHistoryItem = ({ item }) => {
  const date = item?.createdAt && DateTime.fromISO(item?.createdAt).toUTC().toFormat("MM/dd")
  const imageWidth = (380 - space(5)) / 3
  const aspectRatio = 1.25

  return (
    <Box px={2}>
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
      <Spacer mb={3} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
        {item.products?.map((physicalProduct) => {
          const variant = physicalProduct?.productVariant
          const variantSizeDisplay = variant?.internalSize?.display
          const product = variant?.product
          const brandName = product?.brand?.name
          const image = product?.images?.[0]
          const imageURL = image?.url || ""
          return (
            <Box key={physicalProduct.id}>
              <Box>
                <Image
                  source={{ uri: imageURL }}
                  style={{ backgroundColor: color("black04"), height: imageWidth * aspectRatio, width: imageWidth }}
                />
                <Spacer mb={0.5} />
                {!!brandName && <Sans size="3">{brandName}</Sans>}
                {!!variantSizeDisplay && (
                  <Sans size="3" color="black50">
                    {`Size ${variantSizeDisplay}`}
                  </Sans>
                )}
              </Box>
            </Box>
          )
        })}
      </Flex>
      <Spacer mb={2} />
    </Box>
  )
}
