import React from "react"
import { ImageProps } from "react-native"
import { imageResize, ImageSize } from "utils/imageResize"

export type ImagePropsWithoutSource = Omit<ImageProps, "source">

interface PictureProps extends ImagePropsWithoutSource {
  src: string
  imgRef?: any
  onLoad?: (event: any) => void
  alt?: string
  size?: ImageSize
}

export const Picture: React.FC<PictureProps> = ({ src, alt, imgRef, onLoad, size, style }) => {
  const url = !!size ? imageResize(src, size) : src

  return (
    <picture style={{ height: "100%" }}>
      <source type="image/webp" srcSet={url + "&fm=webp&cs=srgb"} />
      <source type="image/jpeg" srcSet={url + "&fm=jpg"} />
      <img src={url + "&fm=jpg"} ref={imgRef} alt={alt} onLoad={onLoad} />
    </picture>
  )
}
