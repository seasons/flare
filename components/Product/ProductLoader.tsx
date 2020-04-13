import ContentLoader from "react-content-loader"
import React from "react"
import styled from "styled-components"
import { Box } from "../Box"

const cardHeight = 462
const rows = 3

export const ProductTextLoader = () => {
  return (
    <ContentLoader width="100%" height="431px">
      <rect x={16} y={32} width="100" height={12} />
      <rect x={16} y={62} width="80" height={12} />
      <rect x={16} y={109} width="100%" height={10} />
      <rect x={16} y={132} width="100%" height={10} />
      <rect x={16} y={155} width="43%" height={10} />
      <rect x={16} y={197} width="100%" height={1} />
      <rect x={16} y={219} width="50" height={10} />
      <rect x={16} y={252} width="100%" height={1} />
      <rect x={16} y={275} width="50" height={10} />
      <rect x={16} y={309} width="100%" height={1} />
      <rect x={16} y={332} width="50" height={10} />
      <rect x={16} y={365} width="100%" height={1} />
      <rect x={16} y={387} width="50" height={10} />
      <rect x={16} y={422} width="100%" height={1} />
    </ContentLoader>
  )
}

export const ImageLoader = () => {
  return (
    <Box m={2} pb="125%" style={{ height: 0, overflow: "hidden" }}>
      <Container width="100%" height="710px">
        <rect x={0} y={0} width="100%" height="710px" />
      </Container>
    </Box>
  )
}

const Container = styled(ContentLoader)`
  height: ${cardHeight * rows}px;
  width: 100%;
`
