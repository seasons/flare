import { ProductGridItem } from "@seasons/eclipse"
import { Box, Display, Flex, Link, Spacer, Media } from "components"
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
  hideViewAll?: boolean
  disableTap?: boolean
  hidePrice?: boolean
  hideSaveButton?: boolean
  hideSizes?: boolean
}> = ({
  title,
  products,
  saveProductRefetchQueries = [],
  hideViewAll,
  disableTap,
  hidePrice,
  hideSaveButton,
  hideSizes,
}) => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <Content
          version="desktop"
          products={products}
          title={title}
          hideViewAll={hideViewAll}
          saveProductRefetchQueries={saveProductRefetchQueries}
          disableTap={disableTap}
          hidePrice={hidePrice}
          hideSaveButton={hideSaveButton}
          hideSizes={hideSizes}
        />
      </Media>
      <Media lessThan="md">
        <Content
          version="mobile"
          products={products}
          title={title}
          hideViewAll={hideViewAll}
          disableTap={disableTap}
          hidePrice={hidePrice}
          hideSaveButton={hideSaveButton}
          hideSizes={hideSizes}
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
  hideViewAll?: boolean
  disableTap?: boolean
  hidePrice?: boolean
  hideSizes?: boolean
  hideSaveButton?: boolean
}> = ({
  title,
  products,
  saveProductRefetchQueries = [],
  version,
  hideViewAll,
  disableTap,
  hidePrice,
  hideSaveButton,
  hideSizes,
}) => {
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
        <Flex flexDirection="row" justifyContent="space-between" width="100%" alignItems="center">
          <Display size={["7", "9"]}>{title}</Display>
          <Box>
            {!hideViewAll && (
              <Link href="/browse">
                <Display size={["7", "9"]} underline pointer>
                  See all
                </Display>
              </Link>
            )}
          </Box>
        </Flex>
      </MaxWidthWrapper>
      <Spacer mb={2} />
      <Flex width="100%" justifyContent="flex-start">
        <CarouselWrapper>
          {!isMobile && (
            <ArrowWrapper
              justifyContent="flex-start"
              p={2}
              style={{ left: "16px" }}
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
          <MaxWidthWrapper px={[2, 2, 2, 2, 2]}>
            <SnapList direction="horizontal" width="100%" ref={snapList}>
              {products?.map((product, index) => {
                return (
                  <SnapItem
                    margin={{ left: index === 0 ? "0px" : space(0.5) + "px" }}
                    snapAlign="center"
                    key={index}
                    width={isMobile ? "90%" : "450px"}
                  >
                    <Box width="100%" style={{ pointerEvents: disableTap ? "none" : "auto" }}>
                      <ProductGridItem
                        imageIndex={2}
                        product={product}
                        authState={authState}
                        onShowLoginModal={() => toggleLoginModal(true)}
                        saveProductButtonRefetchQueries={saveProductRefetchQueries}
                        hidePrice={hidePrice}
                        hideSaveButton={hideSaveButton}
                        hideSizes={hideSizes}
                      />
                    </Box>
                  </SnapItem>
                )
              })}
            </SnapList>
          </MaxWidthWrapper>
          {!isMobile && (
            <ArrowWrapper
              style={{ right: "16px" }}
              justifyContent="flex-end"
              p={2}
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
  height: 560px;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  z-index: 20;
  position: absolute;
`

const PagerWrapper = styled(Flex)`
  width: 100%;
  cursor: pointer;
`

const CarouselWrapper = styled(Flex)`
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => `${props.theme.grid.container.maxWidth.xl + 96}px`};
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
