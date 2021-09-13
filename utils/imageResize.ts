import qs from "querystring"
import { identity, pickBy } from "lodash"

export type ImageSize = "initial" | "thumb" | "small" | "medium" | "large" | "xlarge" | "hero"
type ImageFormat = "webp" | "jpg" | "png" | "gif" | "mp4"

interface ImageResizerOptions {
  fit?: "clip"
  w?: number
  h?: number
  retina?: boolean
  fm?: ImageFormat
}

interface ImageSizeOptions {
  w?: number
  h?: number
  fit?: "clip"
}

type ImageSizeMap = {
  [key in ImageSize]: ImageSizeOptions
}

export const IMAGE_ASPECT_RATIO = 1.25

export const sizes: ImageSizeMap = {
  initial: {
    w: 30,
    fit: "clip",
  },
  thumb: {
    w: 208,
    fit: "clip",
  },
  small: {
    w: 288,
    fit: "clip",
  },
  medium: {
    w: 372,
    fit: "clip",
  },
  large: {
    w: 560,
    fit: "clip",
  },
  xlarge: {
    w: 702,
    fit: "clip",
  },
  hero: {
    w: 2000,
    fit: "clip",
  },
}

export type ImageResizerSize = keyof typeof sizes

export const imageResize = (
  url: string,
  sizeName: ImageResizerSize,
  passedOptions: ImageResizerOptions = { fit: "clip" }
) => {
  if (!url) {
    return ""
  }
  const removedParams = url?.toString()?.split("?")[0]
  const options: ImageResizerOptions = pickBy(
    {
      fit: "clip",
      retina: true,
      ...passedOptions,
    },
    identity
  )

  let params: any
  const { retina, ...remainingOptions } = options
  if (sizeName) {
    const size = sizes[sizeName]
    params = pickBy(
      {
        ...sizes[sizeName],
        ...(options.retina && size.w ? { w: size.w * 2 } : {}),
        ...(options.retina && size.h ? { h: size.h * 2 } : {}),
        ...remainingOptions,
      },
      identity
    )
  } else {
    params = remainingOptions
  }

  if (/seasons-images\./.test(url)) {
    return removedParams.replace(`seasons-images.s3.amazonaws.com`, `seasons-s3.imgix.net`) + "?" + qs.stringify(params)
  }

  return (
    removedParams.replace(`seasons-images-staging.s3.amazonaws.com`, `seasons-s3-staging.imgix.net`) +
    "?" +
    qs.stringify(params)
  )
}
