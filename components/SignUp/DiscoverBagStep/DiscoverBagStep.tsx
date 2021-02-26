import { Box, Flex, Media, Picture, Sans, Spacer } from "components"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import { useMutation, useQuery } from "@apollo/client"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import { imageResize } from "utils/imageResize"
import { chunk } from "lodash"
import { FormFooter } from "components/Forms/FormFooter"
import { color } from "helpers/color"
import { ChevronIcon } from "components/Icons"
import { GET_DISCOVERY_PRODUCT_VARIANTS } from "./queries"
import { ADD_TO_BAG, REMOVE_FROM_BAG } from "@seasons/eclipse"
import { FooterElement } from "./FooterElement"
import { emojiUnixToString } from "utils/emojiUnixToString"

const PAGE_LENGTH = 16

const Content = (
  platform: "desktop" | "mobile",
  data,
  addToBag,
  removeFromBag,
  isMutating,
  setIsMutating,
  fetchMore,
  setProductCount,
  productCount,
  loading
) => {
  const bagItems = data?.me?.bag
  const products = data?.products?.edges
  const isDesktop = platform === "desktop"
  const chunkCount = isDesktop ? 4 : 1
  const productsChunked = chunk(products, chunkCount)
  const location = data?.me?.customer?.detail?.shippingAddress
  const plans = data?.paymentPlans
  const snapList = useRef(null)
  const selected = useVisibleElements({ debounce: 50, ref: snapList }, (elements) => {
    return elements[0]
  })
  const goToSnapItem = useScroll({ ref: snapList })
  const temperature = location?.weather?.temperature
  const emoji = location?.weather?.emoji
  const emojiToString = emojiUnixToString(emoji)
  const city = location?.city
  const state = location?.state
  const aggregateCount = data?.productsCount?.aggregate?.count
  const reachedEnd = aggregateCount && Math.max(aggregateCount / chunkCount) <= productsChunked.length

  console.log("data", data)

  const onSecondaryButtonClick = () => {
    return null
  }

  const onAddProduct = (variant) => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    if (bagItems.length < 3) {
      addToBag({
        variables: {
          id: variant.id,
          productID: variant.product?.id,
          variantID: variant.id,
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
  }

  const onRemoveProduct = (variant) => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
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

  let locationText = ""
  if (!!city && !!state) {
    locationText = `Looks like you're in ${city}, ${state}`
  } else if (!!city) {
    locationText = `Looks like you're in ${city}`
  }
  let weatherText = ""
  if (!!temperature && !!emojiToString) {
    weatherText = `${temperature}° ${emojiToString}`
  } else if (!!temperature) {
    weatherText = `${temperature}°`
  }

  return (
    <>
      <Flex flexDirection="column" justifyContent="center" height="100%">
        <Flex flexDirection="column" width="100%" py={60}>
          <Flex flexDirection={isDesktop ? "row" : "column"} width="100%">
            <Box width="100%">
              <Spacer mb={isDesktop ? 0 : 10} />
              <Sans color="black100" size={["8", "10"]}>
                You're in.
              </Sans>
              <Flex flexDirection={isDesktop ? "row" : "column"} justifyContent="space-between" width="100%">
                <Flex flexDirection="column">
                  <Sans color="black100" size={["8", "10"]}>
                    Let's discover your first bag
                  </Sans>
                  <Sans size="4" color="black50">
                    Here are some recommendations from us. Add up to 3 before checking out.
                  </Sans>
                </Flex>
                <Flex flexDirection="column">
                  <Spacer mb={isDesktop ? 0 : 4} />
                  <Sans color="black100" size={["11", "10"]} style={{ textAlign: isDesktop ? "right" : "left" }}>
                    {weatherText}
                  </Sans>
                  <Sans size="4" color="black50" style={{ textAlign: isDesktop ? "right" : "left" }}>
                    {locationText}
                  </Sans>
                  <Spacer mb={isDesktop ? 0 : 2} />
                </Flex>
              </Flex>
            </Box>
          </Flex>
          <Spacer mb={isDesktop ? 6 : 0} />
          <CarouselWrapper>
            {isDesktop && (
              <ArrowWrapper
                justifyContent="flex-start"
                onClick={() => {
                  if (selected > 0) {
                    const nextIndex = selected - 1
                    goToSnapItem(nextIndex)
                  }
                }}
              >
                <ChevronIcon color={selected === 0 ? color("black04") : color("black100")} rotateDeg="180deg" />
              </ArrowWrapper>
            )}
            <SnapList direction="horizontal" width={isDesktop ? "calc(100% - 100px)" : "100%"} ref={snapList}>
              {productsChunked?.map((chunk, index) => {
                return (
                  <SnapItem snapAlign="center" key={index} width="100%" height="100%">
                    <Flex width="100%">
                      {chunk?.map((edge, index) => {
                        const variant = edge?.node
                        const product = variant?.product
                        const image = product?.images?.[0]
                        const imageSRC = imageResize(image?.url, "large")
                        const added = bagItems?.find((bi) => bi.productVariant.id === variant.id)
                        return (
                          <Flex style={{ flex: chunkCount }} p="2px" flexDirection="column" key={imageSRC + index}>
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
                                  console.log("li<Spacer mb={isDesktop ? 0 : 10} />")
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
                      })}
                    </Flex>
                  </SnapItem>
                )
              })}
            </SnapList>
            {isDesktop && (
              <ArrowWrapper
                justifyContent="flex-end"
                onClick={() => {
                  const nextIndex = selected + 1
                  goToSnapItem(nextIndex)

                  const shouldLoadMore =
                    !loading && !!aggregateCount && !reachedEnd && selected >= productsChunked.length - 2

                  if (shouldLoadMore) {
                    fetchMore({
                      variables: {
                        skip: products?.length,
                      },
                    }).then((fetchMoreResult: any) => {
                      setProductCount(products.length + fetchMoreResult?.data?.products?.edges?.length)
                    })
                  }
                }}
              >
                <ChevronIcon color={reachedEnd ? color("black04") : color("black100")} />
              </ArrowWrapper>
            )}
          </CarouselWrapper>
          <Spacer mb={isDesktop ? 0 : 6} />
        </Flex>
      </Flex>
      <FormFooter
        Element={() => (
          <FooterElement
            isDesktop={isDesktop}
            productCount={productCount}
            removeFromBag={removeFromBag}
            bagItems={bagItems}
            plans={plans}
          />
        )}
        disabled={false}
        buttonText="Checkout"
        secondaryButtonText={isDesktop ? "Continue later" : null}
        onSecondaryButtonClick={isDesktop ? onSecondaryButtonClick : null}
      />
    </>
  )
}

export const DiscoverBagStep: React.FC<{ onCompleted: () => void }> = ({ onCompleted }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [productCount, setProductCount] = useState(PAGE_LENGTH)
  const { previousData, data = previousData, fetchMore, loading } = useQuery(GET_DISCOVERY_PRODUCT_VARIANTS, {
    variables: {
      first: productCount,
      skip: 0,
      orderBy: "updatedAt_DESC",
    },
  })

  const [addToBag] = useMutation(ADD_TO_BAG, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      setIsMutating(false)
    },
  })
  const [removeFromBag] = useMutation(REMOVE_FROM_BAG, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      setIsMutating(false)
    },
  })

  return (
    <>
      <DesktopMedia greaterThanOrEqual="md">
        {Content(
          "desktop",
          data,
          addToBag,
          removeFromBag,
          isMutating,
          setIsMutating,
          fetchMore,
          setProductCount,
          productCount,
          loading
        )}
      </DesktopMedia>
      <MobileMedia lessThan="md">
        {Content(
          "mobile",
          data,
          addToBag,
          removeFromBag,
          isMutating,
          setIsMutating,
          fetchMore,
          setProductCount,
          productCount,
          loading
        )}
      </MobileMedia>
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

const DesktopMedia = styled(Media)`
  height: 100%;
  width: 100%;
  position: relative;
`

const MobileMedia = styled(Media)`
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
  background-color: ${color("black04")};
  height: 0;
  padding-bottom: calc(100% * 1.25);

  img {
    width: 100%;
  }
`
