import { Flex, Sans, Picture, Spacer } from "components"
import { color, space } from "helpers"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"
import { GET_DISCOVERY_PRODUCT_VARIANTS } from "./queries"

export const FooterElement: React.FC<{
  isDesktop: boolean
  productCount: number
  bagItems: any[]
  plans: any[]
  removeFromBag: (any) => void
}> = ({ isDesktop, bagItems, plans, removeFromBag, productCount }) => {
  let cost
  if (bagItems?.length > 0) {
    const plan = plans.find((p) => p.itemCount === bagItems.length)
    const planPrice = plan?.price / 100
    cost = `$${planPrice}`
  } else {
    cost = "$0"
  }

  return (
    <Flex height="100%" flexDirection="row" alignItems="center">
      {bagItems?.map((bagItem, index) => {
        const variant = bagItem.productVariant
        const product = variant.product
        const image = product?.images?.[0]
        const imageSRC = imageResize(image?.url, "large")

        return (
          <BagItem
            key={index}
            onClick={() =>
              removeFromBag({
                variables: {
                  id: variant.id,
                  saved: false,
                },
                awaitRefetchQueries: true,
                refetchQueries: [
                  {
                    query: GET_DISCOVERY_PRODUCT_VARIANTS,
                    variables: {
                      first: productCount,
                      skip: 0,
                      orderBy: "updatedAt_DESC",
                    },
                  },
                ],
              })
            }
          >
            <Overlay className="overlay">
              <Sans size="8">-</Sans>
            </Overlay>

            <ImageWrapper>
              <Picture src={imageSRC} alt={image.alt} key={imageSRC} />
            </ImageWrapper>
          </BagItem>
        )
      })}
      {bagItems?.length < 3 && (
        <EmptyBagItem>
          <Sans size="8">+</Sans>
        </EmptyBagItem>
      )}
      <Spacer mr={1} />
      <Flex flexDirection="column" justifyContent="center">
        <Sans size="3">Your bag</Sans>
        <Sans size="3" color="black50">
          <span style={{ textDecoration: "underline", color: "black" }}>{cost}</span> per month
        </Sans>
      </Flex>
    </Flex>
  )
}

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  align-items: center;
  justify-content: center;
  display: none;
  cursor: pointer;
`

const BagItem = styled.div`
  position: relative;
  width: 40px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color("black04")};
  margin-right: ${space(1)}px;

  &:hover {
    .overlay {
      display: flex;
    }
  }
`

const EmptyBagItem = styled.div`
  width: 40px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color("black04")};
  margin-right: ${space(1)}px;
`

const ImageWrapper = styled.div`
  width: 100%;
  background-color: ${color("black04")};
  height: 0;
  padding-bottom: calc(100% * 1.25);

  img {
    width: 100%;
  }
`
