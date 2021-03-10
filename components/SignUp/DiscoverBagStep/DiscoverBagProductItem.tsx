import { Flex, Picture, Sans, Spacer } from "components"
import { color } from "helpers/color"
import React from "react"
import styled from "styled-components"

import { imageResize } from "utils/imageResize"

export const DiscoverBagProductItem = ({ edge, index, onRemoveProduct, onAddProduct, bagItems }) => {
  const variant = edge?.node
  const product = variant?.product
  const image = product?.images?.[0]
  const imageSRC = imageResize(image?.url, "large")
  const added = bagItems?.find((bi) => bi.productVariant.id === variant.id)

  return (
    <Flex style={{ flex: 4 }} p="2px" flexDirection="column" key={imageSRC + index}>
      <ImageWrapper>
        <Picture src={imageSRC} alt={image.alt} key={imageSRC} />
      </ImageWrapper>
      <Spacer mb={1} />
      <Flex flexDirection="row" justifyContent="space-between">
        <Sans size="3">{product?.brand.name}</Sans>
        <Flex
          flexDirection="row"
          pr={2}
          onClick={() => {
            added ? onRemoveProduct(variant) : onAddProduct(variant)
          }}
        >
          <Sans size="3" style={{ textDecoration: "underline", cursor: "pointer" }}>
            {added ? "Added" : "Add"}
          </Sans>
        </Flex>
      </Flex>
      <Sans size="3" color="black50">
        {variant?.displayShort}
      </Sans>
    </Flex>
  )
}

const ImageWrapper = styled.div`
  width: 100%;
  background-color: ${color("black04")};
  height: 0;
  padding-bottom: calc(100% * 1.25);

  img {
    width: 100%;
  }
`
