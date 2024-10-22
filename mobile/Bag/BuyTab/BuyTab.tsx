import React from "react"
import gql from "graphql-tag"
import { Box, Flex, Sans, Separator } from "components"
import { BagItemFragment_BagItem, SmallBagItem } from "../Components/BagItem/SmallBagItem"
import { EmptyBagItem } from "../Components/EmptyBagItem"
import { BagTabHeader } from "../Components/BagTabHeader"
import { BagBottomBarFragment_BagItem } from "../Components/BagBottomBar"

export const BuyTabFragment_Me = gql`
  fragment BuyTabFragment_Me on Me {
    id
    cartItems {
      id
      productVariant {
        id
        price {
          buyUsedAdjustedPrice
        }
      }
      ...BagItemFragment_BagItem
      ...BagBottomBarFragment_BagItem
    }
  }
  ${BagBottomBarFragment_BagItem}
  ${BagItemFragment_BagItem}
`

export const BuyTab: React.FC<{ items }> = ({ items }) => {
  const hasItemsInCart = items?.length > 0

  return (
    <Flex height="100%" flexDirection="column" style={{ flex: 1 }}>
      <BagTabHeader title="Buy" />
      {items?.map((bagItem, index) => {
        return (
          <Box key={index} px={2}>
            <SmallBagItem bagItem={bagItem} sectionStatus="Cart" showBuyPrice />
            <Box py={2}>
              <Separator />
            </Box>
          </Box>
        )
      })}

      {!hasItemsInCart && (
        <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
          <EmptyBagItem text="Continue shopping" view="buy" />
        </Flex>
      )}
    </Flex>
  )
}
