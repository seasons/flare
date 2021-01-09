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
  return (
    <picture style={{ height: "100%" }}>
      <source type="image/webp" srcSet={src + "&fm=webp&cs=srgb"} />
      <source type="image/jpeg" srcSet={src + "&fm=jpg"} />
      <img src={src + "&fm=jpg"} ref={imgRef} alt={alt} onLoad={onLoad} />
    </picture>
  )
}
