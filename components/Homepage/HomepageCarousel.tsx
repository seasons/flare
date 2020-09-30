import React, { useRef, useState, useEffect } from "react"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import { Box } from "../Box"
import { space, color } from "../../helpers"
import styled from "styled-components"
import { Flex } from "../Flex"
import { Picture } from "../Picture"
import { imageResize } from "../../utils/imageResize"
import { ProgressiveImageProps } from "../Image/ProgressiveImage"

export const HomepageCarousel: React.FC<{ images: ProgressiveImageProps[]; maxWidth?: string }> = ({
  images,
  maxWidth,
}) => {
  const snapList = useRef(null)
  const [clientSide, setClientSide] = useState(false)
  const [imagesToUse, setImagesToUse] = useState([images?.[0]])
  const selected = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element)
  const goToSnapItem = useScroll({ ref: snapList })
  useEffect(() => {
    if (typeof window !== "undefined" && !clientSide) {
      setClientSide(true)
      setImagesToUse(images)
    }
  }, [])

  if (!images) {
    return null
  }

  return (
    <Flex flexDirection="row" style={{ position: "relative", maxWidth: maxWidth ? maxWidth : "auto" }}>
      <Wrapper>
        <SnapList direction="horizontal" width="calc(100% - 16px)" ref={snapList}>
          {imagesToUse?.map((image, index) => {
            const imageSRC = (!!image?.imageUrl && imageResize(image?.imageUrl, "large")) || ""
            return (
              <SnapItem width="100%" margin={{ right: space(1) + "px" }} snapAlign="center" key={image?.imageUrl}>
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
          <PagerAbsolute>
            <Flex flexDirection="column" justifyContent="flex-end" pl={1} width="100%">
              {images.map((_image, index) => {
                return (
                  <Box key={index} pt={0.5}>
                    <Pager active={selected === index} clientSide={clientSide} />
                  </Box>
                )
              })}
            </Flex>
          </PagerAbsolute>
        </PagerWrapper>
      </Wrapper>
    </Flex>
  )
}

const PagerWrapper = styled.div`
  position: relative;
  width: 100%;
  pointer-events: none;
  z-index: 4;
`

const PagerAbsolute = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`

const Wrapper = styled.div`
  position: relative;
`

const Pager = styled.div<{ active: boolean; clientSide: boolean }>`
  height: 8px;
  box-sizing: border-box;
  width: 8px;
  border: 1px solid ${color("black100")};
  background-color: ${(p) => (p.active ? color("black100") : "transparent")};
  opacity: ${(p) => (p.clientSide ? "1" : "0")};
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  img {
    width: 100%;
  }
`
