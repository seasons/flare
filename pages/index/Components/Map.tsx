import React from "react"
import { Box, Sans, Spacer } from "../../../components"
import { Grid, Row, Col } from "../../../components/Grid"
import { Button } from "../../../components/Button"
import { Link } from "../../../components/Link"

const imageSRC = require("../../../public/images/usa.png")

export const UsaMap: React.FC = () => {
  return (
    <Grid>
      <Row>
        <Col md="6" xs="12" px={[2, 0]}>
          <Box mx={0.5}>
            <Sans size="8" color="black100">
              Not in NYC?
            </Sans>
            <Spacer mb={1} />
            <Sans size="8" color="black50" style={{ maxWidth: "80%" }}>
              Join the waitlist to be the first to know when we launch in other cities.
            </Sans>
            <Spacer mb={2} />
            <Link href="https://signup.seasons.nyc/">
              <Button>Join the waitlist</Button>
            </Link>
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
