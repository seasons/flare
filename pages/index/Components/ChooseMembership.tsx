import React from "react"
import { Flex, Sans, Spacer, Box } from "../../../components"
import { Grid, Row, Col } from "../../../components/Grid"
import { MembershipCard } from "./MembershipCard"

export const ChooseMembership: React.FC = () => {
  return (
    <Grid>
      <Sans size="8">Choose your membership</Sans>
      <Spacer mb={3} />
      <Row>
        <Col md="6" xs="12" mx={["2", "0"]}>
          <MembershipCard type="essential" />
        </Col>
        <Col md="6" xs="12" mx={["2", "0"]}>
          <MembershipCard type="allAccess" />
        </Col>
      </Row>
    </Grid>
  )
}
