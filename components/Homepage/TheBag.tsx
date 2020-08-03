import React from "react"
import { Box, Sans, Spacer, Flex } from "../"
import { TextList } from "./TextList"
import { Media } from "../Responsive"
import { ProgressiveImage } from "../Image"
import { HomepageCarousel } from "./HomepageCarousel"

const title = "The Bag"
const subtitle = "Each member receives their own custom Seasons shipping bag with every order."

const image1 = require("../../public/images/homepage/Bag-Image-1.png")
const image2 = require("../../public/images/homepage/Bag-Image-2.png")
const image3 = require("../../public/images/homepage/Bag-Image-3.png")

const textItems = [
  {
    title: "Reusable",
    text:
      "Ready for new pieces? Pack up your items, attach the pre-paid shipping label and drop it off at the nearest UPS drop-off location.",
  },
  {
    title: "Durable",
    text:
      "Our bag is made from a tough, recycled, polyethylene material that’s meant to last. It’s also cleaned & sanitized after every use.",
  },
  {
    title: "Discreet",
    text:
      "Designed with descretion in mind, our bag comes in matte black with minimal branding and carrying handles that tuck in.",
  },
]

const images: ProgressiveImage[] = [
  { imageUrl: image1, alt: "image of the delivery bag", aspectRatio: 1, size: "xlarge" },
  { imageUrl: image2, alt: "image of the delivery bag", aspectRatio: 1, size: "xlarge" },
  { imageUrl: image3, alt: "image of the delivery bag", aspectRatio: 1, size: "xlarge" },
]

const Desktop = () => {
  return (
    <Flex
      flexDirection="row"
      flexWrap="nowrap"
      justifyContent="space-between"
      style={{ overflow: "hidden", maxWidth: "1200px", margin: "0 auto" }}
      px={2}
    >
      <Box style={{ position: "relative", width: "60%", overflow: "hidden" }}>
        <HomepageCarousel images={images} />
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
        <HomepageCarousel images={images} />
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
