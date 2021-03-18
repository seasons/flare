import { Box, Flex, Sans, Spacer } from "components"
import { FormFooter } from "components/Forms/FormFooter"
import { ChevronIcon } from "components/Icons"
import { color } from "helpers/color"
import { chunk } from "lodash"
import React, { useRef } from "react"
import { SnapItem, SnapList, useScroll, useVisibleElements } from "react-snaplist-carousel"
import styled from "styled-components"
import { emojiUnixToString } from "utils/emojiUnixToString"

import { DiscoverBagProductItem } from "./DiscoverBagProductItem"
import { FooterElement } from "./FooterElement"
import { GET_DISCOVERY_BAG } from "./queries"

interface Props {
  platform: "desktop" | "mobile"
  data: any
  bagData: any
  addToBag: (x: any) => void
  removeFromBag: (x: any) => void
  isMutating: boolean
  setIsMutating: (isMutating: boolean) => void
  fetchMore: any
  setProductCount: (count: number) => void
  productCount: number
  loading: boolean
  onCompleted: () => void
}

export const DiscoverBagContent: React.FC<Props> = ({
  platform,
  data,
  bagData,
  addToBag,
  removeFromBag,
  isMutating,
  setIsMutating,
  fetchMore,
  setProductCount,
  loading,
  onCompleted,
}) => {
  const bagItems = bagData?.me?.bag
  const products = data?.products?.edges
  const isDesktop = platform === "desktop"
  const chunkCount = isDesktop ? 4 : 1
  const productsChunked = chunk(products, chunkCount)
  const location = bagData?.me?.customer?.detail?.shippingAddress
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
      refetchQueries: () => [
        {
          query: GET_DISCOVERY_BAG,
        },
      ],
    })
  }

  const onAddProduct = (variant) => {
    if (isMutating) {
      return
    }
    if (bagItems.length < 3) {
      setIsMutating(true)
      addToBag({
        variables: {
          id: variant.id,
          productID: variant.product?.id,
          variantID: variant.id,
        },
      })
    }
  }

  return (
    <>
      <Flex flexDirection="column" justifyContent="center" height="100%">
        <Flex flexDirection="column" width="100%" py={60}>
          <Flex flexDirection={isDesktop ? "row" : "column"} width="100%" px={[2, 2, 2, 2, 2]}>
            <Box width="100%">
              <Spacer pb={isDesktop ? 0 : 170} />
              <Sans color="black100" size={["7", "9"]}>
                You're in.
              </Sans>
              <Flex flexDirection={isDesktop ? "row" : "column"} justifyContent="space-between" width="100%">
                <Flex flexDirection="column">
                  <Sans color="black100" size={["7", "9"]}>
                    Let's discover your first bag
                  </Sans>
                  <Spacer mt={2} />
                  <Sans size="4" color="black50">
                    Here are some recommendations from us in your size. Add up to 3 before checking out, or skip to do
                    later.
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
            <ArrowWrapper
              justifyContent="flex-start"
              p={[2, 2]}
              onClick={() => {
                if (selected > 0) {
                  const nextIndex = selected - 1
                  goToSnapItem(nextIndex)
                }
              }}
            >
              <ChevronIcon color={selected === 0 ? color("black04") : color("black100")} rotateDeg="180deg" />
            </ArrowWrapper>

            <SnapList direction="horizontal" width={isDesktop ? "calc(100% - 100px)" : "100%"} ref={snapList}>
              {!productsChunked?.length && (
                <Flex width="100%" height="100%">
                  {[...Array(4)]?.map((_, index) => {
                    return (
                      <Flex p="2px" style={{ flex: chunkCount }} key={index}>
                        <ImageWrapper />
                      </Flex>
                    )
                  })}
                </Flex>
              )}
              {productsChunked?.length > 0 &&
                productsChunked?.map((chunk, index) => {
                  return (
                    <SnapItem snapAlign="center" key={index} width="100%" height="100%">
                      <Flex width="100%">
                        {chunk?.map((edge, index) => (
                          <DiscoverBagProductItem
                            edge={edge}
                            index={index}
                            key={index}
                            onRemoveProduct={onRemoveProduct}
                            onAddProduct={onAddProduct}
                            bagItems={bagItems}
                          />
                        ))}
                      </Flex>
                    </SnapItem>
                  )
                })}
            </SnapList>

            <ArrowWrapper
              justifyContent="flex-end"
              p={[2, 2]}
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
          </CarouselWrapper>
          <Spacer mb={isDesktop ? 0 : 6} />
        </Flex>
      </Flex>
      <FormFooter
        Element={() => (
          <FooterElement
            isDesktop={isDesktop}
            removeFromBag={removeFromBag}
            bagItems={bagItems}
            plans={plans}
            isMutating={isMutating}
          />
        )}
        disabled={false}
        buttonText="Next"
        secondaryButtonText={isDesktop ? "Continue later" : null}
        onSecondaryButtonClick={isDesktop ? onCompleted : null}
        handleSubmit={() => {
          onCompleted?.()
        }}
      />
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
