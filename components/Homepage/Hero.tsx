import React from "react"
import styled from "styled-components"
import { Grid, Row, Col } from "../Grid"
import { Flex, Sans, Spacer, Box, MaxWidth } from ".."
import { Button } from "../Button"
import { Media } from "../Responsive"
import { ProgressiveImage } from "../Image"
import { GetTheAppButton } from "../Button/GetTheApp"
import Link from "next/link"
import { HomepageCarousel } from "."

const imageURL1 = require("../../public/images/homepage/Hero-Image-1.png")
const imageURL2 = require("../../public/images/homepage/Hero-Image-2.png")
const imageURL3 = require("../../public/images/homepage/Hero-Image-3.png")
const imageURL4 = require("../../public/images/homepage/Hero-Image-4.png")

const aspectRatio = 592 / 740

const heroImages: ProgressiveImage[] = [
  { imageUrl: imageURL1, alt: "image of the iOS app", aspectRatio, size: "xlarge" },
  { imageUrl: imageURL2, alt: "image of the iOS app", aspectRatio, size: "xlarge" },
  { imageUrl: imageURL3, alt: "image of the iOS app", aspectRatio, size: "xlarge" },
  { imageUrl: imageURL4, alt: "image of the iOS app", aspectRatio, size: "xlarge" },
]

const mainText = "Seasons is a curated,\nmembers-only rental platform for\ndesigner menswear & streetwear."

const descriptionText =
  "Exclusively in select cities. Apply for membership to secure your\nplace in line & to be notified when your spot is ready."

const DesktopHero = () => {
  return (
    <MaxWidth>
      <Flex flexDirection="row" justifyContent="flex-end" width="100%" px={2}>
        <DesktopTextContent px={2}>
          <Flex flexDirection="column" justifyContent="center">
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Sans size="11" color="black100" style={{ whiteSpace: "pre-line" }}>
                {mainText}
              </Sans>
              <Spacer mb={3} />
              <Flex flexDirection="row">
                <GetTheAppButton />
                <Spacer mr={1} />
                <Link href="/signup">
                  <Button variant="primaryWhite">Apply for membership</Button>
                </Link>
              </Flex>
              <Spacer mb={1} />
              <Spacer mb={3} />
              <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                {descriptionText}
              </Sans>
            </Flex>
          </Flex>
        </DesktopTextContent>
        <Box style={{ position: "relative", width: "60%", height: "100%", maxWidth: "800px" }}>
          <HomepageCarousel images={heroImages} />
        </Box>
      </Flex>
    </MaxWidth>
  )
}

const MobileHero = () => {
  return (
    <Grid>
      <Row>
        <Col xs="12" px={[2, 0]}>
          <Flex flexDirection="column" px={0.5}>
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Spacer mb={7} />
              <Sans size="7" color="black100">
                This is Seasons.
              </Sans>
              <Sans size="7" color="black50">
                A privately shared community for luxury menswear & streetwear.
              </Sans>
              <Spacer mb={3} />
              <GetTheAppButton block />
              <Spacer mb={1} />
              <Link href="/signup">
                <Button variant="primaryWhite">Apply for membership</Button>
              </Link>
              <Spacer mb={2} />
              <Sans size="4" color="black50" style={{ maxWidth: "80%" }}>
                {descriptionText}
              </Sans>
              <Spacer mb={4} />
            </Flex>
          </Flex>
        </Col>
        <Col xs="12">
          <Box style={{ position: "relative", height: "100%", maxHeight: "900px" }}>
            <HomepageCarousel images={heroImages} />
          </Box>
        </Col>
      </Row>
    </Grid>
  )
}

export const Hero: React.FC = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopHero />
      </Media>
      <Media lessThan="md">
        <MobileHero />
      </Media>
    </>
  )
}

const DesktopTextContent = styled(Box)`
  position: absolute;
  top: 196px;
  left: 0;
  z-index: 3;
`
