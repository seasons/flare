import { ProductGridItem } from "@seasons/eclipse"
import { Box, Display, Flex, Link, Spacer, Header, MaxWidth, Media } from "components"
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
  return (
    <>
      <Media greaterThanOrEqual="md">
        <Content
          version="desktop"
          products={products}
          title={title}
          saveProductRefetchQueries={saveProductRefetchQueries}
        />
      </Media>
      <Media lessThan="md">
        <Content
          version="mobile"
          products={products}
          title={title}
          saveProductRefetchQueries={saveProductRefetchQueries}
        />
      </Media>
    </>
  )
}

const Content: React.FC<{
  products: any[]
  title?: string
  saveProductRefetchQueries: any[]
  version: "mobile" | "desktop"
}> = ({ title, products, saveProductRefetchQueries = [], version }) => {
  const { authState, toggleLoginModal } = useAuthContext()
  const snapList = useRef(null)
  const isMobile = version === "mobile"
  const visibleElements = useVisibleElements({ debounce: 50, ref: snapList }, (elements) => {
    return elements
  }) as any[]
  const lastVisible = visibleElements[visibleElements?.length - 1]
  const firstVisible = visibleElements[0]
  const goToSnapItem = useScroll({ ref: snapList })

  const reachedEnd = lastVisible >= products.length - 1

  return (
    <Box style={{ marge: "0 auto" }}>
      <MaxWidthWrapper px={[2, 2, 2, 2, 2]}>
        <Flex flexDirection="row" justifyContent="space-between" width="100%">
          <Header size={["7", "9"]}>{title}</Header>
          <Link href="/browse">
            <Header size={["7", "9"]} style={{ textDecoration: "underline" }}>
              See all
            </Header>
          </Link>
        </Flex>
      </MaxWidthWrapper>
      <Spacer mb={2} />
      <Flex width="100%" justifyContent="flex-start">
        <CarouselWrapper px={[2, 2, 2, 2, 2]}>
          {!isMobile && (
            <ArrowWrapper
              justifyContent="flex-start"
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
          )}
          <SnapList direction="horizontal" width="100%" ref={snapList}>
            {products?.map((product, index) => {
              return (
                <SnapItem
                  margin={{ left: index === 0 ? "0px" : space(1) + "px" }}
                  snapAlign="center"
                  key={index}
                  width={isMobile ? "90%" : "384px"}
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
          {!isMobile && (
            <ArrowWrapper
              justifyContent="flex-end"
              pl={3}
              onClick={() => {
                const nextIndex = lastVisible + 1
                goToSnapItem(nextIndex)
              }}
            >
              <ThinChevron color={reachedEnd ? color("black10") : color("black100")} />
            </ArrowWrapper>
          )}
        </CarouselWrapper>
      </Flex>
      <Spacer mb={4} />
      <MaxWidthWrapper px={[2, 2, 2, 2, 2]}>
        <PagerWrapper flexDirection="row" flexWrap="nowrap">
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
        </PagerWrapper>
      </MaxWidthWrapper>
    </Box>
  )
}

const MaxWidthWrapper = styled(Flex)`
  max-width: ${(props) => `${props.theme.grid.container.maxWidth.xl}px`};
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`

const ArrowWrapper = styled(Flex)`
  width: 50px;
  height: 475px;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  z-index: 10;
`

const PagerWrapper = styled(Flex)`
  width: 100%;
  cursor: pointer;
`

const CarouselWrapper = styled(Flex)`
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => `${props.theme.grid.container.maxWidth.xl + 100}px`};
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
`

const Pager = styled.div<{ active: boolean }>`
  height: 6px;
  width: 100%;
  background-color: ${(p) => (p.active ? color("black25") : color("black10"))};
`
