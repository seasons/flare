import React from "react"
import { ImageProps } from "react-native"

const isProd = process.env.ENVIRONMENT === "production"

export type ImagePropsWithoutSource = Omit<ImageProps, "source">

interface PictureProps extends ImagePropsWithoutSource {
  src: string
  imgRef?: any
  onLoad?: (event: any) => void
  alt?: string
}

export const Picture: React.FC<PictureProps> = ({ src, alt, imgRef, onLoad }) => {
  let prefix
  if (src.includes("seasons-s3.imgix.net") || src.includes("seasons-s3-staging.imgix.net")) {
    prefix = ""
  } else if (isProd) {
    prefix = "https://flare-web.imgix.net"
  } else {
    prefix = "https://flare-web-staging.imgix.net"
  }

  return (
    <picture style={{ height: "100%" }}>
      <source type="image/webp" srcSet={prefix + src + "&fm=webp&cs=srgb"} />
      <source type="image/jpeg" srcSet={prefix + src + "&fm=jpg"} />
      <img src={prefix + src + "&fm=jpg"} ref={imgRef} alt={alt} onLoad={onLoad} />
    </picture>
  )
}
