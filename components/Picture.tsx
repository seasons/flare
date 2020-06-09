import React from "react"
import { color } from "../helpers"

export const Picture: React.FC<{
  src: string
  alt: string
  onLoad?: () => void
  imgRef?: any
}> = ({ src, alt, imgRef, onLoad }) => {
  const isProd = process.env.NODE_ENV === "production"
  let prefix
  if (src.includes("seasons-s3.imgix.net")) {
    prefix = ""
  } else if (isProd) {
    prefix = "https://flare-web.imgix.net"
  } else {
    prefix = "https://flare-web-staging.imgix.net"
  }
  return (
    <picture>
      <source type="image/webp" srcSet={prefix + src + "&fm=webp"} />
      <source type="image/jpeg" srcSet={prefix + src + "&fm=jpg"} />
      <img
        style={{ backgroundColor: color("black04") }}
        src={prefix + src + "&fm=jpg"}
        ref={imgRef}
        alt={alt}
        onLoad={onLoad}
      />
    </picture>
  )
}
