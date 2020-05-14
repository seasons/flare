import React from "react"
import { Box, Sans, Spacer, Flex } from "../"
import { TextList } from "./TextList"
import styled from "styled-components"
import { Media } from "../Responsive"
import { Separator } from "../Separator"
import { HomepageCarousel } from "./HomepageCarousel"
import { ProgressiveImage } from "../Image"

const title = "The app"
const subtitle = "After receiving an invite, you’ll get a link to download the Seasons app."

const imageImport1 = require("../../public/images/homepage/App-Image-1.png")
const imageImport2 = require("../../public/images/homepage/App-Image-2.png")
const imageImport3 = require("../../public/images/homepage/App-Image-3.png")

const textItems = [
  {
    title: "Browse",
    text:
      "See featured designers, sort by category or filter by size. See something you like? Save it in your queue for later.",
  },
  {
    title: "Reserve",
    text: "Choose your 3 pieces and place your reservation. We pack, ship and deliver within 1 to 2 business days.",
  },
  {
    title: "Manage",
    text: "Update your personal preferences, membership, payment and shipping information right from the app.",
  },
]

const desktopImages: ProgressiveImage[] = [
  { imageUrl: imageImport1, alt: "image of the iOS app", aspectRatio: 1, size: "xlarge" },
  { imageUrl: imageImport2, alt: "image of the iOS app", aspectRatio: 1, size: "xlarge" },
  { imageUrl: imageImport3, alt: "image of the iOS app", aspectRatio: 1, size: "xlarge" },
]

const mobileImages: ProgressiveImage[] = [
  { imageUrl: imageImport1, alt: "image of the iOS app", aspectRatio: 1, size: "medium" },
  { imageUrl: imageImport2, alt: "image of the iOS app", aspectRatio: 1, size: "medium" },
  { imageUrl: imageImport3, alt: "image of the iOS app", aspectRatio: 1, size: "medium" },
]

const Desktop = () => {
  return (
    <Flex
      flexDirection="row"
      flexWrap="nowrap"
      justifyContent="space-between"
      style={{ overflow: "hidden", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Box width="40%">
        <TextList title={title} subtitle={subtitle} listItems={textItems} />
      </Box>
      <Box style={{ position: "relative", width: "60%", height: "100%" }}>
        <HomepageCarousel images={desktopImages} />
      </Box>
    </Flex>
  )
}

const Mobile = () => {
  return (
    <>
      <Box px={2}>
        <Spacer mb={5} />
        <Sans size="8">{title}</Sans>
        <Sans size="4" color="black50">
          {subtitle}
        </Sans>
        <Spacer mb={3} />
        <Flex flexDirection="row" justifyContent="center" style={{ maxHeight: "768px", overflow: "hidden" }}>
          <HomepageCarousel images={mobileImages} />
        </Flex>
      </Box>
      {textItems?.map((item) => (
        <Box pl={2} pr={4} key={item.title}>
          <Spacer mt={5} />
          <Sans size="4">{item.title}</Sans>
          <Sans size="4" color="black50">
            {item.text}
          </Sans>
          <Spacer mt={5} />
        </Box>
      ))}
    </>
  )
}

export const TheApp: React.FC = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <Desktop />
      </Media>
      <Media lessThan="md">
        <Mobile />
      </Media>
    </>
  )
}

const ImageWrapper = styled(Box)`
  overflow: hidden;
  height: 492px;
  width: 228px;
`
