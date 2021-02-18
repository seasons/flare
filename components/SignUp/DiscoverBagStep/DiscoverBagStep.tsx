import { Box, Flex, MaxWidth, Media, Picture, Sans, Spacer } from "components"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import { imageResize } from "utils/imageResize"
import { space } from "helpers/space"
import { chunk } from "lodash"

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

const PAGE_LENGTH = 5

export const DiscoverBagStep: React.FC<{ onCompleted: () => void }> = ({ onCompleted }) => {
  const snapList = useRef(null)
  const selected = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element)
  const goToSnapItem = useScroll({ ref: snapList })
  const { previousData, data = previousData } = useQuery(GET_DISCOVERY_PRODUCT_VARIANTS, {
    variables: {
      first: PAGE_LENGTH,
      skip: 0,
      orderBy: "updatedAt_DESC",
    },
  })

  const products = data?.products?.edges
  const productsChunked = chunk(products, 4)

  const Content = (platform: "desktop" | "mobile") => {
    const isDesktop = platform === "desktop"

    return (
      <Flex pt={60}>
        <Flex flexDirection="column" style={{ flex: 1 }} pt={100} width="100%">
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
          <Spacer mb={isDesktop ? 4 : 0} />{" "}
          <CarouselWrapper>
            <SnapList direction="horizontal" width="100%" ref={snapList}>
              {productsChunked?.map((chunk, index) => {
                return (
                  <SnapItem
                    margin={{ left: index === 0 ? "0px" : space(1) + "px" }}
                    snapAlign="center"
                    key={index}
                    width="100%"
                  >
                    <Flex width="100%">
                      {chunk?.map((edge, index) => {
                        const variant = edge?.node
                        const product = variant?.product
                        console.log("product", product)
                        const image = product?.images?.[0]
                        const imageSRC = imageResize(image?.url, "large")
                        return (
                          <Flex
                            style={{ flex: 4 }}
                            p="2px"
                            onClick={() => goToSnapItem(index === products.length - 1 ? 0 : index + 1)}
                            flexDirection="column"
                          >
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
          </CarouselWrapper>
        </Flex>
      </Flex>
    )
  }

  return (
    <>
      <DesktopMedia greaterThanOrEqual="md">{Content("desktop")}</DesktopMedia>
      <Media lessThan="md">{Content("mobile")}</Media>
    </>
  )
}

const DesktopMedia = styled(Media)`
  height: 100%;
  width: 100%;
`

const CarouselWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`
const ImageWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`
