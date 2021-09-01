import { useDrawerContext } from "components/Drawer/DrawerContext"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import { useRouter } from "next/router"
import React from "react"
import { imageResize } from "utils/imageResize"
import styled from "styled-components"
import { PlanCard } from "./PlanCard"

import { Box, Header, Flex, Media, Sans, Spacer } from "components"
import { Col, Grid, Row } from "../Grid"

const image = require("../../public/images/homepage/PlanBackground-Flare.jpg")

export const Plans: React.FC<{ plans: any }> = ({ plans }) => {
  const { authState } = useAuthContext()
  const { openDrawer } = useDrawerContext()
  const router = useRouter()

  console.log("plans", plans)

  const onSelectPlan = (_plan) => {
    if (authState.isSignedIn) {
      openDrawer("choosePlan", { source: "Update" })
    } else {
      router.push("/signup")
    }
  }

  const seasonAndYear = () => {
    const now = new Date()
    let season = ""
    switch (now.getMonth()) {
      case 12:
      case 1:
      case 2:
        season = "Winter"
        break
      case 3:
      case 4:
      case 5:
        season = "Spring"
        break
      case 6:
      case 7:
      case 8:
        season = "Summer"
        break
      case 9:
      case 10:
      case 11:
        season = "Fall"
        break
    }
    return `${season} ${now.getFullYear()}`
  }

  return (
    <Background>
      <Grid px={[2, 158, 158, 158, 158]} pt={[10, 15, 15, 15, 15]}>
        <Flex width="100%" alignItems="center" justifyContent="center" flexDirection="row" pb={5}>
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Header size="9">{`${seasonAndYear()} Membership`}</Header>
            <Sans size="4" color="black50">
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
            <Col md="6" xs="12" key={index} p={1}>
              <PlanCard plan={plan} />
            </Col>
          ))}
        </Row>
        <Spacer mb={5} />
        <Flex flexDirection="row" justifyContent="center">
          <Sans size="3" color="black50" style={{ textAlign: "center", maxWidth: "720px" }}>
            Cancel for any reason within your first 24 hours to receive a full refund. Free shipping and dry cleaning
            are only included on one order per month. Questions about membership? Contact membership@seasons.nyc
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
