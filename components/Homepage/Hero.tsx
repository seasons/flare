import { Display, Flex, MaxWidth, Spacer } from "components"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import Link from "next/link"
import React from "react"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"
import { useDrawerContext } from "../../components/Drawer/DrawerContext"
import { Button } from "../Button"
import { seasonAndYear } from "utils/seasonAndYear"
import { Media } from "../Responsive"
import { GetTheAppButton } from "components/Button/GetTheApp"
import { HERO_HEIGHT } from "pages"

const staticNoise = require("../../public/images/homepage/static-noise.gif")

interface HeroComponentProps {
  version: "mobile" | "desktop"
}

const backgroundImage =
  "https://seasons-s3.imgix.net/flare/Hero-image-1.jpg?w=2000&fit=clip&retina=true&fm=webp&cs=srgb"

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

const Content: React.FC<{ version: "mobile" | "desktop" }> = ({ version }) => {
  const isDesktop = version === "desktop"
  return (
    <Background>
      <Static />
      <MaxWidth>
        <Flex
          width="100%"
          px={[2, 2, 2, 2, 2]}
          py={5}
          justifyContent="flex-end"
          flexDirection="column"
          height={HERO_HEIGHT + "px"}
        >
          <Flex flexDirection={isDesktop ? "row" : "column"} justifyContent="space-between" alignItems="flex-end">
            <Display color="white100" size={["8", "8", "11", "11", "11"]} style={{ maxWidth: "852px" }}>
              Seasons is a private rental service exploring the shared access of fashion.{" "}
              <span style={{ textDecoration: "underline" }}>{seasonAndYear()}</span> memberships are now open.
            </Display>
            <Spacer mr={50} mt={5} />
            <MainCTA version={version} />
            {!isDesktop && (
              <>
                <Spacer mb={2} />
                <GetTheAppButton block size="large" variant="blur" />
              </>
            )}
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
        <Content version="desktop" />
      </Media>
      <Media lessThan="md">
        <Content version="mobile" />
      </Media>
    </>
  )
}

const Background = styled.div`
  width: 100%;
  position: relative;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
`

const Static = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.2;
  background: url(${staticNoise}) repeat center center;
  background-size: 90px;
`
