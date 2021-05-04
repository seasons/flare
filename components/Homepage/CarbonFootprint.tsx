import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { imageResize } from "utils/imageResize"
import { Box, Display, MaxWidth, Sans, Spacer, Flex, Media } from "components"

const imageSRC = require("../../public/images/homepage/Forest.jpg")
const image = imageResize(imageSRC, "large")

export const CarbonFootprint: React.FC = () => {
  const Content: React.FC<{ platform: "desktop" | "mobile" }> = ({ platform }) => {
    const isMobile = platform === "mobile"

    return (
      <MaxWidth>
        <Box width="100%" px={[2, 2, 2, 2, 2]}>
          <BackgroundImage isMobile={isMobile}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" px={3}>
              <Display size={["7", "8"]} color="white100" style={{ textAlign: "center", maxWidth: "880px" }}>
                Every year, the fashion industry is responsible for more than 4% of all greenhouses gases produced.
              </Display>
              <Spacer mb={2} />
              <Sans size="4" color="white100" style={{ textAlign: "center", maxWidth: "480px" }}>
                By renting and increasing the number of times a garment is worn, we can help reduce it’s overall carbon
                footprint by 49% to 68%
              </Sans>
            </Flex>
          </BackgroundImage>
        </Box>
      </MaxWidth>
    )
  }

  return (
    <>
      <Media greaterThan="sm">
        <Content platform="desktop" />
      </Media>
      <Media lessThan="md">
        <Content platform="mobile" />
      </Media>
    </>
  )
}

const BackgroundImage = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: url(${image}) no-repeat center center;
  background-size: cover;
  height: 420px;
`
