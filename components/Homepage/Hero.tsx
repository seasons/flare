import { Box, Display, Flex, MaxWidth, Sans, Spacer, Picture } from "components"
import { useAuthContext } from "lib/auth/AuthContext"
import React from "react"
import styled from "styled-components"
import { Media } from "../Responsive"
import { GetTheAppButton } from "components/Button/GetTheApp"
import { MembershipCTA } from "./MembershipCTA"
import { imageResize } from "utils/imageResize"
import { Col, Grid, Row } from "components/Grid"
import { themeProps } from "lib/theme"

const heroImage = require("../../public/images/homepage/hero/Hero-Background-Image.jpg")

export const DESKTOP_HERO_HEIGHT = 760
export const MOBILE_HERO_HEIGHT = 556

const backgroundColor = "#D7DFEE"

const Content: React.FC<{
  version: "mobile" | "desktop"
  authState: any
  userSession: any
  toggleLoginModal: (toggle: boolean) => void
}> = ({ version, authState, userSession, toggleLoginModal }) => {
  const isDesktop = version === "desktop"
  const isUserSignedIn = authState?.isSignedIn

  return (
    <Flex
      flex={1}
      flexDirection="column"
      justifyContent="space-between"
      height={isDesktop ? "715px" : "auto"}
      py={5}
      px={isDesktop ? 0 : 2}
      style={{ backgroundColor }}
    >
      <Box />
      <Box>
        <Display color="black100" size={["7", "7", "9", "9", "9"]}>
          Rent it, wear it, love it,
        </Display>
        <Display color="black100" size={["7", "7", "9", "9", "9"]}>
          buy it or swap it out.
        </Display>
        <Spacer mb={2} />
        <Sans color="black50" size="4" style={{ maxWidth: "370px" }}>
          Exclusive rent-to-own access to over 1,000+ styles. A new way to discover, wear, & buy.
        </Sans>
        <Spacer mb={4} />
        <Flex flexDirection={isDesktop ? "row" : "column"}>
          <MembershipCTA variant="blue" block={!isDesktop} userSession={userSession} authState={authState} />
          <Spacer mr={isDesktop ? 2 : 0} mt={isDesktop ? 0 : 1} />
          <GetTheAppButton size="large" variant="primaryWhiteNoBorder" block={!isDesktop} />
        </Flex>
      </Box>
      <Box mt={isDesktop ? 0 : 3}>
        {!isUserSignedIn && (
          <Sans size="4" color="black100">
            Already a member?{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => toggleLoginModal(true)}>
              Sign in
            </span>
          </Sans>
        )}
      </Box>
    </Flex>
  )
}

export const Hero: React.FC = () => {
  const { authState, userSession, toggleLoginModal } = useAuthContext()

  return (
    <HeroWrapper>
      <ImageWrapper>
        <BackgroundImage />
      </ImageWrapper>
      <MaxWidth>
        <Media greaterThanOrEqual="lg">
          <Box px={2}>
            <Content
              version="desktop"
              authState={authState}
              userSession={userSession}
              toggleLoginModal={toggleLoginModal}
            />
          </Box>
        </Media>
        <Media lessThan="lg">
          <Grid>
            <Row>
              <Col lg="6" sm="12">
                <MobileImageWrapper>
                  <Picture src={imageResize(heroImage, "large")} />
                </MobileImageWrapper>
              </Col>
              <Col lg="6" sm="12">
                <Content
                  version="mobile"
                  authState={authState}
                  userSession={userSession}
                  toggleLoginModal={toggleLoginModal}
                />
              </Col>
            </Row>
          </Grid>
        </Media>
      </MaxWidth>
    </HeroWrapper>
  )
}

const MobileImageWrapper = styled(Box)`
  img {
    width: 100vw;
    height: 100vw;
    object-fit: cover;
  }
`

const ImageWrapper = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  height: 715px;
  width: 50%;

  @media ${themeProps.mediaQueries.xs} {
    display: none;
  }
`

const BackgroundImage = styled(Box)`
  background: url(${heroImage}) no-repeat center center;
  background-size: cover;
  height: 100%;
  width: 100%;
`

const HeroWrapper = styled(Flex)`
  background-color: ${backgroundColor};
  width: 100%;
  position: relative;
`
