import { Button } from "components"
import { color } from "helpers/color"
import React from "react"

import { Box, Flex, Sans, Separator } from "@seasons/eclipse"

interface BagCheckoutBarProps {
  bagItems: { productVariant: any }[]
  onReserve: () => void
}

export const BagCheckoutBar: React.FC<BagCheckoutBarProps> = ({ bagItems, onReserve }) => {
  if (!bagItems || bagItems.length === 0) {
    return null
  }

  const rentalPrices = bagItems.map((b) => b.productVariant?.product?.rentalPrice) || []
  const totalRentalPrice = rentalPrices.reduce((acc, curr) => acc + curr, 0)

  return (
    <>
      <Separator />
      <Box height={80} pt={2} px={2} style={{ backgroundColor: color("white100") }}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Sans size="4" color="black50">
              Estimated total
            </Sans>
            <Flex flexDirection="row" alignItems="center">
              <Sans size="7">${totalRentalPrice}</Sans>
              <Sans size="4" color="black50" mx={1}>
                + Tax
              </Sans>
            </Flex>
          </Box>

          <Box>
            <Button variant="primaryBlack" onClick={onReserve}>
              Reserve
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
