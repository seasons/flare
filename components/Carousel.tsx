import React, { useRef } from "react"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import { imageResize } from "../utils/imageResize"
import { space, color } from "../helpers"
import { Box, Picture, Flex } from "./"
import styled from "styled-components"

export const Carousel: React.FC<{
  images: any[]
}> = ({ images }) => {
  const snapList = useRef(null)
  console.log("images", images)
  const selected = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element)
  const goToSnapItem = useScroll({ ref: snapList })
  return (
    <Box>
      <SnapList direction="horizontal" width="100%" ref={snapList}>
        {images?.map((image, index) => {
          const imageSRC = imageResize(image.url, "large")
          return (
            <SnapItem
              width="85%"
              margin={{ left: index === 0 ? space(2) + "px" : space(1) + "px" }}
              snapAlign="center"
              key={image?.url}
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
        <Box px={0.5}>
          <Flex flexDirection="row" flexWrap="nowrap" px={1} py={2}>
            {images?.map((_image, index) => {
              return (
                <Box key={index} px={0.5} style={{ display: "flex", flex: images.length }}>
                  <Pager active={selected === index} />
                </Box>
              )
            })}
          </Flex>
        </Box>
      </PagerWrapper>
    </Box>
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
