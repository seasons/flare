import { GetBagAndSavedItems_me_bag } from "__generated__/GetBagAndSavedItems"
import { Button } from "components/Button"
import { color } from "helpers/color"
import React from "react"

import { Box, Flex, Sans, Separator } from "@seasons/eclipse"
import { gql } from "@apollo/client"
import { BagView } from "../Bag"

interface BagBottomBarProps {
  bagItems: GetBagAndSavedItems_me_bag[]
  onReserve: () => void
  onCartCheckout: () => void
  activeTab: BagView
  isMutating: boolean
}

export const BagBottomBarFragment_BagItem = gql`
  fragment BagBottomBarFragment_BagItem on BagItem {
    id
  }
`

export const BagBottomBar: React.FC<BagBottomBarProps> = ({
  bagItems,
  onReserve,
  activeTab,
  isMutating,
  onCartCheckout,
}) => {
  const isRentView = activeTab === BagView.Rent
  const hasBagItems = bagItems?.length > 0

  let price
  if (isRentView) {
    const rentalPrices = bagItems?.map((b) => b.productVariant?.product?.rentalPrice) || []
    price = rentalPrices?.reduce((acc, curr) => acc + curr, 0) ?? 0
  } else {
    const buyUsedPrices = bagItems?.map((b) => b.productVariant?.price?.buyUsedAdjustedPrice / 100) || []
    price = buyUsedPrices?.reduce((acc, curr) => acc + curr, 0) ?? 0
  }

  const onClick = () => {
    if (isMutating) {
      return
    }

    if (isRentView) {
      onReserve()
    } else {
      onCartCheckout()
    }
  }

  return (
    <>
      <Separator />
      <Box>
        <Flex
          py={2}
          px={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ backgroundColor: color("white100") }}
        >
          <Box>
            <Sans size="3" color="black50">
              {isRentView ? "Est. rental total" : "Est. Sales total"}
            </Sans>
            <Flex flexDirection="row" alignItems="flex-end">
              <Sans size="7">${price}</Sans>
              <Box style={{ paddingBottom: 3 }} pl={1}>
                <Sans size="3" color="black50" mx={1}>
                  + Tax
                </Sans>
              </Box>
            </Flex>
          </Box>
          <Button variant="primaryBlack" onClick={onClick} loading={isMutating} disabled={isMutating || !hasBagItems}>
            {isRentView ? "Reserve" : "Checkout"}
          </Button>
        </Flex>
      </Box>
    </>
  )
}
