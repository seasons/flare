import { Picture } from "components"
import React from "react"
import { ImageProps, ImageURISource } from "react-native"
import { imageResize, ImageResizerSize } from "utils/imageResize"

interface MobileImageProps extends ImageProps {
  source: ImageURISource
  size?: ImageResizerSize
}

export const Image: React.FC<MobileImageProps> = (props) => {
  const { ...rest } = props
  const src: string = imageResize(props?.source?.uri, props.size ? props.size : "small")
  return <Picture {...rest} src={src} />
}
