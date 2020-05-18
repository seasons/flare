import React from "react"
import { Box, Sans, Spacer, Flex } from "../"
import { Grid, Row, Col } from "../Grid"
import { LinkCTA } from "../Button"
import { ProgressiveImage } from "../Image"

const imageSRC = require("../../public/images/usa.png")

export const UsaMap: React.FC = () => {
  return (
    <Grid>
      <Row>
        <Col md="6" xs="12" px={[2, 0]}>
          <Flex
            mx={0.5}
            mr={[0, "25%"]}
            style={{ maxWidth: "400px", height: "100%" }}
            justifyContent="center"
            flexDirection="column"
          >
            <Sans size="6" color="black100">
              Not in NYC?
            </Sans>
            <Sans size="5" color="black50" style={{ maxWidth: "80%" }}>
              Join the waitlist to be the first to know when we launch in other cities.
            </Sans>
            <Spacer mb={2} />
            <LinkCTA text="Join the waitlist" href="https://signup.seasons.nyc/" variant="primaryWhite" />
          </Flex>
        </Col>
        <Col md="6" xs="12" px={[2, 0]}>
          <Box mx={[0.5, 5]} mt={[3, 0.5]}>
            <ProgressiveImage
              imageUrl={imageSRC}
              alt="Map of the United States"
              size="small"
              aspectRatio={0.63}
              hideBackground
            />
          </Box>
        </Col>
      </Row>
    </Grid>
  )
}
