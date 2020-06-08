import React from "react"
import styled from "styled-components"
import { Grid, Row, Col } from "../Grid"
import { Flex, Sans, Spacer, Box } from ".."
import { LinkCTA } from "../Button"
import { Media } from "../Responsive"
import { ProgressiveImage } from "../Image"
import { FLARE_IMGIX_BASE } from "../../helpers/constants"

const imageURL = `${FLARE_IMGIX_BASE}/CouchPhoto_final.png`

const DesktopHero = () => {
  return (
    <Grid>
      <Row>
        <Col md="4" xs="12" px={[2, 0]}>
          <Flex
            style={{ minHeight: "500px", height: "100%" }}
            flexDirection="column"
            px={0.5}
            pr={5}
            justifyContent="center"
          >
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Sans size="8" color="black100">
                This is Seasons.
              </Sans>
              <Sans size="8" color="black50">
                Exclusive access to a closet full of luxury menswear & streetwear.
              </Sans>
              <Spacer mb={3} />
              <LinkCTA text="Apply for membership" href="https://signup.seasons.nyc/" />
              <Spacer mb={4} />
              <Sans size="3" color="black50">
                Applications reviewed on a first come, first serve basis. Exclusively in New York, Atlanta, and Miami.
              </Sans>
            </Flex>
          </Flex>
        </Col>
        <Col md="8" xs="12" px={[2, 0]}>
          <ProgressiveImage
            imageUrl={imageURL}
            size="xlarge"
            aspectRatio={0.66}
            alt="hero product image of model on couch"
          />
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
                Exclusive access to a closet full of luxury menswear & streetwear.
              </Sans>
              <Spacer mb={3} />
              <LinkCTA text="Apply for membership" href="https://signup.seasons.nyc/" />
              <Spacer mb={10} />
            </Flex>
          </Flex>
        </Col>
        <Col xs="12">
          <MobileImageWrapper>
            <ProgressiveImage
              imageUrl={imageURL}
              size="medium"
              aspectRatio={0.66}
              alt="hero product image of model on couch"
            />
          </MobileImageWrapper>
        </Col>
        <Col xs="12" px={2}>
          <Flex flexDirection="column" px={0.5}>
            <Box>
              <Spacer mb={3} />
              <Sans size="3" color="black50" style={{ maxWidth: "80%" }}>
                Applications reviewed on a first come, first serve basis. Exclusively in New York, Atlanta, and Miami.
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

const MobileImageWrapper = styled(Flex)`
  position: relative;
  height: 100%;
  width: 100%;
`
