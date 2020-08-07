import React from "react"
import { Box, Sans, Spacer, Flex, MaxWidth } from "../"
import { TextList } from "./TextList"
import { Media } from "../Responsive"
import { HomepageCarousel } from "./HomepageCarousel"
import { ProgressiveImage } from "../Image"
import { Grid, Col, Row } from "../Grid"

const title = "The app"
const subtitle = "After receiving an invite, you’ll get a link to download the Seasons app."

const image1 = require("../../public/images/homepage/App-Image-1.png")
const image2 = require("../../public/images/homepage/App-Image-2.png")
const image3 = require("../../public/images/homepage/App-Image-3.png")

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
  { imageUrl: image1, alt: "image of the iOS app", aspectRatio: 1, size: "xlarge" },
  { imageUrl: image2, alt: "image of the iOS app", aspectRatio: 1, size: "xlarge" },
  { imageUrl: image3, alt: "image of the iOS app", aspectRatio: 1, size: "xlarge" },
]

const mobileImages: ProgressiveImage[] = [
  { imageUrl: image1, alt: "image of the iOS app", aspectRatio: 1, size: "medium" },
  { imageUrl: image2, alt: "image of the iOS app", aspectRatio: 1, size: "medium" },
  { imageUrl: image3, alt: "image of the iOS app", aspectRatio: 1, size: "medium" },
]

const Desktop = () => {
  return (
    <MaxWidth>
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={[2, 2, 2, 5, 5]} width="100%">
        <Flex flexDirection="row" justifyContent="center" width="100%" pr={2}>
          <TextList title={title} subtitle={subtitle} listItems={textItems} />
        </Flex>
        <HomepageCarousel images={desktopImages} maxWidth="750px" />
      </Flex>
    </MaxWidth>
  )
}

const Tablet = () => {
  return (
    <Grid px={[2, 2, 2, 5, 5]}>
      <Box pb={4}>
        {title && <Sans size="11">{title}</Sans>}
        <Spacer mb={1} />
        {subtitle && (
          <Sans size="6" color="black50">
            {subtitle}
          </Sans>
        )}
      </Box>
      <Row>
        {textItems.map((step, index) => (
          <Col md="4" key={index}>
            <Sans size="6">{step.title}</Sans>
            <Spacer mb={1} />
            <Sans size="4" color="black50" style={{ maxWidth: "80%" }}>
              {step.text}
            </Sans>
          </Col>
        ))}
      </Row>

      <Row md={12}>
        <Spacer mb={5} />
        <HomepageCarousel images={desktopImages} />
      </Row>
    </Grid>
  )
}

const Mobile = () => {
  return (
    <>
      <Box px={2}>
        <Spacer mb={5} />
        <Sans size="9">{title}</Sans>
        <Spacer mb={1} />
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
      <Media greaterThanOrEqual="lg">
        <Desktop />
      </Media>
      <Media between={["md", "lg"]}>
        <Tablet />
      </Media>
      <Media lessThan="md">
        <Mobile />
      </Media>
    </>
  )
}
