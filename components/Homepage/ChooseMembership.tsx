import React from "react"
import { Flex, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"
import { MembershipCard } from "./MembershipCard"
import { Media } from "../Responsive"

const Desktop = () => {
  return (
    <Grid>
      <Flex px={[2, 2, 2, 5, 5]} justifyContent="center">
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
      <Row px={[1, 1, 1, 3, 3]}>
        <Col md="6" xs="12" px={[1, 1, 1, 2, 2]} mb={[2, 0]}>
          <MembershipCard type="essential" maxWidth="75%" />
        </Col>
        <Col md="6" xs="12" px={[1, 1, 1, 2, 2]}>
          <MembershipCard type="allAccess" maxWidth="75%" />
        </Col>
      </Row>
    </Grid>
  )
}

const Mobile = () => {
  return (
    <Grid>
      <Flex px={[2, 2, 2, 5, 5]} justifyContent="center">
        <Flex flexDirection="column" justifyContent="center">
          <Sans size="11" style={{ maxWidth: "75%" }}>
            Choose your plan
          </Sans>
          <Spacer mb={0.5} />
          <Sans size="4" color="black50">
            Two options to best match your lifestyle
          </Sans>
        </Flex>
      </Flex>
      <Spacer mb={6} />
      <Row px={[1, 1, 1, 3, 3]}>
        <Col md="6" xs="12" px={[1, 1, 1, 2, 2]} mb={[2, 0]}>
          <MembershipCard type="essential" />
        </Col>
        <Col md="6" xs="12" px={[1, 1, 1, 2, 2]}>
          <MembershipCard type="allAccess" />
        </Col>
      </Row>
    </Grid>
  )
}

export const ChooseMembership: React.FC = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <Desktop />
      </Media>
      <Media lessThan="md">
        <Mobile />
      </Media>
    </>
  )
}
