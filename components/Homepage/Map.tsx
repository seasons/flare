import React from "react"
import { Box, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"
import { LinkCTA } from "../Button"

const imageSRC = require("../../public/images/usa.png")

export const UsaMap: React.FC = () => {
  return (
    <Grid>
      <Row>
        <Col md="6" xs="12" px={[2, 0]}>
          <Box mx={0.5} mr={[0, "25%"]} style={{ maxWidth: "400px" }}>
            <Sans size="6" color="black100">
              Not in NYC?
            </Sans>
            <Sans size="5" color="black50" style={{ maxWidth: "80%" }}>
              Join the waitlist to be the first to know when we launch in other cities.
            </Sans>
            <Spacer mb={2} />
            <LinkCTA text="Join the waitlist" href="https://signup.seasons.nyc/" variant="primaryWhite" />
          </Box>
        </Col>
        <Col md="6" xs="12" px={[2, 0]}>
          <Box mx={[0.5, 5]} mt={[3, 0.5]}>
            <img src={imageSRC} />
          </Box>
        </Col>
      </Row>
    </Grid>
  )
}
