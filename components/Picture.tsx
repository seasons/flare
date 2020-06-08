import React from "react"

export const Picture: React.FC<{
  webpSrc: string
  jpgSrc: string
  alt: string
  onLoad?: () => void
  imgRef?: any
}> = ({ webpSrc, jpgSrc, alt, imgRef, onLoad }) => {
  return (
    <picture>
      <source type="image/webp" srcSet={webpSrc} />
      <source type="image/jpeg" srcSet={jpgSrc} />
      <img src={jpgSrc} ref={imgRef} alt={alt} onLoad={onLoad} />
    </picture>
  )
}
