import React from "react"
import { Sans, Spacer, Flex, MaxWidth, Display } from "components"
import { Media } from "../Responsive"
import { imageResize } from "utils/imageResize"
import styled from "styled-components"
import { ListCheck } from "components/SVGs/ListCheck"
import { GetTheAppButton } from "components/Button/GetTheApp"
import { color, space } from "helpers"

const title = "Download the Seasons app"
const subtitle = "Manage membership & reserve your order."

const imageSRC = require("../../public/images/homepage/web-devices.png")
const image = imageResize(imageSRC, "large")

const listItems = [
  {
    text: "Get push notifications for every release & restock",
  },
  {
    text: "Chat with a stylist & discover styles available in your size",
  },
  {
    text: "Access your unique referral code & earn a free month",
  },
]

const TextContent = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" style={{ maxWidth: "464px" }} pr={[0, 0, 3, 3, 3]}>
      <Display size={["7", "9"]}>{title}</Display>
      <Spacer mb={1} />
      <Sans size={["3", "4"]} color="black50">
        {subtitle}
      </Sans>
      <Spacer mb={3} />
      <Sans size="4">
        4.9 <span style={{ paddingLeft: space(1) }}>★★★★★</span>
      </Sans>
      <Spacer mb={3} />
      {listItems?.map((item, index) => {
        return (
          <Flex flexDirection="row" alignItems="center" mb={2} key={index}>
            <ListCheck color={color("black100")} />
            <Spacer mr={2} />
            <Sans size={["3", "4"]}>{item.text}</Sans>
          </Flex>
        )
      })}
      <Spacer mb={2} />
      <GetTheAppButton block size="large" />
    </Flex>
  )
}

const Content = ({ platform }) => {
  const isDesktop = platform === "desktop"
  return (
    <MaxWidth>
      <Flex
        flexDirection={isDesktop ? "row" : "column"}
        flexWrap="nowrap"
        justifyContent="space-between"
        px={[2, 2, 2, 2, 2]}
        width="100%"
      >
        <Flex flexDirection="row" justifyContent="flex-start" width="100%" style={{ flex: 2 }}>
          <TextContent />
        </Flex>
        <Flex pt={isDesktop ? 0 : 6} flexDirection="row" justifyContent="center" width="100%" style={{ flex: 2 }}>
          <BackgroundImage />
        </Flex>
      </Flex>
    </MaxWidth>
  )
}

export const TheApp: React.FC = () => {
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

const BackgroundImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  flex-direction: row;
  background: url(${image}) no-repeat center center;
  background-size: contain;
`
