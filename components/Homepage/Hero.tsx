import React from "react"
import styled from "styled-components"
import { Grid, Row, Col } from "../Grid"
import { Flex, Sans, Spacer, Box } from ".."
import { Button } from "../Button"
import { Media } from "../Responsive"
import { ProgressiveImage } from "../Image"
import { GetTheAppButton } from "../Button/GetTheApp"
import Link from "next/link"

const imageURL = require("../../public/images/homepage/CouchPhoto_final.png")

const descriptionText =
  "Exclusively in select cities. Apply for membership to secure your place in line & to be notified when your spot is ready."

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
                <Button variant="primaryWhite" block width="100%">
                  Apply for membership
                </Button>
              </Link>
              <Spacer mb={1} />
              <Spacer mb={3} />
              <Sans size="3" color="black50">
                {descriptionText}
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
              <Sans size="3" color="black50" style={{ maxWidth: "80%" }}>
                {descriptionText}
              </Sans>
              <Spacer mb={4} />
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
