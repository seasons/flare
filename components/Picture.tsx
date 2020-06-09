import React from "react"

const isProd = process.env.NODE_ENV === "production"

export const Picture: React.FC<{
  src: string
  alt: string
  onLoad?: () => void
  imgRef?: any
}> = ({ src, alt, imgRef, onLoad }) => {
  let prefix
  if (src.includes("seasons-s3.imgix.net") || src.includes("seasons-s3-staging.imgix.net")) {
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
      <img src={prefix + src + "&fm=jpg"} ref={imgRef} alt={alt} onLoad={onLoad} />
    </picture>
  )
}
