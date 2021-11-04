import { useDrawerContext } from "components/Drawer/DrawerContext"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import React, { useState } from "react"
import styled from "styled-components"
import { PlanCard } from "./PlanCard"
import { Box, Button, Display, Flex, Media, Picture, Sans, Spacer } from "components"
import { Col, Grid, Row } from "../Grid"
import { imageResize } from "utils/imageResize"
import { MembershipCTA } from "./MembershipCTA"
import { FeaturedIn } from "./FeaturedIn"
import { Separator } from "@seasons/eclipse"

const image = require("../../public/images/signup/CreateAccount.jpg")

const PlanTabs: React.FC<{ plans: any; breakpoint: "desktop" | "mobile" }> = ({ plans, breakpoint }) => {
  const isDesktop = breakpoint === "desktop"
  const [tabIndex, setTabIndex] = useState(0)
  const { openDrawer } = useDrawerContext()
  const { authState, userSession } = useAuthContext()

  const plan = plans?.[tabIndex]

  return (
    <Box pr={isDesktop ? "100px" : 0}>
      <Tabs>
        {plans?.map((plan, index) => {
          const selected = index === tabIndex
          return (
            <Flex py="12px" onClick={() => setTabIndex(index)} flex={2} style={{ cursor: "pointer" }}>
              <Sans
                size={["4", "5"]}
                color={selected ? "white100" : "black100"}
                textAlign="center"
                style={{ width: "100%" }}
              >
                Pay {plan.name}
                <StyledSpan>{plan.name === "Yearly" ? " (Save 20%)" : ""}</StyledSpan>
              </Sans>
            </Flex>
          )
        })}
        <TabToggle tabIndex={tabIndex}>
          <ToggleBackground />
        </TabToggle>
      </Tabs>
      <Spacer mb={isDesktop ? "120px" : 4} />
      <PlanCard plan={plan} isDesktop={isDesktop} />
      <Spacer mb={4} />
      <Flex flexDirection={isDesktop ? "row" : "column"}>
        <MembershipCTA variant="primaryBlack" authState={authState} userSession={userSession} />
        <Spacer mb={isDesktop ? 0 : 2} mr={isDesktop ? 2 : 0} />
        <Button variant="primaryGray" size="large" onClick={() => openDrawer("faq")}>
          See our FAQ
        </Button>
      </Flex>
      <Spacer mb="3" />
      <Sans size="3" color="black50" style={{ maxWidth: "460px" }}>
        Cancel for any reason within your first 24 hours to receive a full refund. Free shipping and dry cleaning are
        only included on one order per month.
      </Sans>
    </Box>
  )
}

const Image = () => {
  return (
    <ImageWrapper>
      <Picture src={imageResize(image, "large")} alt="Model leaning against car in fall" />
    </ImageWrapper>
  )
}

export const Plans: React.FC<{ plans: any }> = ({ plans }) => {
  return (
    <>
      <Media greaterThan="md">
        <Grid px={2}>
          <Row>
            <Col md="6" xs="12" pb={2}>
              <PlanTabs plans={plans} breakpoint="desktop" />
            </Col>
            <Col md="6" xs="12" pb={2}>
              <Image />
            </Col>
          </Row>
        </Grid>
        <FeaturedIn />
        <Box px={[2, 2, 2, 2, 2]} pb={2}>
          <Separator />
        </Box>
      </Media>
      <Media lessThan="lg">
        <Box px={2}>
          <Image />
          <Spacer mb={5} />
          <Display size="9">Membership plans</Display>
          <Spacer mb={3} />
          <PlanTabs plans={plans} breakpoint="mobile" />
        </Box>
      </Media>
    </>
  )
}

const StyledSpan = styled.span`
  font-size: 14px;
`

const ImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
`

const Tabs = styled(Flex)`
  border-radius: 8px;
  position: relative;
  border: 1px solid ${color("black10")};
  flex-direction: row;
  align-items: center;
`

const TabToggle = styled.div<{ tabIndex: number }>`
  position: absolute;
  width: calc(50%);
  height: calc(100%);
  padding: 4px;
  z-index: -1;
  transition: 300ms ease-in;
  transform: translateX(${(p) => (p.tabIndex === 0 ? "0" : "100%")});
`

const ToggleBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${color("brown100")};
`
