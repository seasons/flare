import { Flex, Sans, Picture, Spacer } from "components"
import { Spinner } from "components/Spinner"
import { color, space } from "helpers"
import React, { useState } from "react"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"
import { GET_DISCOVERY_BAG } from "./queries"

const Item = ({ bagItem, isDesktop, index, removeFromBag }) => {
  const [isRemoving, setIsRemoving] = useState(false)
  const variant = bagItem.productVariant
  const product = variant.product
  const image = product?.images?.[0]
  const imageSRC = imageResize(image?.url, "large")

  return (
    <BagItem
      isDesktop={isDesktop}
      key={variant.id}
      onClick={() => {
        setIsRemoving(true)
        removeFromBag({
          variables: {
            id: variant.id,
            saved: false,
          },
          awaitRefetchQueries: true,
          refetchQueries: [
            {
              query: GET_DISCOVERY_BAG,
            },
          ],
        })
      }}
    >
      {!isRemoving && (
        <Overlay className="overlay">
          <Sans size="8">-</Sans>
        </Overlay>
      )}

      {isRemoving && (
        <VisibleOverlay>
          {" "}
          <Spinner size="small" />
        </VisibleOverlay>
      )}

      <ImageWrapper>
        <Picture src={imageSRC} alt={image.alt} key={imageSRC} />
      </ImageWrapper>
    </BagItem>
  )
}

export const FooterElement: React.FC<{
  isDesktop: boolean
  isMutating: boolean
  bagItems: any[]
  plans: any[]
  removeFromBag: (any) => void
}> = ({ isDesktop, bagItems, plans, removeFromBag, isMutating }) => {
  let cost
  if (bagItems?.length > 0) {
    const plan = plans?.find((p) => p.itemCount === bagItems.length)
    const planPrice = plan?.price / 100
    cost = `$${planPrice}`
  } else {
    cost = "$0"
  }

  return (
    <Flex height="100%" flexDirection="row" alignItems="center">
      {bagItems?.map((bagItem, index) => {
        return (
          <Item
            bagItem={bagItem}
            isDesktop={isDesktop}
            index={index}
            removeFromBag={removeFromBag}
            key={bagItem.productVariant.id}
          />
        )
      })}
      {bagItems?.length < 3 && (
        <EmptyBagItem isDesktop={isDesktop}>
          {isMutating ? <Spinner size="small" /> : <Sans size="8">+</Sans>}
        </EmptyBagItem>
      )}
      <Spacer mr={1} />
      <Flex flexDirection="column" justifyContent="center">
        <Sans size="3">Your bag</Sans>
        <Sans size="3" color="black50">
          <span style={{ textDecoration: "underline", color: "black" }}>{cost}</span>
          {` ${isDesktop ? "per" : "/"} month`}
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

const VisibleOverlay = styled(Overlay)`
  display: block;
`

const BagItem = styled.div<{ isDesktop: boolean }>`
  position: relative;
  width: ${(p) => (p.isDesktop ? 40 : 36)}px;
  height: ${(p) => (p.isDesktop ? 50 : 45)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color("black04")};
  margin-right: ${(p) => (p.isDesktop ? space(1) : space(0.5))}px;

  &:hover {
    .overlay {
      display: flex;
    }
  }
`

const EmptyBagItem = styled.div<{ isDesktop: boolean }>`
  width: ${(p) => (p.isDesktop ? 40 : 36)}px;
  height: ${(p) => (p.isDesktop ? 50 : 45)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${color("black04")};
  margin-right: ${(p) => (p.isDesktop ? space(1) : space(0.5))}px;
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
