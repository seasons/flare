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

const imageURL1 = require("../../public/images/homepage/HeroImage-1.png")
const imageURL2 = require("../../public/images/homepage/HeroImage-2.png")
const imageURL3 = require("../../public/images/homepage/HeroImage-3.png")
const imageURL4 = require("../../public/images/homepage/HeroImage-4.png")

const aspectRatio = 0.8

const heroImages: ProgressiveImage[] = [
  { imageUrl: imageURL4, alt: "image of the iOS app", aspectRatio, size: "xlarge" },
  { imageUrl: imageURL1, alt: "image of the iOS app", aspectRatio, size: "xlarge" },
  { imageUrl: imageURL2, alt: "image of the iOS app", aspectRatio, size: "xlarge" },
  { imageUrl: imageURL3, alt: "image of the iOS app", aspectRatio, size: "xlarge" },
]

const mainText = "A members-only rental platform for designer menswear & streetwear."
const carouselBlipWidth = 16
const descriptionText =
  "Exclusively in select cities. Apply for membership to secure your\nplace in line & to be notified when your spot is ready."
const descriptionTextTablet =
  "Exclusively in select cities. Apply for membership to secure your place in line & to be notified when your spot is ready."

const DesktopHero = () => {
  return (
    <MaxWidth>
      <Flex flexDirection="row" justifyContent="flex-end" width="100%" alignItems="center" px={5} pt={5}>
        <DesktopTextContent px={5}>
          <Flex flexDirection="column" justifyContent="center">
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Sans size="11" color="black100">
                This is Seasons.
              </Sans>
              <Sans size="11" color="black50" style={{ whiteSpace: "pre-line", maxWidth: "750px" }}>
                {mainText}
              </Sans>
              <Spacer mb={4} />
              <Flex flexDirection="row">
                <Link href="/signup">
                  <Button>Apply for membership</Button>
                </Link>
                <Spacer mr={1} />
                <GetTheAppButton />
              </Flex>
              <Spacer mb={4} />
              <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                {descriptionText}
              </Sans>
            </Flex>
          </Flex>
        </DesktopTextContent>
        <CarouselWrapper>
          <HomepageCarousel images={heroImages} />
        </CarouselWrapper>
        <BottomTextWrapper px={5}>
          <Sans size="4" color="black50">
            — Experience over 500+ styles from a carefully curated list of brands.
          </Sans>
        </BottomTextWrapper>
      </Flex>
    </MaxWidth>
  )
}

const TabletHero = () => {
  return (
    <MaxWidth>
      <TabletTextContent px={2} mt="120px">
        <Flex flexDirection="column" justifyContent="center">
          <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
            <Sans size="10" color="black100">
              This is Seasons.
            </Sans>
            <Sans size="10" color="black50" style={{ whiteSpace: "pre-line", maxWidth: "750px" }}>
              {mainText}
            </Sans>
            <Spacer mb={4} />
            <Flex flexDirection="row">
              <Link href="/signup">
                <Button>Apply for membership</Button>
              </Link>
              <Spacer mr={1} />
              <GetTheAppButton />
            </Flex>
            <Spacer mb={4} />
            <Sans size="4" color="black50" style={{ maxWidth: "70%" }}>
              {descriptionTextTablet}
            </Sans>
          </Flex>
        </Flex>
      </TabletTextContent>
      <Flex flexDirection="row" justifyContent="flex-end" width="100%" alignItems="center" mt="420px">
        <Box width="80%" height="100%" style={{ position: "relative" }}>
          <HomepageCarousel images={heroImages} />
        </Box>
      </Flex>
      <BottomTextWrapper px={2}>
        <Sans size="4" color="black50" style={{ maxWidth: "60%" }}>
          — Experience over 500+ styles from a carefully curated list of brands.
        </Sans>
      </BottomTextWrapper>
    </MaxWidth>
  )
}

const MobileHero = () => {
  return (
    <Grid>
      <Row>
        <Col xs="12" px={2}>
          <Flex flexDirection="column">
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Spacer mb={10} />
              <Sans size="9" color="black100">
                This is Seasons.
              </Sans>
              <Sans size="9" color="black50" style={{ whiteSpace: "pre-line" }}>
                {mainText}
              </Sans>
              <Spacer mb={4} />
              <Link href="/signup">
                <Button>Apply for membership</Button>
              </Link>
              <Spacer mb={1} />
              <GetTheAppButton block />
              <Spacer mb={4} />
              <Sans size="4" color="black50">
                {descriptionText}
              </Sans>
              <Spacer mb={4} />
              <Box style={{ position: "relative", height: "100%", maxHeight: "700px" }}>
                <HomepageCarousel images={heroImages} />
              </Box>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Grid>
  )
}

export const Hero: React.FC = () => {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <DesktopHero />
      </Media>
      <Media between={["md", "lg"]}>
        <TabletHero />
      </Media>
      <Media lessThan="md">
        <MobileHero />
      </Media>
    </>
  )
}

const BottomTextWrapper = styled(Box)`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
`

const TabletTextContent = styled(Box)`
  position: absolute;
  left: 0;
  z-index: 3;
`

const DesktopTextContent = styled(Box)`
  position: absolute;
  left: 0;
  z-index: 3;
`

const CarouselWrapper = styled(Box)`
  position: relative;
  width: ${624 + carouselBlipWidth}px;
  height: 780px;
`
