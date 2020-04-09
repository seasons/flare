import React from "react"
import { Flex, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"
import { MembershipCard } from "./MembershipCard"

export const ChooseMembership: React.FC = () => {
  return (
    <Grid>
      <Spacer mb={6} />
      <Flex px={[2, 0]} mx={0.5} justifyContent="center">
        <Flex flexDirection="column" justifyContent="center">
          <Sans size="8" style={{ textAlign: "center" }}>
            Membership options
          </Sans>
          <Spacer mb={0.5} />
          <Sans size="4" color="black50" style={{ textAlign: "center" }}>
            Two options to best match your lifestyle
          </Sans>
        </Flex>
      </Flex>
      <Spacer mb={6} />
      <Row>
        <Col md="6" xs="12" pr={[2, 1]} pl={[2, 0]} mb={[2, 0]}>
          <MembershipCard type="essential" />
        </Col>
        <Col md="6" xs="12" pr={[2, 0]} pl={[2, 1]}>
          <MembershipCard type="allAccess" />
        </Col>
      </Row>
    </Grid>
  )
}
