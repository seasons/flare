import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useDrawerContext } from "../../components/Drawer/DrawerContext"
import { Grid, Row, Col } from "../Grid"
import { Flex, Sans, Spacer, Box, MaxWidth, Picture, Separator } from "../"
import { Display } from "../Typography"
import { GetTheAppButton } from "../Button/GetTheApp"
import Link from "next/link"
import { Media } from "../Responsive"
import { Button } from "../Button"
import { Check } from "../SVGs"
import { useAuthContext } from "lib/auth/AuthContext"
import { Countdown } from "@seasons/eclipse"
import { DateTime } from "luxon"
import { Schema, useTracking } from "utils/analytics"
import { color } from "helpers"

interface HeroComponentProps {
  version: "mobile" | "desktop"
}

const DesktopTextContent = () => {
  return (
    <Box style={{ position: "relative", width: "50%" }}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
        <Flex flexDirection="column" justifyContent="center" alignContent="center">
          <Spacer mb={10} />
          <HeroHeaderText version="desktop" />
          <Spacer mb={1} />
          <HeroCaptionText />
          <Spacer mb={4} />
          <HeroCTAs version="desktop" />
          <Spacer mb={4} />
          <HeroBottomDetailText version="desktop" />
        </Flex>
      </Flex>
    </Box>
  )
}

const DesktopHero = ({ post }) => {
  return (
    <MaxWidth>
      <Box width="100%" px={[2, 2, 2, 5, 5]} pb={5}>
        <Flex flexDirection="row" justifyContent="space-between">
          <DesktopTextContent />
          <StyledAnchor href={post?.url}>
            <BackgroundImage style={{ backgroundImage: `url(${post?.imageURL})`, position: "relative" }}>
              <Box
                style={{ backgroundColor: color("white100"), position: "absolute", bottom: 0, right: 0 }}
                pl={0.5}
                py={0.5}
              >
                <Sans size="4">{post?.name}</Sans>
              </Box>
            </BackgroundImage>
          </StyledAnchor>
        </Flex>
      </Box>
    </MaxWidth>
  )
}

const MobileHero = ({ post }) => {
  return (
    <Grid>
      <Row>
        <Col xs="12" px={2}>
          <Flex flexDirection="column">
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Spacer mb={10} />
              <HeroHeaderText version="mobile" />
              <Spacer mb={1} />
              <HeroCaptionText />
              <Spacer mb={4} />
              <HeroCTAs version="mobile" />
              <Spacer mb={4} />
              <HeroBottomDetailText version="mobile" />
              <Spacer mb={4} />
              <MobileImageWrapper>
                <StyledAnchor href={post?.url}>
                  <BackgroundImage style={{ backgroundImage: `url(${post?.imageURL})` }} />
                </StyledAnchor>
              </MobileImageWrapper>
              <Flex flexDirection="row" justifyContent="flex-end">
                <a href={post?.url} style={{ color: "inherit", textDecoration: "none" }}>
                  <Sans size="4">{post?.name}</Sans>
                </a>
              </Flex>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Grid>
  )
}

const HeroBottomDetailText = ({ version }: HeroComponentProps) => {
  const { userSession } = useAuthContext()

  let bottomDetailText
  switch (userSession?.customer?.status) {
    case "Waitlisted":
    case "Authorized":
    case "Active":
      bottomDetailText = (
        <>
          {"Have a question about membership? "}
          {/* TODO: Add a mailto link here */}
          <a style={{ textDecoration: "underline" }}>Contact Us</a>
        </>
      )
      break
    default:
      bottomDetailText = "— Over +1000 styles right in your pocket"
  }

  return (
    <Sans size={version === "mobile" ? "3" : "4"} color="black50" style={{ textAlign: "center" }}>
      {bottomDetailText}
    </Sans>
  )
}

const HeroHeaderText = ({ version }: HeroComponentProps) => {
  const { userSession } = useAuthContext()
  const [targetDate, setTargetDate] = useState(null)

  useEffect(() => {
    if (!!userSession) {
      setTargetDate(DateTime.fromISO(userSession?.customer?.admissions?.authorizationWindowClosesAt))
    }
  }, [userSession])

  let headerText = "Wear,Swap,Repeat" as any
  let firstName = userSession?.user?.firstName || ""
  const youreStart = firstName !== "" ? "Hi " + firstName + ", you're" : "You're"
  const yourStart = firstName !== "" ? "Hi " + firstName + ", your" : "Your"
  switch (userSession?.customer?.status) {
    case "Authorized":
      if (!!targetDate) {
        headerText = (
          <>
            {`${youreStart} in. You have`} <Countdown underline display="inline" targetDate={targetDate} />{" "}
            {"to choose your plan."}
          </>
        )
      } else {
        headerText = `${youreStart} in.`
      }
      break
    case "Waitlisted":
      if (userSession?.customer?.admissions?.authorizationsCount > 0) {
        headerText = `${yourStart} sign-up window has closed.`
      }
      break
  }

  return (
    <Display
      size={version === "desktop" ? "8" : "9"}
      color="black100"
      style={{ letterSpacing: "-2px", maxWidth: "600px", textAlign: "center" }}
    >
      {headerText}
    </Display>
  )
}

const HeroCaptionText = () => {
  const { userSession } = useAuthContext()

  let caption = "A members-only rental service for designer menswear."
  switch (userSession?.customer?.status) {
    case "Authorized":
      caption = "Finish setting up your account and choose your plan"
      break
    case "Waitlisted":
      if (userSession?.customer?.admissions?.authorizationsCount > 0) {
        caption = "We've had to pass along your invite and you're back on the waitlist."
      }
      break
  }

  return (
    <Sans size="4" color="black50" style={{ whiteSpace: "pre-line", maxWidth: "400px", textAlign: "center" }}>
      {caption}
    </Sans>
  )
}

const HeroCTAs = ({ version }: HeroComponentProps) => {
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
    <Flex flexDirection="column">
      <Link href={ctaData.link}>
        <Button
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
      <Spacer mb={1} />
      <GetTheAppButton block />
    </Flex>
  )
}

export const Hero: React.FC<{ post: any }> = ({ post }) => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopHero post={post} />
        <Box px={[2, 2, 2, 5, 5]}>
          <Separator />
        </Box>
      </Media>
      <Media lessThan="md">
        <MobileHero post={post} />
      </Media>
    </>
  )
}

const BackgroundImage = styled(Box)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding-bottom: 100%;
  width: 100%;
  height: 0;
`

const MobileImageWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  width: 100%;
  img {
    width: 100%;
  }
`

const StyledAnchor = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  width: 50%;
  max-width: 800px;
  min-height: 450px;
`
