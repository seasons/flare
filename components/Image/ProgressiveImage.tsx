import styled from "styled-components"
import { Box } from "../Box"
import { imageResize, IMAGE_ASPECT_RATIO, ImageSize } from "../../utils/imageResize"
import React, { useState, useRef, useEffect } from "react"
import { color } from "../../helpers"

interface Props {
  size: ImageSize
  image: { url: string; id?: string }
}

export const ProgressiveImage: React.FC<Props> = ({ image, size }) => {
  const [loaded, setLoaded] = useState(false)
  const fullImageRef = useRef(null)
  useEffect(() => {
    const image = fullImageRef.current
    if (image && image.complete && !loaded) {
      setLoaded(true)
    }
  }, [fullImageRef])

  const initialImage = imageResize(image.url, "initial")
  const fullImage = imageResize(image.url, size)

  return (
    <ImageWrapper>
      <FullImage
        src={fullImage}
        key={initialImage}
        alt="image of the product"
        ref={fullImageRef}
        loaded={loaded}
        onLoad={() => {
          setLoaded(true)
        }}
      />
      <InitialImage src={initialImage} alt="image of the product" />
    </ImageWrapper>
  )
}

const FullImage = styled.img<{ loaded: boolean }>`
  position: absolute;
  opacity: ${(p) => (p.loaded ? 1 : 0)};
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 1s linear;
  z-index: 1;
`

const InitialImage = styled.img`
  filter: blur(8px);
  transform: scale(1);
  width: 100%;
`

const ImageWrapper = styled(Box)`
  height: 0;
  padding-bottom: calc(100% * ${IMAGE_ASPECT_RATIO});
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: ${color("black04")};
`
