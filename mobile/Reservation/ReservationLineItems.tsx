import { SectionHeader } from "@seasons/eclipse"
import { Box, Flex, Sans, Spacer } from "components"
import React from "react"

export const ReservationLineItems = ({ lineItems }) => {
  let taxTotal = 0
  let total = 0

  return (
    <Box>
      <SectionHeader title="Order summary" />
      <Spacer mb={1} />
      {lineItems?.length > 0 && (
        <Box mb={4}>
          {lineItems.map((lineItem, index) => {
            taxTotal = taxTotal + lineItem.taxPrice
            total = lineItem.taxPrice + total + lineItem.price
            return (
              <Flex flexDirection="row" width="100%" justifyContent="space-between" key={index}>
                <Sans size="3">{lineItem.name}</Sans>
                <Sans size="3">{`$${lineItem.price / 100}`}</Sans>
              </Flex>
            )
          })}
          {taxTotal > 0 && (
            <Flex flexDirection="row" width="100%" justifyContent="space-between">
              <Sans size="3">Taxes</Sans>
              <Sans size="3">{`$${taxTotal / 100}`}</Sans>
            </Flex>
          )}
          {(taxTotal !== 0 || lineItems?.length > 1) && (
            <Flex flexDirection="row" width="100%" justifyContent="space-between">
              <Sans size="3">Total</Sans>
              <Sans size="3">{`$${total / 100}`}</Sans>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  )
}
