import { Box, Sans } from "components"
import React from "react"
import { truncate } from "lodash"
import gql from "graphql-tag"

export const BagItemProductMetaDataFragment_BagItem = gql`
  fragment BagItemProductMetaDataFragment_BagItem on BagItem {
    productVariant {
      id
      displayShort
      price {
        id
        buyUsedAdjustedPrice
      }
      product {
        id
        name
        rentalPrice
        retailPrice
        brand {
          id
          name
        }
      }
    }
  }
`

export const BagItemProductMetaData: React.FC<{ variant: any; showBuyPrice?: boolean }> = ({
  variant,
  showBuyPrice,
}) => {
  const product = variant?.product

  if (!product) {
    return null
  }

  const buyUsedPrice = variant?.price?.buyUsedAdjustedPrice / 100

  let priceLine
  if (showBuyPrice) {
    priceLine = `$${buyUsedPrice} to buy`
  } else {
    priceLine = !!buyUsedPrice
      ? `$${product?.rentalPrice} / mo | $${buyUsedPrice} to buy`
      : `$${product?.rentalPrice} / month`
  }

  return (
    <Box width="100%">
      <Sans size="3">{product?.brand?.name}</Sans>
      <Sans size="3" color="black50">
        {truncate(product?.name, {
          length: 22,
          separator: "...",
        })}
      </Sans>
      <Sans size="3" color="black50">
        {priceLine}
      </Sans>
      <Sans size="3" color="black50">
        Size {variant?.displayShort}
      </Sans>
    </Box>
  )
}
