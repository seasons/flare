import styled from "styled-components"
import { Box } from "../Box"
import { imageResize, IMAGE_ASPECT_RATIO, ImageSize } from "../../utils/imageResize"
import React, { useState, useRef, useEffect } from "react"
import { color } from "../../helpers"
import { Picture } from "../Picture"

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
  hideBackground = false,
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
      <FullImageWrapper loaded={loaded}>
        <Picture
          src={fullImage}
          key={fullImage}
          alt={alt}
          imgRef={fullImageRef}
          hideBackground={hideBackground}
          onLoad={() => {
            setLoaded(true)
          }}
        />
      </FullImageWrapper>
      <InitialImageWrapper>
        <Picture src={initialImage} alt={alt} hideBackground={hideBackground} />
      </InitialImageWrapper>
    </ImageWrapper>
  )
}

const FullImageWrapper = styled.div<{ loaded: boolean }>`
  position: absolute;
  opacity: ${(p) => (p.loaded ? 1 : 0)};
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1;
  background-color: ${color("white100")};
`

const InitialImageWrapper = styled.div`
  img {
    filter: blur(8px);
    transform: scale(1);
    width: 100%;
  }
`

const ImageWrapper = styled(Box)<{ aspectRatio: number; hideBackground: boolean }>`
  height: 0;
  padding-bottom: calc(100% * ${(p) => p.aspectRatio});
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
`
