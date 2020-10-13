import ContentLoader from "react-content-loader"
import React from "react"
import { Spacer } from "../Spacer"

export const DesignerTextSkeleton = () => {
  return (
    <>
      <ContentLoader width="100%" height="12px">
        <rect x={16} y={0} width="150" height={12} />
      </ContentLoader>
      <Spacer mb={2} />
      <ContentLoader width="100%" height="480px">
        <rect x={16} y={116} width="120" height={24} />
        <rect x={16} y={178} width="45" height={10} />
        <rect x={16} y={206} width="100%" height={10} />
        <rect x={16} y={234} width="100%" height={10} />
        <rect x={16} y={263} width="100%" height={10} />
        <rect x={16} y={292} width="100%" height={10} />
        <rect x={16} y={358} width="100%" height={1} />
        <rect x={16} y={383} width="55" height={10} />
        <rect x="calc(100% - 80px)" y={383} width="80" height={10} />
        <rect x={16} y={420} width="100%" height={1} />
        <rect x={16} y={444} width="50" height={10} />
        <rect x="calc(100% - 67px)" y={444} width="67" height={10} />
        <rect x={16} y={478} width="100%" height={1} />
      </ContentLoader>
    </>
  )
}
