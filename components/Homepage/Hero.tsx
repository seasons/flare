import { Box, Flex, MaxWidth, Sans, Separator, Spacer } from "components"
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

interface HeroComponentProps {
  version: "mobile" | "desktop"
}

const DesktopTextContent = () => {
  return (
    <Flex style={{ position: "relative", width: "50%" }} flexDirection="column" justifyContent="center">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" justifyContent="center" alignContent="center" px={3}>
          <Spacer mb={[10, 0, 0, 0, 0]} />
          <HeroHeaderText version="desktop" />
          <Spacer mb="12px" />
          <HeroCaptionText version="desktop" />
          <Spacer mb={4} />
          <HeroCTAs version="desktop" />
          <Spacer mb={4} />
          <HeroBottomDetailText version="desktop" />
        </Flex>
      </Flex>
    </Flex>
  )
}

const DesktopHero = ({ post }) => {
  
  const imageSRC = imageResize(post?.image?.url ?? "", "large")

  return (
    <MaxWidth>
      <Box width="100%" px={[2, 2, 2, 2, 2]} pb={2}>
        <Flex flexDirection="row" justifyContent="space-between">
          <DesktopTextContent />
          <Link href={`/blog/${post.slug}`}>
            <ImageWrapper>
              <BackgroundImage style={{ backgroundImage: `url(${imageSRC})`, position: "relative" }}>
                <Box
                  style={{ backgroundColor: color("white100"), position: "absolute", bottom: 0, right: 0 }}
                  pl={0.5}
                  py={0.5}
                >
                  <Sans size="4">{post?.name}</Sans>
                </Box>
              </BackgroundImage>
            </ImageWrapper>
          </Link>
        </Flex>
      </Box>
    </MaxWidth>
  )
}

const MobileHero = ({ post }) => {
  const imageSRC = imageResize(post?.image?.url ?? "", "medium")

  return (
    <Grid>
      <Row>
        <Col xs="12" px={2}>
          <Flex flexDirection="column">
            <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center">
              <Spacer pb={6} />
              <HeroHeaderText version="mobile" />
              <Spacer mb={1} />
              <HeroCaptionText version="mobile" />
              <Spacer mb={4} />
              <HeroCTAs version="mobile" />
              <Spacer mb={4} />
              <HeroBottomDetailText version="mobile" />
              <Spacer mb={4} />
              <MobileImageWrapper>
                <Link href={`/blog/${post.slug}`}>
                  <BackgroundImage style={{ backgroundImage: `url(${imageSRC})` }}>
                    <Box
                      style={{ backgroundColor: color("white100"), position: "absolute", bottom: 0, right: 0 }}
                      pl={0.5}
                      py={0.5}
                    >
                      <Sans size="4">{post?.name}</Sans>
                    </Box>
                  </BackgroundImage>
                </Link>
              </MobileImageWrapper>
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

const HeroHeaderText = ({ version }: HeroComponentProps) => {
  const { userSession } = useAuthContext()
  const [targetDate, setTargetDate] = useState(null)
  const isMobile = version === "mobile"

  useEffect(() => {
    if (!!userSession) {
      setTargetDate(DateTime.fromISO(userSession?.customer?.admissions?.authorizationWindowClosesAt))
    }
  }, [userSession])

  let headerText = "Wear.Swap.Repeat." as any
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
      size="8"
      color="black100"
      style={{ letterSpacing: "-2px", maxWidth: "600px", textAlign: isMobile ? "left" : "center" }}
    >
      {headerText}
    </Display>
  )
}

const HeroCaptionText = ({ version }) => {
  const { userSession } = useAuthContext()
  const isMobile = version === "mobile"

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
    <Flex width="100%" flexDirection="row" justifyContent="center">
      <Sans
        size={isMobile ? "6" : "4"}
        color="black50"
        style={{ whiteSpace: "pre-line", maxWidth: "400px", textAlign: isMobile ? "left" : "center" }}
      >
        {caption}
      </Sans>
    </Flex>
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
    <Flex width="100%" flexDirection="row" justifyContent="center">
      <Flex flexDirection="column" style={{ maxWidth: "400px", width: "100%" }}>
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
    </Flex>
  )
}

export const Hero: React.FC<{ post: any }> = ({ post }) => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopHero post={post} />
        <Box px={[2, 2, 2, 2, 2]}>
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

const ImageWrapper = styled.div`
  width: 50%;
  cursor: pointer;
  max-width: 800px;
`
