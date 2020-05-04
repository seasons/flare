import React from "react"
import styled from "styled-components"
import { Grid, Row, Col } from "../Grid"
import { Flex, Sans, Spacer, Box } from ".."
import { imageResize } from "../../utils/imageResize"
import { Media } from "../Responsive"
import { space } from "../../helpers"

const imageImport1 = require("../../public/images/about/About-HeroImage-1.png")
const imageImport2 = require("../../public/images/about/About-HeroImage-2.png")
const image1 = imageResize(imageImport1, "large")
const image2 = imageResize(imageImport2, "large")

const DesktopHero = () => {
  return (
    <Grid>
      <Box px={0.5} style={{ position: "relative" }}>
        <Spacer pb="122px" />
        <Flex
          style={{ flex: 1, maxWidth: "50%" }}
          pr="40px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Sans size="6" color="black100">
            Seasons is a New York-based fashion rental platform designed to foster access, community, and
            sustainability. We’ve curated a mix of luxury menswear, streetwear, and avant-garde designers, creating an
            exclusive rental library for our members in NYC. Seasons offers an alternative to the constant consumption
            of the seasonal fashion cycle and fast fashion, combining the fun of newness with the sustainability of
            re-use.
          </Sans>
          <Spacer mb={2} />
          <Sans size="6" color="black100">
            We compile data and member feedback in order to provide our brand partners with valuable insight about
            customer impressions, unlocking new customers via the potential of rental’s “try before you buy” ethos.
            We’re building technology and systems that push the boundaries of traditional retail and e-commerce, and we
            believe the future of this industry is contextual, personalized, and sustainable.
          </Sans>
        </Flex>
        <Spacer pb="80px" />
        <ImageWrapper1>
          <img src={image1} style={{ height: "100%" }} alt="Office interior" />
        </ImageWrapper1>
        <ImageWrapper2>
          <img src={image2} style={{ height: "100%" }} alt="Planning on a white board" />
        </ImageWrapper2>
      </Box>
    </Grid>
  )
}

const MobileHero = () => {
  return (
    <Grid>
      <Row>
        <Col xs="12" md="12" px={[2, 0.5]}>
          <Spacer pb="95px" />
          <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center" alignItems="center">
            <Sans size="4" color="black100">
              Seasons is a New York-based fashion rental platform designed to foster access, community, and
              sustainability. We’ve curated a mix of luxury menswear, streetwear, and avant-garde designers, creating an
              exclusive rental library for our members in NYC. Seasons offers an alternative to the constant consumption
              of the seasonal fashion cycle and fast fashion, combining the fun of newness with the sustainability of
              re-use.
            </Sans>
            <Spacer mb={2} />
            <Sans size="4" color="black100">
              We compile data and member feedback in order to provide our brand partners with valuable insight about
              customer impressions, unlocking new customers via the potential of rental’s “try before you buy” ethos.
              We’re building technology and systems that push the boundaries of traditional retail and e-commerce, and
              we believe the future of this industry is contextual, personalized, and sustainable.
            </Sans>
          </Flex>
          <Spacer pb="40px" />
        </Col>
        <Col xs="12" md="12">
          <img src={image1} style={{ width: "100%" }} alt="Office interior" />
          <Spacer mb={0.5} />
          <img src={image2} style={{ width: "100%" }} alt="Planning on a white board" />
        </Col>
      </Row>
    </Grid>
  )
}

export const AboutHero: React.FC = () => {
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

const ImageWrapper1 = styled.div`
  height: calc(50% + 26px);
  position: absolute;
  top: 0;
  right: 135px;
  z-index: -1;
`

const ImageWrapper2 = styled.div`
  height: calc(50% + 26px);
  position: absolute;
  bottom: 0;
  right: ${space(0.5)}px;
  z-index: -1;
`
