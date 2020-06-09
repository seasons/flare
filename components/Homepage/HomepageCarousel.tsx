import React, { useRef } from "react"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import { ProgressiveImage } from "../Image"
import { Box } from "../Box"
import { space, color } from "../../helpers"
import styled from "styled-components"
import { Flex } from "../Flex"
import { Picture } from "../Picture"
import { imageResize } from "../../utils/imageResize"

export const HomepageCarousel: React.FC<{ images: ProgressiveImage[] }> = ({ images }) => {
  const snapList = useRef(null)

  const selected = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element)
  const goToSnapItem = useScroll({ ref: snapList })

  return (
    <Wrapper>
      <SnapList direction="horizontal" width="100%" ref={snapList}>
        {images.map((image, index) => {
          const imageSRC = imageResize(image.imageUrl, "large")
          return (
            <SnapItem
              width="100%"
              margin={{ left: space(1) + "px", right: space(1) + "px" }}
              snapAlign="center"
              key={image.imageUrl}
            >
              <Box onClick={() => goToSnapItem(index === images.length - 1 ? 0 : index + 1)}>
                <ImageWrapper>
                  <Picture src={imageSRC} alt={image.alt} />
                </ImageWrapper>
              </Box>
            </SnapItem>
          )
        })}
      </SnapList>
      <PagerWrapper>
        <Flex flexDirection="row" flexWrap="nowrap" p={1} py={2}>
          {images.map((_image, index) => {
            return (
              <Box key={index} px={1} style={{ display: "flex", flex: images.length }}>
                <Pager active={selected === index} />
              </Box>
            )
          })}
        </Flex>
      </PagerWrapper>
    </Wrapper>
  )
}

const PagerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const Pager = styled.div<{ active: boolean }>`
  height: 2px;
  width: 100%;
  background-color: ${(p) => (p.active ? color("black100") : color("black10"))};
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
  }
`
