import React from "react"
import styled from "styled-components"
import { Grid, Row, Col } from "../Grid"
import { Flex, Sans, Spacer, Box, MaxWidth, Picture } from "../"
import { Display } from "../Typography"
import { GetTheAppButton } from "../Button/GetTheApp"
import Link from "next/link"
import { imageResize } from "../../utils/imageResize"
import { Media } from "../Responsive"
import { Button } from "../Button"
import { Check } from "../SVGs"

const imageURL = require("../../public/images/homepage/Collage.png")
const imageAlt = "Collage of editorial product images"

const headerText = "Wear, swap & repeat."

const listText = [
  "Free shipping, returns & dry cleaning",
  "Purchase items you like at a discount",
  "Pause or cancel anytime",
]

const desktopHeight = "800px"
const tableHeight = "600px"
const mobileHeight = "550px"

const DesktopAndTabletContent = ({ height }) => {
  return (
    <Box height={height} maxWidth="500px" style={{ zIndex: 3, position: "relative" }}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
        <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
          <Display size="9" color="black100">
            {headerText}
          </Display>
          <Spacer mb={1} />
          <Sans size="4" color="black50" style={{ whiteSpace: "pre-line", maxWidth: "400px" }}>
            Access hundreds of styles and discover new brands, all with zero commimtment. Exclusively in select cities.
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
          {listText.map((listItem) => (
            <Flex mb={2} key={listItem}>
              <Check />
              <Spacer mr={2} />
              <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                {listItem}
              </Sans>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

const DesktopHero = () => {
  return (
    <MaxWidth style={{ overflow: "hidden" }}>
      <Flex
        flexDirection="row"
        justifyContent="flex-start"
        width="100%"
        alignItems="center"
        pl={[2, 2, 2, 5, 5]}
        pt={5}
      >
        <DesktopAndTabletContent height={desktopHeight} />
        <DesktopImageWrapper>
          <Picture src={imageResize(imageURL, "hero")} alt={imageAlt} />
        </DesktopImageWrapper>
        <BottomTextWrapper px={[2, 2, 2, 5, 5]}>
          <Sans size="4" color="black50">
            — Over 500+ curated, in-season, and vintage styles.
          </Sans>
        </BottomTextWrapper>
      </Flex>
    </MaxWidth>
  )
}

const TabletHero = () => {
  return (
    <MaxWidth style={{ overflow: "hidden" }}>
      <Flex
        flexDirection="row"
        justifyContent="flex-start"
        width="100%"
        alignItems="center"
        pl={[2, 2, 2, 5, 5]}
        pt={5}
      >
        <DesktopAndTabletContent height={tableHeight} />
        <TabletImageWrapper>
          <Picture src={imageResize(imageURL, "large")} alt={imageAlt} />
        </TabletImageWrapper>
        <BottomTextWrapper px={[2, 2, 2, 5, 5]}>
          <Sans size="4" color="black50">
            — Over 500+ curated, in-season, and vintage styles.
          </Sans>
        </BottomTextWrapper>
      </Flex>
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
                {headerText}
              </Sans>
              <Spacer mb={1} />
              <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                Access hundreds of styles and discover new brands, all with zero commimtment.
              </Sans>
              <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                Exclusively in select cities.
              </Sans>
              <Spacer mb={4} />
              <Link href="/signup">
                <Button>Apply for membership</Button>
              </Link>
              <Spacer mb={1} />
              <GetTheAppButton block />
              <Spacer mb={4} />
              {listText.map((listItem) => (
                <Flex mb={2} key={listItem}>
                  <Check />
                  <Spacer mr={2} />
                  <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                    {listItem}
                  </Sans>
                </Flex>
              ))}
              <Spacer mb={4} />
              <MobileImageWrapper>
                <Picture src={imageResize(imageURL, "large")} alt={imageAlt} />
              </MobileImageWrapper>
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

const TabletImageWrapper = styled(Box)`
  position: absolute;
  overflow: hidden;
  height: ${tableHeight};
  min-width: 1120px;
  top: 40px;
  left: 400px;

  img {
    height: 100%;
    max-width: none !important;
  }
`

const DesktopImageWrapper = styled(Box)`
  position: absolute;
  overflow: hidden;
  height: ${desktopHeight};
  min-width: 1120px;
  left: 600px;

  img {
    height: 100%;
    max-width: none !important;
  }
`

const MobileImageWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  height: ${mobileHeight};
  img {
    height: 100%;
    max-width: none !important;
  }
`
