import { Sans, Spacer, Box, Flex } from "components"
import { Checkbox } from "components/Checkbox"
import { OrderBy } from "pages/browse/[Filter]"
import React from "react"
import styled from "styled-components"

export const OrderByFilters = ({ setParams, params }) => {
  const orders = [
    { display: "New Arrivals", value: OrderBy.publishedAt_DESC },
    { display: "Price per month: High to low", value: OrderBy.computedRentalPrice_DESC },
    { display: "Price per month: Low to high", value: OrderBy.computedRentalPrice_ASC },
  ]

  return (
    <>
      <Sans size="3">Sort by</Sans>
      {orders.map((order, index) => {
        const selected = params.orderBy === order.value
        return (
          <FlexWrapper
            key={index}
            onClick={() => {
              setParams({ ...params, orderBy: order.value })
            }}
            pt={2}
          >
            <Checkbox isActive={selected} />
            <Spacer ml={1} />
            <Sans size="3">{order.display}</Sans>
          </FlexWrapper>
        )
      })}
    </>
  )
}

const FlexWrapper = styled(Flex)`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`
