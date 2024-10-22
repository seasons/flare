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

const image = require("../../public/images/homepage/plans/plans-image2.jpg")

const PlanTabs: React.FC<{ plans: any; breakpoint: "desktop" | "mobile" }> = ({ plans, breakpoint }) => {
  const isDesktop = breakpoint === "desktop"
  const [tabIndex, setTabIndex] = useState(0)

  const plan = plans?.[tabIndex]

  return (
    <Flex
      pr={isDesktop ? "100px" : 0}
      p={[0, 0, 0, 4, 4]}
      height={["auto", "auto", "auto", "700px", "700px"]}
      flexDirection="column"
      justifyContent="space-between"
    >
      {plans?.length > 1 && (
        <TabOuterWrapper isDesktop={isDesktop}>
          <Tabs>
            {plans?.map((plan, index) => {
              const selected = index === tabIndex
              return (
                <Flex py="12px" onClick={() => setTabIndex(index)} flex={2} style={{ cursor: "pointer", zIndex: 4 }}>
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
        </TabOuterWrapper>
      )}
      <Flex py={2} flex={1}>
        <PlanCard plan={plan} isDesktop={isDesktop} />
      </Flex>
      <Sans size={["2", "2", "3", "3", "3"]} color="black50" style={{ maxWidth: "460px" }}>
        Cancel for any reason within your first 24 hours to receive a full refund. Free shipping is only included on one
        order per month.
      </Sans>
    </Flex>
  )
}

const Image = ({ breakpoint }) => {
  const isDesktop = breakpoint === "desktop"
  return (
    <ImageWrapper isDesktop={isDesktop}>
      <Picture src={imageResize(image, "large")} alt="Model leaning against car in fall" />
    </ImageWrapper>
  )
}

export const Plans: React.FC<{ plans: any }> = ({ plans }) => {
  return (
    <>
      <Media greaterThan="md">
        <Grid px={2}>
          <PlanWrapper>
            <Row>
              <Col md="6" xs="12">
                <PlanTabs plans={plans} breakpoint="desktop" />
              </Col>
              <Col md="6" xs="12">
                <Image breakpoint="desktop" />
              </Col>
            </Row>
          </PlanWrapper>
        </Grid>
        <FeaturedIn />
      </Media>
      <Media lessThan="lg">
        <Box px={2}>
          <Image breakpoint="mobile" />
          <Spacer mb={5} />
          <PlanTabs plans={plans} breakpoint="mobile" />
        </Box>
      </Media>
    </>
  )
}

const TabOuterWrapper = styled(Box)<{ isDesktop: boolean }>`
  background-color: ${color("white100")};
  border-radius: 8px;
  padding: 4px;
  border: ${(p) => (p.isDesktop ? "none" : `1px solid ${color("black10")}`)};
`

const PlanWrapper = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
  background-color: ${color("black04")};
`

const StyledSpan = styled.span`
  font-size: 14px;
`

const ImageWrapper = styled.div<{ isDesktop: boolean }>`
  height: ${(p) => (p.isDesktop ? "700px" : "auto")};
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Tabs = styled(Flex)`
  position: relative;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
`

const TabToggle = styled.div<{ tabIndex: number }>`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: ${color("blue100")};
  z-index: 1;
  transition: 300ms ease-in;
  border-radius: 8px;
  transform: translateX(${(p) => (p.tabIndex === 0 ? "0" : "100%")});
`

const ToggleBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: 1;
`
