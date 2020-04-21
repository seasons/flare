import qs from "querystring"

interface ImageResizerOptions {
  fit?: "clip"
  w?: number
  h?: number
}

const IMGIX_BASE = "https://seasons-nyc.imgix.net/"
const AIRTABLE_BASE = "https://dl.airtable.com/.attachments/"

export const IMAGE_ASPECT_RATIO = 1.25

export const sizes = {
  small: {
    w: 200,
    fit: "clip",
  },
  medium: {
    w: 250,
    fit: "clip",
  },
  large: {
    w: 290,
    fit: "clip",
  },
  "x-large": {
    w: 640,
    fit: "clip",
  },
}

type ImageResizerSize = keyof typeof sizes

export const imageResize = (
  url: string,
  sizeName: ImageResizerSize,
  options: ImageResizerOptions = { fit: "clip" }
) => {
  const newURL = url.replace(AIRTABLE_BASE, IMGIX_BASE)

  let params: any = {
    ...options,
    ...sizes[sizeName],
  }

  return newURL + "?" + qs.stringify(params)
}
