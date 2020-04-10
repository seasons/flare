import ContentLoader from "react-content-loader"
import React from "react"
import styled from "styled-components"

const imageHeight = 362
const cardWidth = 290
const cardHeight = 462

export const BrowseLoader = () => {
  const renderCard = ({ x, y }) => (
    <>
      <rect x={x} y={y} width={cardWidth} height={imageHeight} />
      <rect x={x} y={y + imageHeight + 8} width="80" height={12} />
      <rect x={x} y={y + imageHeight + 26} width="110" height={12} />
      <rect x={x} y={y + imageHeight + 50} width="60" height={12} />
    </>
  )

  return (
    <Container width="100%">
      {[...Array(2)].map((_, index) => {
        const yTopPosition = index * cardHeight
        return (
          <React.Fragment key={index}>
            {renderCard({ x: 0, y: yTopPosition })}
            {renderCard({ x: cardWidth + 8, y: yTopPosition })}
            {renderCard({ x: cardWidth * 2 + 16, y: yTopPosition })}
          </React.Fragment>
        )
      })}
    </Container>
  )
}

const Container = styled(ContentLoader)`
  height: ${cardHeight * 2}px;
  width: 100%;
`
