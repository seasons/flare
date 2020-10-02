import ContentLoader from "react-content-loader"
import React from "react"

export const DesignerTextSkeleton = () => {
  return (
    <ContentLoader width="100%" height="431px">
      <rect x={16} y={0} width="150" height={12} />
      <rect x={16} y={95} width="120" height={18} />
      <rect x={16} y={152} width="45" height={10} />
      <rect x={16} y={177} width="100%" height={10} />
      <rect x={16} y={200} width="100%" height={10} />
      <rect x={16} y={223} width="100%" height={10} />
      <rect x={16} y={246} width="100%" height={10} />
      <rect x={16} y={312} width="100%" height={1} />
      <rect x={16} y={338} width="55" height={10} />
      <rect x="calc(100% - 80px)" y={338} width="80" height={10} />
      <rect x={16} y={370} width="100%" height={1} />
      <rect x={16} y={394} width="50" height={10} />
      <rect x="calc(100% - 67px)" y={394} width="67" height={10} />
      <rect x={16} y={426} width="100%" height={1} />
    </ContentLoader>
  )
}
