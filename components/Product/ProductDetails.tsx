import { Box, Sans, Separator, Spacer, Flex } from ".."
import React from "react"
import { ProductInfoItem } from "./ProductInfoItem"
import { color } from "../../helpers"
import { VariantSizes } from "../VariantSizes"

// FIXME: Fix types here
export const ProductDetails: React.FC<{
  product: any
}> = ({ product }) => {
  if (!product || !product.variants) {
    return <></>
  }

  const {
    name,
    description,
    brand: { name: brandName },
  } = product

  const modelHeightDisplay = (modelHeight) => {
    const height = parseInt(modelHeight)
    const feet = Math.floor(height / 12)
    const inches = height % 12
    if (!!feet && !!inches) {
      return `${feet}'${inches}"`
    } else {
      return `${feet}'`
    }
  }

  return (
    <Box pt={2} px={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box>
          <VariantSizes variants={product.variants} size="1" />
          <Box my={2}>
            <Sans size="5" color="black">
              {name}
            </Sans>
            <Sans size="4" color="gray">
              {brandName}
            </Sans>
          </Box>
        </Box>
      </Flex>
      <Spacer mb={1} />
      <Sans size="3" color="gray" lineHeight={1.6}>
        {description}
      </Sans>
      <Spacer mb={3} />
      <Separator color={color("black15")} />
      {product.color && <ProductInfoItem detailType="Color" detailValue={product.color.name} />}
      {!!product.modelSize && !!product.modelHeight && (
        <ProductInfoItem
          detailType="Fit"
          detailValue={`Model is ${modelHeightDisplay(product.modelHeight)} in a ${product.modelSize.display}`}
        />
      )}
      {product.outerMaterials && (
        <ProductInfoItem detailType="Materials" detailValue={product.outerMaterials.join(", ")} />
      )}
      {product.brand && <ProductInfoItem detailType="Brand" detailValue={product.brand.name} />}
      {product.retailPrice && <ProductInfoItem detailType="Retail price" detailValue={"$" + product.retailPrice} />}
    </Box>
  )
}
