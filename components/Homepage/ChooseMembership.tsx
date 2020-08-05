import React from "react"
import { Flex, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"
import { MembershipCard } from "./MembershipCard"

export const ChooseMembership: React.FC = () => {
  return (
    <Grid>
      <Flex px={[2, 4]} justifyContent="center">
        <Flex flexDirection="column" justifyContent="center">
          <Sans size="11" style={{ textAlign: "center" }}>
            Choose your plan
          </Sans>
          <Spacer mb={0.5} />
          <Sans size="4" color="black50" style={{ textAlign: "center" }}>
            Two options to best match your lifestyle
          </Sans>
        </Flex>
      </Flex>
      <Spacer mb={6} />
      <Row px={[1, 2]}>
        <Col md="6" xs="12" px={[1, 2]} mb={[2, 0]}>
          <MembershipCard type="essential" />
        </Col>
        <Col md="6" xs="12" px={[1, 2]}>
          <MembershipCard type="allAccess" />
        </Col>
      </Row>
    </Grid>
  )
}
