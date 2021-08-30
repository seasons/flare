import { ProductGridItem } from "@seasons/eclipse"
import { Box, Flex, Spacer } from "components"
import { ChevronIcon } from "components/Icons"
import { color, space } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import React, { useRef } from "react"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import styled from "styled-components"

export const ProductCarousel: React.FC<{
  products: any[]
  title?: string
  saveProductRefetchQueries: any[]
}> = ({ title, products, saveProductRefetchQueries = [] }) => {
  const { authState, toggleLoginModal } = useAuthContext()
  const snapList = useRef(null)
  const visibleElements = useVisibleElements({ debounce: 50, ref: snapList }, (elements) => {
    return elements
  }) as any[]
  const lastVisible = visibleElements[visibleElements?.length - 1]
  const firstVisible = visibleElements[0]
  const goToSnapItem = useScroll({ ref: snapList })

  const reachedEnd = lastVisible >= products.length

  return (
    <Box>
      <CarouselWrapper>
        {firstVisible !== 0 && (
          <LeftArrowWrapper
            justifyContent="flex-start"
            p={[2, 2]}
            onClick={() => {
              if (firstVisible > 0) {
                const previousIndex = firstVisible - 1
                goToSnapItem(previousIndex)
              }
            }}
          >
            <ChevronIcon color={color("black100")} rotateDeg="180deg" scale={2} />
          </LeftArrowWrapper>
        )}
        <SnapList direction="horizontal" width="100%" ref={snapList}>
          {products?.map((product, index) => {
            return (
              <SnapItem
                margin={{ left: index === 0 ? "0px" : space(1) + "px" }}
                snapAlign="center"
                key={index}
                width="384px"
              >
                <Box width="100%">
                  <ProductGridItem
                    product={product}
                    authState={authState}
                    onShowLoginModal={() => toggleLoginModal(true)}
                    saveProductButtonRefetchQueries={saveProductRefetchQueries}
                  />
                </Box>
              </SnapItem>
            )
          })}
        </SnapList>
        <RightArrowWrapper
          justifyContent="flex-end"
          p={[2, 2]}
          onClick={() => {
            const nextIndex = lastVisible + 1
            goToSnapItem(nextIndex)
          }}
        >
          <ChevronIcon color={reachedEnd ? color("black04") : color("black100")} scale={2} />
        </RightArrowWrapper>
      </CarouselWrapper>
      <Spacer mb={4} />
      <PagerWrapper>
        <Flex flexDirection="row" flexWrap="nowrap">
          {products?.map((_image, index) => {
            return (
              <Box
                key={index}
                style={{ display: "flex", flex: products.length }}
                onClick={() => {
                  goToSnapItem(index)
                }}
                py={2}
              >
                <Pager active={visibleElements.includes(index)} />
              </Box>
            )
          })}
        </Flex>
      </PagerWrapper>
    </Box>
  )
}

const RightArrowWrapper = styled(Flex)`
  width: 50px;
  height: calc(100% - 58px);
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  position: absolute;
  right: 0;
  z-index: 10;
`

const LeftArrowWrapper = styled(Flex)`
  width: 50px;
  height: calc(100% - 58px);
  position: absolute;
  left: 0;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  z-index: 10;
`

const PagerWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
`

const Pager = styled.div<{ active: boolean }>`
  height: 6px;
  width: 100%;
  background-color: ${(p) => (p.active ? color("black25") : color("black10"))};
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`
