import { Box, Flex, Sans, Separator, Spacer } from "components"
import { AddToBagButton } from "components/AddToBagButton"
import { BuyButton } from "components/BuyButton"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { filter } from "graphql-anywhere"
import { color } from "helpers/color"
import { useAuthContext } from "lib/auth/AuthContext"
import { SaveProductButton } from "mobile/Product/SaveProductButton"
import Link from "next/link"
import { useRouter } from "next/router"
import { GET_BAG } from "queries/bagQueries"
import { GET_PRODUCT, UPSERT_CART_ITEM } from "queries/productQueries"
import React, { useState } from "react"
import { Schema, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"
import {
  ProductBuyCTA,
  ProductBuyCTAFragment_Product,
  ProductBuyCTAFragment_ProductVariant,
  VariantSizes,
} from "@seasons/eclipse"

import { ProductInfoItem } from "./ProductInfoItem"
import { VariantSelect } from "./VariantSelect"

export const ProductDetails: React.FC<{
  product: any
  selectedVariant: any
  setSelectedVariant: any
  data: any
}> = ({ product, selectedVariant, setSelectedVariant, data }) => {
  const tracking = useTracking()

  const router = useRouter()
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

  const productType = product?.category?.productType
  const rentalPrice = product?.rentalPrice
  const retailPrice = product?.retailPrice
  const internalSize = selectedVariant?.internalSize
  const displayShort = selectedVariant?.displayShort
  const variantInStock = selectedVariant?.reservable > 0
  const updatedVariant = product?.variants?.find((a) => a.id === selectedVariant?.id)
  const isInBag = updatedVariant?.isInBag || false
  const waistByLengthDisplay =
    displayShort !== internalSize?.display && internalSize?.type === "WxL" && internalSize?.display

  const manufacturerSize = selectedVariant?.manufacturerSizes?.[0]
  const manufacturerSizeDisplay = manufacturerSize?.display
  const manufacturerSizeType = manufacturerSize?.type
  const manufacturerSizeDiff = manufacturerSizeDisplay !== selectedVariant?.displayShort
  const sizeConversionDisplay = `US ${displayShort} = ${manufacturerSizeType} ${manufacturerSizeDisplay}`

  const discountPercentage = product?.discountPercentage
  const discountedPrice = product?.discountedPrice

  const availPhysProdCount = selectedVariant?.reservable
  const availPhysLessThanThree = availPhysProdCount && availPhysProdCount < 3

  const modelDetailValue =
    !!product.modelSize &&
    !!product.modelHeight &&
    `Model is ${modelHeightDisplay(product.modelHeight)} in a ${
      product.modelSize.type === "Letter" ? "" : `${product.modelSize.type} `
    }${product.modelSize.display}`

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

      <Flex flexDirection="row" width="100%" pt={6}>
        {product?.isRentable && (
          <Flex flexDirection="column" width="100%">
            <Sans size={3}>Rent</Sans>
            <Box pr={2}>
              <Separator mb={2} width="100%" />
            </Box>
            <Flex flexDirection="row" alignItems="flex-end">
              <Sans size={9}>${rentalPrice}</Sans>
              <Flex pb="6px" pl="5px">
                <Sans size={3} color="black50">
                  {" "}
                  / month
                </Sans>
              </Flex>
            </Flex>
          </Flex>
        )}
        <Flex flexDirection="column" width="100%">
          {!!discountedPrice && (
            <>
              <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
                <Sans size={3}>Buy</Sans>

                {!!discountPercentage && (
                  <Box>
                    <Sans size={3} color="black100">
                      <span style={{ color: "#f83131" }}>{discountPercentage}% off</span>

                      <span
                        style={{
                          color: `${color("black50")}`,
                        }}
                      >
                        {" "}
                        |{" "}
                      </span>
                      <span
                        style={{
                          color: `${color("black50")}`,
                          textDecorationLine: "line-through",
                          textDecorationStyle: "solid",
                        }}
                      >
                        ${retailPrice}
                      </span>
                    </Sans>
                  </Box>
                )}
              </Flex>
              <Separator mb={2} width="100%" />
              <Flex flexDirection="row" alignItems="flex-end">
                <Sans size={9} color="black100">
                  ${discountedPrice}
                </Sans>
                <Flex pb="6px" pl="5px">
                  <Sans size={3} color="black100">
                    {" "}
                    + tax
                  </Sans>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
      <Flex paddingTop={6} pb={2} justifyContent="space-between">
        <Sans size={3}>Select a size</Sans>
        {!!availPhysProdCount ? (
          <Sans size={3} color={availPhysLessThanThree ? "red" : "black100"}>
            {availPhysLessThanThree
              ? `Only ${availPhysProdCount} left in this size`
              : `${availPhysProdCount} left in this size`}
          </Sans>
        ) : (
          <Box />
        )}
      </Flex>
      {productType !== "Accessory" && (
        <Flex flex={1} pb={1}>
          <VariantSelect
            product={product}
            variantInStock={variantInStock}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            onSizeSelected={(size) => {
              console.log(size)
            }}
          />
        </Flex>
      )}

      <Spacer mr={2} />
      {product?.isRentable && (
        <Flex flex={1}>
          <AddToBagButton
            selectedVariant={selectedVariant}
            data={data}
            variantInStock={variantInStock}
            isInBag={isInBag}
            size="large"
          />
        </Flex>
      )}
      <Spacer mb={1} />

      <BuyButton size="large" data={data} selectedVariant={selectedVariant} />

      <Spacer mb={10} />

      <ProductInfoItem detailType="Product details" detailValue="" />
      {!!waistByLengthDisplay && <ProductInfoItem detailType="Waist by length" detailValue={waistByLengthDisplay} />}
      {!!manufacturerSizeType && manufacturerSizeDiff && (
        <ProductInfoItem detailType="Manufacturer size" detailValue={sizeConversionDisplay} />
      )}
      {product.color && <ProductInfoItem detailType="Color" detailValue={product.color.name} />}
      {!!product.modelSize && !!product.modelHeight && (
        <ProductInfoItem detailType="Fit" detailValue={modelDetailValue} />
      )}
      {product.outerMaterials && (
        <ProductInfoItem detailType="Materials" detailValue={product.outerMaterials.join(", ")} />
      )}
      {product.brand && <ProductInfoItem detailType="Brand" detailValue={product.brand.name} />}
    </Box>
  )
}
