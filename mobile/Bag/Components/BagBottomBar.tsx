import { GetBagAndSavedItems_me_bag } from "__generated__/GetBagAndSavedItems"
import { Button } from "components/Button"
import { color } from "helpers/color"
import React from "react"

import { Box, Flex, Sans, Separator } from "@seasons/eclipse"

interface BagBottomBarProps {
  bagItems: GetBagAndSavedItems_me_bag[]
  onReserve: () => void
}

export const BagBottomBar: React.FC<BagBottomBarProps> = ({ bagItems, onReserve }) => {
  if (!bagItems || bagItems.length === 0) {
    return null
  }

  const rentalPrices = bagItems.map((b) => (b.productVariant?.product as any)?.rentalPrice) || []
  const totalRentalPrice = rentalPrices.reduce((acc, curr) => acc + curr, 0)

  return (
    <>
      <Separator />
      <Box py={2} px={2} style={{ backgroundColor: color("white100") }}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Sans size="3" color="black50">
              Estimated total
            </Sans>
            <Flex flexDirection="row" alignItems="flex-end">
              <Sans size="7">${totalRentalPrice}</Sans>
              <Box ml={0.5} style={{ paddingBottom: 3 }}>
                <Sans size="3" color="black50" mx={1}>
                  + Tax
                </Sans>
              </Box>
            </Flex>
          </Box>
          <Button variant="primaryBlack" onClick={onReserve}>
            Reserve
          </Button>
        </Flex>
      </Box>
    </>
  )
}
