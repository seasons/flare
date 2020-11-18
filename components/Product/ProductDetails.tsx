import { SaveProductButton } from "mobile/Product/SaveProductButton"
import Link from "next/link"
import React from "react"

import { Box, Flex, Sans, Separator, Spacer } from "../"
import { color } from "../../helpers"
import { VariantSizes } from "../VariantSizes"
import { ProductInfoItem } from "./ProductInfoItem"

// FIXME: Fix types here
export const ProductDetails: React.FC<{
  product: any
  selectedVariant: any
}> = ({ product, selectedVariant }) => {
  if (!product || !product.variants) {
    return <></>
  }

  const {
    name,
    description,
    brand: { name: brandName, slug: brandSlug },
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
    <Box mb={3}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box width="100%">
          <Flex flexDirection="row" justifyContent="space-between" width="100%">
            <VariantSizes variants={product.variants} size="3" />
            <Box>
              <SaveProductButton product={product} selectedVariant={selectedVariant} showSizeSelector={true} />
            </Box>
          </Flex>
          <Box my={2}>
            <Sans size="5" color="black">
              {name}
            </Sans>
            <Link href="/designer/[Designer]" as={`/designer/${brandSlug}`}>
              <Sans size="4" color="gray" style={{ cursor: "pointer", textDecoration: "underline" }}>
                {brandName}
              </Sans>
            </Link>
          </Box>
        </Box>
      </Flex>
      <Spacer mb={1} />
      <Sans size="4" color="gray" lineHeight={1.6}>
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
