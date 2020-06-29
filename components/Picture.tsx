import React from "react"
import styled from "styled-components"
import { color } from "../helpers"

const isProd = process.env.ENVIRONMENT === "production"

export const Picture: React.FC<{
  src: string
  alt: string
  onLoad?: () => void
  imgRef?: any
  hideBackground?: boolean
}> = ({ src, alt, imgRef, onLoad, hideBackground }) => {
  let prefix
  if (src.includes("seasons-s3.imgix.net") || src.includes("seasons-s3-staging.imgix.net")) {
    prefix = ""
  } else if (isProd) {
    prefix = "https://flare-web.imgix.net"
  } else {
    prefix = "https://flare-web-staging.imgix.net"
  }

  return (
    <ImageWrapper hideBackground={hideBackground}>
      <picture>
        <source type="image/webp" srcSet={prefix + src + "&fm=webp"} />
        <source type="image/jpeg" srcSet={prefix + src + "&fm=jpg"} />
        <img src={prefix + src + "&fm=jpg"} ref={imgRef} alt={alt} onLoad={onLoad} />
      </picture>
    </ImageWrapper>
  )
}

const ImageWrapper = styled("div")<{ hideBackground?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${(p) => (p.hideBackground ? "transparent" : color("black04"))};
`
