import styled from "styled-components"
import { Box } from "../Box"
import { imageResize, IMAGE_ASPECT_RATIO, ImageSize } from "../../utils/imageResize"
import React, { useState, useRef, useEffect } from "react"
import { color } from "../../helpers"

export interface ProgressiveImage {
  size: ImageSize
  imageUrl: string
  aspectRatio?: number
  alt: string
  hideBackground?: boolean
}

export const ProgressiveImage: React.FC<ProgressiveImage> = ({
  imageUrl,
  size,
  aspectRatio = IMAGE_ASPECT_RATIO,
  alt,
  hideBackground,
}) => {
  const [loaded, setLoaded] = useState(false)
  const fullImageRef = useRef(null)
  useEffect(() => {
    const image = fullImageRef.current
    if (image && image.complete && !loaded) {
      setLoaded(true)
    }
  }, [fullImageRef])

  const initialImage = imageResize(imageUrl, "initial")
  const fullImage = imageResize(imageUrl, size)

  return (
    <ImageWrapper aspectRatio={aspectRatio} hideBackground={hideBackground}>
      <FullImage
        src={fullImage}
        key={initialImage}
        alt={alt}
        ref={fullImageRef}
        loaded={loaded}
        onLoad={() => {
          setLoaded(true)
        }}
      />
      <InitialImage src={initialImage} alt={alt} />
    </ImageWrapper>
  )
}

const FullImage = styled.img<{ loaded: boolean }>`
  position: absolute;
  opacity: ${(p) => (p.loaded ? 1 : 0)};
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1;
  background-color: ${color("white100")};
`

const InitialImage = styled.img`
  filter: blur(8px);
  transform: scale(1);
  width: 100%;
`

const ImageWrapper = styled(Box)<{ aspectRatio: number; hideBackground: boolean }>`
  height: 0;
  padding-bottom: calc(100% * ${(p) => p.aspectRatio});
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: ${(p) => (p.hideBackground ? "transparent" : color("black04"))};
`
