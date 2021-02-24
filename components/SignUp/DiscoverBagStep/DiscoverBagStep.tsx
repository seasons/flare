import { Box, Flex, MaxWidth, Media, Picture, Sans, Spacer } from "components"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import { imageResize } from "utils/imageResize"
import { space } from "helpers/space"
import { chunk } from "lodash"
import { FormFooter } from "components/Forms/FormFooter"
import { color } from "helpers/color"
import { ChevronIcon } from "components/Icons"

export const GET_DISCOVERY_PRODUCT_VARIANTS = gql`
  query AvailableProductVariantsConnectionForCustomer(
    $first: Int!
    $skip: Int!
    $orderBy: ProductVariantOrderByInput!
  ) {
    productsCount: availableProductVariantsConnectionForCustomer {
      aggregate {
        count
      }
    }
    products: availableProductVariantsConnectionForCustomer(skip: $skip, first: $first, orderBy: $orderBy) {
      edges {
        node {
          id
          isSaved
          displayShort
          product {
            id
            slug
            name
            brand {
              id
              slug
              name
            }
            images(size: Small) {
              id
              url
            }
          }
        }
      }
    }
  }
`

const PAGE_LENGTH = 24

const Content = (platform: "desktop" | "mobile", productsChunked) => {
  const snapList = useRef(null)
  const isDesktop = platform === "desktop"
  const selected = useVisibleElements({ debounce: 50, ref: snapList }, (elements) => {
    // console.log("eles", elements)
    // if (elements.length > 1) {
    //   return elements[1]
    // } else {
    return elements[0]
    // }
  })
  const goToSnapItem = useScroll({ ref: snapList })
  console.log("selected", selected)

  const onSecondaryButtonClick = () => {
    return null
  }

  const FooterElement = () => {
    return (
      <Flex height="100%" flexDirection="row" alignItems="center">
        <EmptyBagItem />
        <Spacer mr={2} />
        <Flex flexDirection="column" justifyContent="center">
          <Sans size="3">Your bag</Sans>
          <Sans size="3" color="black50">
            0$ per month
          </Sans>
        </Flex>
      </Flex>
    )
  }

  return (
    <>
      <Flex pt={60}>
        <Flex flexDirection="column" pt={100} width="100%">
          <Flex flexDirection="row" width="100%">
            <Box mx={isDesktop ? 0 : 2}>
              <Sans color="black100" size={["6", "10"]}>
                You're in.
              </Sans>
              <Sans color="black100" size={["6", "10"]}>
                Let's discover your first bag
              </Sans>
              <Sans size="4" color="black50">
                Here are some recommendations from us. Add up to 3 before checking out.
              </Sans>
            </Box>
          </Flex>
          <Spacer mb={isDesktop ? 4 : 0} />
          <CarouselWrapper>
            <ArrowWrapper
              justifyContent="flex-start"
              onClick={() => {
                if (selected > 0) {
                  console.log("selected", selected)
                  const nextIndex = selected - 1
                  goToSnapItem(nextIndex)
                }
              }}
            >
              <ChevronIcon color={color("black100")} rotateDeg="180deg" />
            </ArrowWrapper>
            <SnapList direction="horizontal" width="calc(100% - 100px)" ref={snapList}>
              {productsChunked?.map((chunk, index) => {
                return (
                  <SnapItem snapAlign="center" key={index} width="100%" height="100%">
                    <Flex width="100%">
                      {chunk?.map((edge, index) => {
                        const variant = edge?.node
                        const product = variant?.product
                        //   console.log("product", product)
                        const image = product?.images?.[0]
                        const imageSRC = imageResize(image?.url, "large")
                        return (
                          <Flex style={{ flex: 4 }} p="2px" flexDirection="column" key={imageSRC + index}>
                            <ImageWrapper>
                              <Picture src={imageSRC} alt={image.alt} key={imageSRC} />
                            </ImageWrapper>
                            <Spacer mb={1} />
                            <Flex flexDirection="row" justifyContent="space-between">
                              <Sans size="3" style={{ textDecoration: "underline" }}>
                                {product?.brand.name}
                              </Sans>
                              <Flex flexDirection="row" pr={2}>
                                <Sans size="3" style={{ textDecoration: "underline" }}>
                                  Added
                                </Sans>
                              </Flex>
                            </Flex>
                            <Sans size="3" color="black50" style={{ textDecoration: "underline" }}>
                              {variant?.displayShort}
                            </Sans>
                          </Flex>
                        )
                      })}
                    </Flex>
                  </SnapItem>
                )
              })}
            </SnapList>
            <ArrowWrapper
              justifyContent="flex-end"
              onClick={() => {
                const nextIndex = selected + 1
                goToSnapItem(nextIndex)
              }}
            >
              <ChevronIcon color={color("black100")} />
            </ArrowWrapper>
          </CarouselWrapper>
        </Flex>
      </Flex>
      <FormFooter
        Element={FooterElement}
        disabled={false}
        buttonText="Checkout"
        secondaryButtonText="Continue later"
        onSecondaryButtonClick={onSecondaryButtonClick}
      />
    </>
  )
}

export const DiscoverBagStep: React.FC<{ onCompleted: () => void }> = ({ onCompleted }) => {
  const { previousData, data = previousData } = useQuery(GET_DISCOVERY_PRODUCT_VARIANTS, {
    variables: {
      first: PAGE_LENGTH,
      skip: 0,
      orderBy: "updatedAt_DESC",
    },
  })

  const products = data?.products?.edges
  const productsChunked = chunk(products, 4)

  return (
    <>
      <DesktopMedia greaterThanOrEqual="md">{Content("desktop", productsChunked)}</DesktopMedia>
      <Media lessThan="md">{Content("mobile", productsChunked)}</Media>
    </>
  )
}

const ArrowWrapper = styled(Flex)`
  width: 50px;
  height: 100%;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`

const EmptyBagItem = styled.div`
  width: 40px;
  height: 50px;
  background-color: ${color("black10")};
`

const DesktopMedia = styled(Media)`
  height: 100%;
  width: 100%;
  position: relative;
`

const CarouselWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;
`
const ImageWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`
