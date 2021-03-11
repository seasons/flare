import React from "react"
import { Box, Sans, Spacer, Flex, MaxWidth } from "../"
import { Media } from "../Responsive"
import { Display } from "../Typography"
import { imageResize } from "utils/imageResize"
import styled from "styled-components"
import { ListCheck } from "components/SVGs/ListCheck"
import { GetTheAppButton } from "components/Button/GetTheApp"
import { space } from "helpers"

const title = "Download the Seasons app"
const subtitle = "Manage membership, browse releases & reserve your order."

const imageSRC = require("../../public/images/homepage/AppImage1.png")
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

const Content = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" style={{ maxWidth: "464px" }} pr={3}>
      <Display size="8">{title}</Display>
      <Spacer mb={1} />
      <Sans size="4" color="black50">
        {subtitle}
      </Sans>
      <Spacer mb={3} />
      <Sans size="4">
        4.9 <span style={{ paddingLeft: space(1) }}>★★★★★</span>
      </Sans>
      <Spacer mb={3} />
      {listItems?.map((item) => {
        return (
          <Flex flexDirection="row" alignItems="center" mb={2}>
            <ListCheck />
            <Spacer mr={2} />
            <Sans size="4" color="black50" style={{ textDecoration: "underline" }}>
              {item.text}
            </Sans>
          </Flex>
        )
      })}
      <Spacer mb={2} />
      <GetTheAppButton block />
    </Flex>
  )
}

const Desktop = () => {
  return (
    <MaxWidth>
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={[2, 2, 2, 5, 5]} width="100%">
        <Flex flexDirection="row" justifyContent="flex-start" width="100%" style={{ flex: 2 }}>
          <Content />
        </Flex>
        <Flex
          flexDirection="row"
          justifyContent="center"
          width="100%"
          style={{ flex: 2, height: 0, paddingBottom: "50%" }}
        >
          <BackgroundImage />
        </Flex>
      </Flex>
    </MaxWidth>
  )
}

export const TheApp: React.FC = () => {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <Desktop />
      </Media>
      <Media between={["md", "lg"]}>
        <Desktop />
      </Media>
      <Media lessThan="md">
        <Desktop />
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
