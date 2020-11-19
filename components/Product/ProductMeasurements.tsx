import { Box } from "components"
import React from "react"
import { ProductInfoItem } from "./ProductInfoItem"
import { sizeToName } from "components/Product/VariantSelect"

export const ProductMeasurements: React.FC<{
  selectedVariant: any
}> = ({ selectedVariant }) => {
  if (!selectedVariant) {
    return null
  }

  const topSizes = selectedVariant?.internalSize?.top

  if (!topSizes?.letter && !topSizes?.length && !topSizes?.sleeve && !topSizes?.shoulder && !topSizes?.chest) {
    return null
  }

  return (
    <Box mt={8}>
      <ProductInfoItem detailType="Measurements" detailValue="" />
      {!!topSizes?.letter && <ProductInfoItem detailType="Size" detailValue={`${sizeToName(topSizes?.letter)}`} />}
      {!!topSizes?.length && <ProductInfoItem detailType="Length" detailValue={`${topSizes?.length}"`} />}
      {!!topSizes?.sleeve && <ProductInfoItem detailType="Sleeve" detailValue={`${topSizes?.sleeve}"`} />}
      {!!topSizes?.shoulder && <ProductInfoItem detailType="Shoulders" detailValue={`${topSizes?.shoulder}"`} />}
      {!!topSizes?.chest && <ProductInfoItem detailType="Chest" detailValue={`${topSizes?.chest}"`} />}
    </Box>
  )
}
