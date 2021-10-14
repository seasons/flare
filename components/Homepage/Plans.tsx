import { useDrawerContext } from "components/Drawer/DrawerContext"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"
import { PlanCard } from "./PlanCard"
import { seasonAndYear } from "utils/seasonAndYear"
import { Box, Display, Flex, Media, Sans, Spacer } from "components"
import { Col, Grid, Row } from "../Grid"

const image = require("../../public/images/homepage/PlanBackground.jpg")

export const Plans: React.FC<{ plans: any }> = ({ plans }) => {
  const { openDrawer } = useDrawerContext()
  const { authState, userSession } = useAuthContext()

  return (
    <Background>
      <Grid px={[2, 2, 2, 100, 158]} pt={[10, 15, 15, 15, 15]}>
        <Flex width="100%" alignItems="center" justifyContent="center" flexDirection="row" pb={5}>
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Display size={["7", "9"]}>{`${seasonAndYear()} Membership`}</Display>
            <Sans size={["3", "4"]} color="black50">
              Have a question not covered here? Check out our{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer", color: color("black100") }}
                onClick={() => openDrawer("faq")}
              >
                FAQ
              </span>
            </Sans>
          </Flex>
        </Flex>
        <Row>
          {plans.map((plan, index) => (
            <Col md="6" xs="12" key={index} px={[0, 0, 1, 1, 1]} pb={5}>
              <Flex flexDirection="row" justifyContent={index % 2 === 0 ? "flex-end" : "flex-start"}>
                <PlanCard plan={plan} authState={authState} userSession={userSession} />
              </Flex>
            </Col>
          ))}
        </Row>
        <Flex flexDirection="row" justifyContent="center">
          <Sans size="3" color="black50" style={{ textAlign: "center", maxWidth: "720px" }}>
            Cancel for any reason within your first 24 hours to receive a full refund. Free shipping and dry cleaning
            are only included on one order per month. Questions about membership? Contact{" "}
            <span
              onClick={() => window.open(`mailto:membership@seasons.nyc?subject=Membership`)}
              style={{ cursor: "pointer" }}
            >
              membership@seasons.nyc
            </span>
          </Sans>
        </Flex>
        <Spacer mb={[10, 15, 15, 15, 15]} />
      </Grid>
    </Background>
  )
}

const Background = styled(Box)`
  background: url(${image}) no-repeat center center;
  background-size: cover;
`
