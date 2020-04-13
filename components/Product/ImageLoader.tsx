import ContentLoader from "react-content-loader"
import React from "react"
import styled from "styled-components"
import { Box } from "../Box"

const cardHeight = 462
const rows = 3

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
