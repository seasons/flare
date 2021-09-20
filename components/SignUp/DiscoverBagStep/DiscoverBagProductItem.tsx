import { Flex, Picture, Sans, Spacer } from "components"
import { CheckCircledIcon } from "components/Icons"
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

  const handleClick = () => {
    added ? onRemoveProduct(variant) : onAddProduct(variant)
  }

  return (
    <Flex style={{ flex: 4 }} p="2px" flexDirection="column" key={imageSRC + index}>
      <ImageWrapper onClick={handleClick}>
        <Picture src={imageSRC} alt={image.alt} key={imageSRC} />
        {added && (
          <Overlay>
            <CheckCircledIcon backgroundColor={"transparent"} strokeWidth={2} width={50} height={50} />
          </Overlay>
        )}
      </ImageWrapper>
      <Spacer mb={1} />
      <Flex flexDirection="row" justifyContent="space-between">
        <Sans size="3">{product?.brand.name}</Sans>
        <Flex flexDirection="row" pr={2} onClick={handleClick}>
          <Sans size="3" underline pointer>
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

const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: ${color("black04")};
  height: 0;
  padding-bottom: calc(100% * 1.25);
  cursor: pointer;

  img {
    width: 100%;
  }
`
