import React from "react"
import { Box, Sans, Spacer, Flex } from "../"
import { TextList } from "./TextList"
import styled from "styled-components"
import { Media } from "../Responsive"
import { Separator } from "../Separator"

const title = "The app"
const subtitle = "After receiving an invite, you’ll get a link to download the Seasons app."

const image1 = require("../../public/images/homepage/Device_1.png")
const image2 = require("../../public/images/homepage/Device_2.png")
const image3 = require("../../public/images/homepage/Device_3.png")
const image4 = require("../../public/images/homepage/Device_4.png")

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

const Desktop = () => {
  return (
    <Flex
      flexDirection="row"
      flexWrap="nowrap"
      height="813px"
      justifyContent="space-between"
      style={{ overflow: "hidden", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Box width="40%">
        <TextList title={title} subtitle={subtitle} listItems={textItems} />
      </Box>
      <Box style={{ position: "relative", width: "60%", overflow: "hidden" }}>
        <Flex height="100%" flexDirection="row" flexWrap="nowrap" alignItems="center">
          <Flex flexDirection="column" justifyContent="center" m={2}>
            <ImageWrapper>
              <img src={image1} />
            </ImageWrapper>
          </Flex>
          <Flex flexDirection="column" justifyContent="center" m={2}>
            <ImageWrapper>
              <img src={image2} />
            </ImageWrapper>
            <Spacer mb={4} />
            <ImageWrapper>
              <img src={image3} />
            </ImageWrapper>
          </Flex>
          <Flex flexDirection="column" justifyContent="center" m={2}>
            <ImageWrapper>
              <img src={image4} />
            </ImageWrapper>
          </Flex>
        </Flex>
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
        <Spacer mb={2} />
        <Flex flexDirection="row" justifyContent="center" style={{ maxHeight: "768px", overflow: "hidden" }}>
          <Flex flexDirection="column" pr={1}>
            <img src={image1} />
            <Spacer mb={2} />
            <img src={image2} />
          </Flex>
          <Flex flexDirection="column" pl={1}>
            <Spacer mb="120px" />
            <img src={image3} />
            <Spacer mb={2} />
            <img src={image4} />
          </Flex>
        </Flex>
      </Box>
      <Separator />
      {textItems?.map((item) => (
        <Box pl={2} pr={4}>
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
