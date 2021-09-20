import { Box, Display, Flex, MaxWidth, Sans, Spacer } from "components"
import { useAuthContext } from "lib/auth/AuthContext"
import React from "react"
import styled from "styled-components"
import { seasonAndYear } from "utils/seasonAndYear"
import { Media } from "../Responsive"
import { GetTheAppButton } from "components/Button/GetTheApp"
import { HeroCTA } from "./HeroCTA"
import { color } from "helpers/color"

const staticNoise = require("../../public/images/homepage/static-noise.gif")
const backgroundImageMobile = require("../../public/images/homepage/Flare-mobile-background.jpg")
const backgroundImageDesktop =
  "https://seasons-s3.imgix.net/flare/Hero-image-1.jpg?w=2000&fit=clip&retina=true&fm=webp&cs=srgb"
const fade = require("../../public/images/homepage/Hero-Fade.png")

export const DESKTOP_HERO_HEIGHT = 760
export const MOBILE_HERO_HEIGHT = 540

const Content: React.FC<{
  version: "mobile" | "desktop"
  authState: any
  userSession: any
  toggleLoginModal: (toggle: boolean) => void
}> = ({ version, authState, userSession, toggleLoginModal }) => {
  const isDesktop = version === "desktop"
  const isUserSignedIn = authState?.isSignedIn

  return (
    <Background backgroundImage={isDesktop ? backgroundImageDesktop : backgroundImageMobile}>
      <Static />
      {isDesktop && <FadeBackground />}
      <MaxWidth>
        <Flex
          width="100%"
          px={[2, 2, 2, 2, 2]}
          py={5}
          justifyContent="flex-end"
          flexDirection="column"
          height={isDesktop ? DESKTOP_HERO_HEIGHT + "px" : MOBILE_HERO_HEIGHT + "px"}
        >
          <Flex
            flexDirection={isDesktop ? "row" : "column"}
            justifyContent="space-between"
            alignItems={isDesktop ? "flex-end" : "flex-start"}
          >
            <Box>
              <Display color="white100" size={["8", "8", "10", "10", "10"]}>
                Wear. Swap. Repeat.
              </Display>
              <Spacer mb={1} />
              <Display color="black10" size={["6", "6", "7", "7", "7"]} style={{ maxWidth: "668px" }}>
                Seasons is a private rental service exploring the shared access of fashion.{" "}
                <span style={{ textDecoration: "underline", color: color("white100") }}>{seasonAndYear()}</span>{" "}
                memberships are now open.
              </Display>
            </Box>
            <Spacer mr={50} mt={5} />
            <Box width={isDesktop ? "343px" : "100%"}>
              <HeroCTA version={version} userSession={userSession} authState={authState} />
              {!isDesktop && (
                <>
                  <Spacer mb={2} />
                  <GetTheAppButton block size="large" variant="blur" />
                </>
              )}
              {!isUserSignedIn && (
                <>
                  <Spacer mb={2} />
                  <Sans size="4" color="white100" textAlign="center">
                    Already a member?{" "}
                    <span
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => toggleLoginModal(true)}
                    >
                      Sign in here
                    </span>
                  </Sans>
                </>
              )}
            </Box>
          </Flex>
        </Flex>
      </MaxWidth>
    </Background>
  )
}

export const Hero: React.FC = () => {
  const { authState, userSession, toggleLoginModal } = useAuthContext()

  return (
    <>
      <Media greaterThanOrEqual="md">
        <Content
          version="desktop"
          authState={authState}
          userSession={userSession}
          toggleLoginModal={toggleLoginModal}
        />
      </Media>
      <Media lessThan="md">
        <Content version="mobile" authState={authState} userSession={userSession} toggleLoginModal={toggleLoginModal} />
      </Media>
    </>
  )
}

const Background = styled.div<{ backgroundImage: string }>`
  width: 100%;
  position: relative;
  background: url(${(p) => p.backgroundImage}) no-repeat center center;
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

const FadeBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(${fade}) no-repeat center center;
  background-size: 90px;
  background-size: cover;
`
