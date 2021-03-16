import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { imageResize } from "utils/imageResize"
import { Box, Button, Display, MaxWidth, Sans, Spacer, Flex, Media } from "components"

const imageSRC = require("../../public/images/homepage/StylesBG.png")
const image = imageResize(imageSRC, "large")

const mobileImageSRC = require("../../public/images/homepage/StylesMobileBG.png")
const mobileImage = imageResize(mobileImageSRC, "medium")

export const BrowseAllWithImage: React.FC = () => {
  const router = useRouter()

  const Content: React.FC<{ platform: "desktop" | "mobile" }> = ({ platform }) => {
    const isMobile = platform === "mobile"

    return (
      <MaxWidth>
        <Box width="100%" px={[2, 2, 2, 2, 2]}>
          <BackgroundImage isMobile={isMobile}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              <Display size="8" color="white100" style={{ textAlign: "center" }}>
                +1,000 styles in your pocket
              </Display>
              <Spacer mb={1} />
              <Sans size="4" color="white100" style={{ textAlign: "center", maxWidth: "400px" }}>
                Access hundreds of styles and discover new brands, all with zero commitment. Create an account and join
                today
              </Sans>
              <Spacer mb={2} />
              <Flex flexDirection="row" justifyContent="center">
                <Button
                  width={136}
                  variant="primaryWhiteNoBorder"
                  onClick={() => router.push("/browse/all+all?page=1")}
                >
                  Browse all
                </Button>
              </Flex>
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
  background: url(${(p) => (p.isMobile ? mobileImage : image)}) no-repeat center center;
  background-size: cover;
  height: 610px;
`
