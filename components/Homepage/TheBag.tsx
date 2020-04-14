import React from "react"
import { Box, Sans, Spacer, Flex } from "../"
import { TextList } from "./TextList"
import styled from "styled-components"
import { Media } from "../Responsive"
import { Separator } from "../Separator"
import { Grid } from "../Grid"

const title = "The Bag"
const subtitle = "Each member receives their own custom Seasons shipping bag with every order."

const image1 = require("../../public/images/homepage/Bag_1.png")
const image2 = require("../../public/images/homepage/Bag_2.png")
const image3 = require("../../public/images/homepage/Bag_3.png")
const image4 = require("../../public/images/homepage/Bag_4.png")

const textItems = [
  {
    title: "Reusable",
    text:
      "Ready for new pieces? Pack up your items, attach the pre-paid shipping label and drop it off at the nearest UPS drop-off location.",
  },
  {
    title: "Durable",
    text:
      "Our bag is made from a tough, recycled, polyethylene material that’s meant to last. It’s also be cleaned & sanitized after every use.",
  },
  {
    title: "Discreet",
    text:
      "Designed with descretion in mind, our bag comes in matte black with minimal branding and carrying handles that tuck in.",
  },
]

const Desktop = () => {
  return (
    <Flex
      flexDirection="row"
      flexWrap="nowrap"
      justifyContent="space-between"
      style={{ overflow: "hidden", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Box style={{ position: "relative", width: "60%", overflow: "hidden" }}>
        <Flex height="100%" flexDirection="row" flexWrap="nowrap" alignItems="center">
          <Grid p={2} style={{ columnCount: 2, gridColumnGap: 0 }}>
            <ImageWrapper>
              <img src={image1} />
            </ImageWrapper>
            <ImageWrapper>
              <img src={image2} />
            </ImageWrapper>
            <ImageWrapper>
              <img src={image3} />
            </ImageWrapper>
            <ImageWrapper>
              <img src={image4} />
            </ImageWrapper>
          </Grid>
        </Flex>
      </Box>
      <Box width="40%">
        <TextList title={title} subtitle={subtitle} listItems={textItems} />
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
        <Spacer mb={4} />
        <img src={image1} />
        <Spacer mb={1} />
        <img src={image2} />
        <Spacer mb={1} />
        <img src={image3} />
        <Spacer mb={1} />
        <img src={image4} />
      </Box>
      <Spacer mb={4} />
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

export const TheBag: React.FC = () => {
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
  display: flex;
  flex: 1;
  padding: 4px;
`
