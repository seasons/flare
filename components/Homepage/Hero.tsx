import React from "react"
import styled from "styled-components"
import { Grid, Row, Col } from "../Grid"
import { Flex, Sans, Spacer, Box } from ".."
import { LinkCTA } from "../Button"
import { Media } from "../Responsive"
import { imageResize } from "../../utils/imageResize"

const imageImport1 = require("../../public/images/homepage/HeroImage_1.png")
const imageImport2 = require("../../public/images/homepage/HeroImage_2.png")
const imageImport3 = require("../../public/images/homepage/HeroImage_3.png")
const image1 = imageResize(imageImport1, "large")
const image2 = imageResize(imageImport2, "large")
const image3 = imageResize(imageImport3, "large")

const DesktopHero = () => {
  return (
    <Grid>
      <Row>
        <Col md="4" xs="12" px={[2, 0]}>
          <Flex style={{ minHeight: "500px", height: "100%" }} flexDirection="column" px={0.5} justifyContent="center">
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Sans size="8" color="black100">
                This is Seasons.
              </Sans>
              <Sans size="8" color="black50">
                An invite-only rental subscription service for menswear & streetwear.
              </Sans>
              <Spacer mb={3} />
              <LinkCTA text="Join the waitlist" href="https://signup.seasons.nyc/" />
              <Spacer mb={4} />
              <Sans size="3" color="black50" style={{ maxWidth: "80%" }}>
                NYC Memberships are now open. Join the waitlist to secure your spot and get an invite.
              </Sans>
            </Flex>
          </Flex>
        </Col>
        <Col md="8" xs="12" px={[2, 0]}>
          <ImageWrapper px={0.5}>
            <Flex flexDirection="column" style={{ flex: 2 }}>
              <Flex mb={0.5} style={{ flex: 2.2 }}>
                <img
                  src={image2}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="White shoes with red pants"
                />
              </Flex>
              <Flex style={{ flex: 3.4 }}>
                <img src={image1} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Model with ball" />
              </Flex>
            </Flex>
            <Flex ml={0.5} style={{ flex: 2 }} pr={1}>
              <Box>
                <img src={image3} alt="Model with jacket" />
              </Box>
            </Flex>
          </ImageWrapper>
        </Col>
      </Row>
    </Grid>
  )
}

const MobileHero = () => {
  return (
    <Grid>
      <Row>
        <Col xs="12" px={[2, 0]}>
          <Flex flexDirection="column" px={0.5}>
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Spacer pb="60px" />
              <Spacer mb={6} />
              <Sans size="8" color="black100">
                This is Seasons.
              </Sans>
              <Sans size="8" color="black50">
                An invite-only rental subscription service for menswear & streetwear.
              </Sans>
              <Spacer mb={3} />
              <LinkCTA text="Join the waitlist" href="https://signup.seasons.nyc/" />
              <Spacer mb={10} />
            </Flex>
          </Flex>
        </Col>
        <Col xs="12">
          <MobileImageWrapper>
            <Flex flexDirection="column" style={{ flex: 2 }}>
              <Box mb={0.5} style={{ width: "100%" }}>
                <img src={image2} style={{ width: "100%" }} alt="White shoes with red pants" />
              </Box>
              <Box style={{ width: "100%" }}>
                <img src={image1} style={{ width: "100%" }} alt="Model with ball" />
              </Box>
            </Flex>
            <Flex ml={0.5} style={{ flex: 2 }}>
              <Box>
                <img src={image3} alt="Model with jacket" />
              </Box>
            </Flex>
          </MobileImageWrapper>
        </Col>
        <Col xs="12" px={2}>
          <Flex flexDirection="column" px={0.5}>
            <Box>
              <Spacer mb={3} />
              <Sans size="3" color="black50" style={{ maxWidth: "80%" }}>
                NYC Memberships are now open. Join the waitlist to secure your spot and get an invite.
              </Sans>
              <Spacer mb={3} />
            </Box>
          </Flex>
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

const ImageWrapper = styled(Flex)`
  position: relative;
  height: 100%;
  width: 100%;
  padding-left: 60px;
  overflow: hidden;
`

const MobileImageWrapper = styled(Flex)`
  position: relative;
  height: 100%;
  width: 100%;
`
