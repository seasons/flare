import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { imageResize } from "utils/imageResize"
import { Box, Button, Display, MaxWidth, Sans, Spacer, Flex, Media } from "components"
import { Separator } from "@seasons/eclipse"
import { ListCheck } from "components/SVGs/ListCheck"

const imageSRC = require("../../public/images/homepage/StylesBG.png")
const image = imageResize(imageSRC, "large")

const mobileImageSRC = require("../../public/images/homepage/StylesMobileBG.png")
const mobileImage = imageResize(mobileImageSRC, "medium")

export const WhyRent: React.FC = () => {
  const router = useRouter()

  const reasons = ["No commitment", "No buyers remose", "Discover new brands & styles", "Reduce your carbon footprint"]

  const Content: React.FC<{ platform: "desktop" | "mobile" }> = ({ platform }) => {
    const isMobile = platform === "mobile"

    return (
      <MaxWidth>
        <Box width="100%" px={[2, 2, 2, 2, 2]}>
          <BackgroundImage isMobile={isMobile}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              <Display size="8" color="white100" style={{ textAlign: "center" }}>
                Why rent?
              </Display>
              <Spacer mb={1} />
              <Sans size="4" color="white100" style={{ textAlign: "center", maxWidth: "400px" }}>
                Cras Etiam Mattis Sem Ipsum
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
            <Flex>
              <Separator color="white100" />
              {reasons.map((reason, index) => {
                return (
                  <Flex alignItems="center" flexDirection="row" key={index}>
                    <ListCheck />
                    <Spacer mr={1} />
                    <Sans>{reason}</Sans>
                  </Flex>
                )
              })}
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
