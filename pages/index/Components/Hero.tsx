import React from "react"
import { Flex, Sans, Spacer, Box } from "../../../components"
import { Grid, Row, Col } from "../../../components/Grid"
import { LinkCTA } from "../../../components/Button"

export const Hero: React.FC = () => {
  return (
    <Grid>
      <Row>
        <Col md="4" xs="12" px={[2, 0]}>
          <Flex style={{ minHeight: "500px" }} flexDirection="column" mx={0.5}>
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Sans size="8" color="black100">
                This is Seasons.
              </Sans>
              <Spacer mb={1} />
              <Sans size="8" color="black50">
                An invite-only rental subscription service for menswear & streetware.
              </Sans>
              <Spacer mb={3} />
              <LinkCTA text="Join the waitlist" href="https://signup.seasons.nyc/" />
            </Flex>
            <Box>
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
