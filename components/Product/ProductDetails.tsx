import { VariantSizes } from "@seasons/eclipse"
import { Box, Flex, Sans, Separator, Spacer } from "components"
import { SaveProductButton } from "mobile/Product/SaveProductButton"
import Link from "next/link"
import React from "react"
import { Schema, useTracking } from "utils/analytics"
import { color } from "../../helpers"
import { ProductInfoItem } from "./ProductInfoItem"

// FIXME: Fix types here
export const ProductDetails: React.FC<{
  product: any
  selectedVariant: any
}> = ({ product, selectedVariant }) => {
  const tracking = useTracking()
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

  const internalSize = selectedVariant?.internalSize
  const displayShort = selectedVariant?.displayShort
  const waistByLengthDisplay =
    displayShort !== internalSize?.display && internalSize?.type === "WxL" && internalSize?.display

  const modelDetailValue =
    !!product.modelSize &&
    !!product.modelHeight &&
    `Model is ${modelHeightDisplay(product.modelHeight)} in a ${product.modelSize.type === "WxL" ? "WxL " : ""}${
      product.modelSize.display
    }`
  return (
    <Box mb={3}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box width="100%">
          <Flex flexDirection="row" justifyContent="space-between" width="100%">
            <VariantSizes variants={product.variants} size="4" />
            <Box>
              <SaveProductButton product={product} selectedVariant={selectedVariant} showSizeSelector={true} />
            </Box>
          </Flex>
          <Box my={2}>
            <Sans size="5" color="black">
              {name}
            </Sans>
            <Box
              onClick={() =>
                tracking.trackEvent({
                  actionName: Schema.ActionNames.BrandTapped,
                  actionType: Schema.ActionTypes.Tap,
                  brandName,
                  brandSlug,
                })
              }
            >
              <Link href="/designer/[Designer]" as={`/designer/${brandSlug}`}>
                <Sans size="4" color="gray" style={{ cursor: "pointer", textDecoration: "underline" }}>
                  {brandName}
                </Sans>
              </Link>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Spacer mb={1} />
      <Sans size="4" color="gray" lineHeight={1.6}>
        {description}
      </Sans>
      <Spacer mb={3} />
      <Separator color={color("black15")} />
      {!!waistByLengthDisplay && <ProductInfoItem detailType="Waist by length" detailValue={waistByLengthDisplay} />}
      {product.color && <ProductInfoItem detailType="Color" detailValue={product.color.name} />}
      {!!product.modelSize && !!product.modelHeight && (
        <ProductInfoItem detailType="Fit" detailValue={modelDetailValue} />
      )}
      {product.outerMaterials && (
        <ProductInfoItem detailType="Materials" detailValue={product.outerMaterials.join(", ")} />
      )}
      {product.brand && <ProductInfoItem detailType="Brand" detailValue={product.brand.name} />}
      {product.retailPrice && <ProductInfoItem detailType="Retail price" detailValue={"$" + product.retailPrice} />}
      <ProductInfoItem detailType="Membership price" detailValue="$65 per month" />
    </Box>
  )
}
