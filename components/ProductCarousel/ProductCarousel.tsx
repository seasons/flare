import { ProductGridItem } from "@seasons/eclipse"
import { Box, Display, Flex, Link, Spacer, Header } from "components"
import { ThinChevron } from "components/SVGs/ThinChevron"
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

  const reachedEnd = lastVisible >= products.length - 1

  return (
    <Box px={[2, 2, 2, 2, 2]}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Header size="9">{title}</Header>
        <Link href="/browse">
          <Header size="9" style={{ textDecoration: "underline" }}>
            See all
          </Header>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <CarouselWrapper>
        <ArrowWrapper
          justifyContent="flex-start"
          py={2}
          pr={3}
          onClick={() => {
            if (firstVisible > 0) {
              const previousIndex = firstVisible - 1
              goToSnapItem(previousIndex)
            }
          }}
        >
          <ThinChevron color={firstVisible !== 0 ? color("black100") : color("black10")} rotateDeg="180deg" />
        </ArrowWrapper>
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
                    imageIndex={2}
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
        <ArrowWrapper
          justifyContent="flex-end"
          py={2}
          pl={3}
          onClick={() => {
            const nextIndex = lastVisible + 1
            goToSnapItem(nextIndex)
          }}
        >
          <ThinChevron color={reachedEnd ? color("black10") : color("black100")} />
        </ArrowWrapper>
      </CarouselWrapper>
      <Spacer mb={4} />
      <PagerWrapper px={50}>
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

const ArrowWrapper = styled(Flex)`
  width: 50px;
  height: calc(100% - 58px);
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  z-index: 10;
  margin-top: 198px;
`

const PagerWrapper = styled(Box)`
  width: 100%;
  cursor: pointer;
`

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
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
