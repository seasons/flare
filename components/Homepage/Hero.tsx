import { Box, Flex, MaxWidth, Sans, Separator, Spacer, Header } from "components"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import { DateTime } from "luxon"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"
import { useDrawerContext } from "../../components/Drawer/DrawerContext"
import { Button } from "../Button"
import { GetTheAppButton } from "../Button/GetTheApp"
import { Col, Grid, Row } from "../Grid"
import { Media } from "../Responsive"
import { Countdown } from "@seasons/eclipse"
import { Display } from "../Typography"
import { imageResize } from "utils/imageResize"

const staticNoise = require("../../public/images/homepage/static-noise.gif")

interface HeroComponentProps {
  version: "mobile" | "desktop"
}

const MobileHero = () => {
  return (
    <Grid>
      <Row>
        <Col xs="12" px={2}>
          <Flex flexDirection="column">
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Spacer pb={6} />
              <Spacer mb={4} />
              <Spacer mb={4} />
              <HeroBottomDetailText version="mobile" />
              <Spacer mb={4} />
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Grid>
  )
}

const HeroBottomDetailText = ({ version }: HeroComponentProps) => {
  const isMobile = version === "mobile"
  const { userSession } = useAuthContext()

  let bottomDetailText
  switch (userSession?.customer?.status) {
    case "Waitlisted":
    case "Authorized":
    case "Active":
      bottomDetailText = (
        <>
          {"Have a question about membership? "}
          <a
            href="mailto:membership@seasons.nyc?subject=Hello"
            style={{ textDecoration: "underline", color: color("black100") }}
          >
            Contact Us
          </a>
        </>
      )
      break
    default:
      bottomDetailText = "— Over +1000 styles right in your pocket"
  }

  return (
    <Sans size={isMobile ? "3" : "4"} color="black50" style={{ textAlign: isMobile ? "left" : "center" }}>
      {bottomDetailText}
    </Sans>
  )
}

const MainCTA = ({ version }: HeroComponentProps) => {
  const { authState, userSession } = useAuthContext()
  const tracking = useTracking()
  const isUserSignedIn = authState?.isSignedIn

  const { openDrawer } = useDrawerContext()

  const browseData = { text: "Browse the collection", link: "/browse", actionName: "BrowseTheCollectionTapped" }
  const applyData = { text: "Apply for membership", link: "/signup", actionName: "ApplyForMembershipTapped" }

  let ctaData = browseData as any
  if (isUserSignedIn) {
    switch (userSession?.customer?.status) {
      case "Created":
        ctaData = { text: "Finish your application", link: "/signup", actionName: "FinishYourApplicationTapped" }
        break
      case "Waitlisted":
      case "Deactivated":
        ctaData = { text: "Request Access", link: "https://szns.co/requestAccess", actionName: "RequestAccessTapped" }
        break
      case "Authorized":
      case "Invited":
        ctaData = { text: "Choose your plan", link: "/signup", actionName: "ChoosePlanTapped" }
        break
      case "Paused":
        ctaData = {
          text: "Resume Membership",
          link: "/",
          actionName: "ResumeMembershipTapped",
          onClick: () => openDrawer("membershipInfo"),
        }
        break
    }
  } else {
    ctaData = applyData
  }

  return (
    <Flex flexDirection="row" justifyContent="flex-end">
      <Link href={ctaData.link}>
        <Button
          size="large"
          width="343px"
          variant="primaryWhiteNoBorder"
          onClick={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames[ctaData.actionName],
              actionType: Schema.ActionTypes.Tap,
            })
            ctaData.onClick?.()
          }}
        >
          {ctaData.text}
        </Button>
      </Link>
    </Flex>
  )
}

const DesktopHero = () => {
  return (
    <Background>
      <Static />
      <Overlay />
      <MaxWidth>
        <Flex width="100%" px={[2, 2, 2, 2, 2]} py={5} justifyContent="flex-end" flexDirection="column" height="700px">
          <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-end">
            <Header color="white100" size="11" style={{ maxWidth: "852px" }}>
              Seasons is a creative community exploring the shared access of fashion. Fall 2021 memberships are now
              open.
            </Header>
            <Spacer mr={50} />
            <MainCTA version="desktop" />
          </Flex>
        </Flex>
      </MaxWidth>
    </Background>
  )
}

export const Hero: React.FC = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopHero />
      </Media>
      <Media lessThan="md">
        <MobileHero />
      </Media>
    </>
  )
}

const Background = styled.div`
  width: 100%;
  position: relative;
  background: linear-gradient(180deg, rgba(253, 166, 137, 1) 47%, rgba(255, 203, 146, 1) 100%);
`

const Static = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.2;
  background: url(${staticNoise}) repeat center center;
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${color("black100")};
  opacity: 0.1;
`
