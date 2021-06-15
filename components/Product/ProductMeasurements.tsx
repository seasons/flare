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

  const internalSize = selectedVariant?.internalSize
  const displayShort = selectedVariant?.displayShort

  const topSizes = internalSize?.top
  const bottomSizes = internalSize?.bottom
  const accessorySizes = internalSize?.accessory

  const waistByLengthDisplay =
    displayShort !== internalSize?.display && internalSize?.type === "WxL" && internalSize?.display

  return (
    <Box mt={8}>
      <ProductInfoItem detailType="Measurements" detailValue="" />
      {!!topSizes?.letter && <ProductInfoItem detailType="Size" detailValue={`${sizeToName(topSizes?.letter)}`} />}
      {!!topSizes?.length && <ProductInfoItem detailType="Length" detailValue={`${topSizes?.length}"`} />}
      {!!topSizes?.sleeve && <ProductInfoItem detailType="Sleeve" detailValue={`${topSizes?.sleeve}"`} />}
      {!!topSizes?.shoulder && <ProductInfoItem detailType="Shoulders" detailValue={`${topSizes?.shoulder}"`} />}
      {!!topSizes?.chest && <ProductInfoItem detailType="Chest" detailValue={`${topSizes?.chest}"`} />}

      {!!waistByLengthDisplay && <ProductInfoItem detailType="Waist by length" detailValue={waistByLengthDisplay} />}
      {!!bottomSizes?.waist && <ProductInfoItem detailType="Waist" detailValue={`${bottomSizes?.waist}"`} />}
      {!!bottomSizes?.rise && <ProductInfoItem detailType="Rise" detailValue={`${bottomSizes?.rise}"`} />}
      {!!bottomSizes?.hem && <ProductInfoItem detailType="Hem" detailValue={`${bottomSizes?.hem}"`} />}
      {!!bottomSizes?.inseam && <ProductInfoItem detailType="Inseam" detailValue={`${bottomSizes?.inseam}"`} />}

      {!!accessorySizes?.length && <ProductInfoItem detailType="Length" detailValue={`${accessorySizes?.length}mm`} />}
      {!!accessorySizes?.bridge && <ProductInfoItem detailType="Bridge" detailValue={`${accessorySizes?.bridge}mm`} />}
      {!!accessorySizes?.width && (
        <ProductInfoItem detailType="Lens width" detailValue={`${accessorySizes?.width}mm`} />
      )}
    </Box>
  )
}
