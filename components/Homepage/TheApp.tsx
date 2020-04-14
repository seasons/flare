import React from "react"
import { Box, Sans, Spacer, Flex } from "../"
import { Grid, Row, Col } from "../Grid"
import { TextList } from "./TextList"
import styled from "styled-components"

const image1 = require("../../public/images/homepage/Device_1.png")
const image2 = require("../../public/images/homepage/Device_2.png")
const image3 = require("../../public/images/homepage/Device_3.png")
const image4 = require("../../public/images/homepage/Device_4.png")

const textItems = [
  {
    title: "Browse",
    text:
      "We buy the newest and latest collections. See something you like that we don't carry? Send us a message on Instagram.",
  },
  {
    title: "Reserve",
    text:
      "We buy the newest and latest collections. See something you like that we don't carry? Send us a message on Instagram.",
  },
  {
    title: "Manage",
    text:
      "We buy the newest and latest collections. See something you like that we don't carry? Send us a message on Instagram.",
  },
]

export const TheApp: React.FC = () => {
  return (
    <Flex
      flexDirection="row"
      flexWrap="nowrap"
      height="813px"
      justifyContent="space-between"
      style={{ overflow: "hidden", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Box width="40%">
        <TextList
          title="The app"
          subtitle="Browse, save and place a reservation right from your phone."
          listItems={textItems}
        />
      </Box>
      <Box style={{ position: "relative", width: "60%", overflow: "hidden" }}>
        <Flex height="100%" flexDirection="row" flexWrap="nowrap" alignItems="center">
          <Flex flexDirection="column" justifyContent="center" m={2}>
            <ImageWrapper height={["492px"]} width={["228px"]}>
              <img src={image1} />
            </ImageWrapper>
          </Flex>
          <Flex flexDirection="column" justifyContent="center" m={2}>
            <ImageWrapper height={["492px"]} width={["228px"]}>
              <img src={image2} />
            </ImageWrapper>
            <Spacer mb={4} />
            <ImageWrapper height={["492px"]} width={["228px"]}>
              <img src={image3} />
            </ImageWrapper>
          </Flex>
          <Flex flexDirection="column" justifyContent="center" m={2}>
            <ImageWrapper height={["492px"]} width={["228px"]}>
              <img src={image4} />
            </ImageWrapper>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

const ImageWrapper = styled(Box)`
  overflow: hidden;
`
