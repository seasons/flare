import { Box, Display, Flex, MaxWidth, Sans, Spacer, Picture } from "components"
import { useAuthContext } from "lib/auth/AuthContext"
import React from "react"
import styled from "styled-components"
import { Media } from "../Responsive"
import { GetTheAppButton } from "components/Button/GetTheApp"
import { MembershipCTA } from "./MembershipCTA"
import { color } from "helpers/color"
import { imageResize } from "utils/imageResize"
import { Col, Grid, Row } from "components/Grid"
import { themeProps } from "lib/theme"

const heroImage = require("../../public/images/homepage/hero/JW-Hero-Image.jpg")

export const DESKTOP_HERO_HEIGHT = 760
export const MOBILE_HERO_HEIGHT = 556

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
      style={{ backgroundColor: color("darkGreen") }}
    >
      <Box />
      <Box>
        <Display color="white100" size={["7", "7", "9", "9", "9"]}>
          Rent it, wear it, love it,
        </Display>
        <Display color="white100" size={["7", "7", "9", "9", "9"]}>
          buy it or swap it out.
        </Display>
        <Spacer mb={2} />
        <Sans color="black25" size="4" style={{ maxWidth: "320px" }}>
          Exclusive rent-to-own access to over 1,000+ designer styles. A new way to discover, wear, & buy.
        </Sans>
        <Spacer mb={4} />
        <Flex flexDirection={isDesktop ? "row" : "column"}>
          <MembershipCTA variant="green" block={!isDesktop} userSession={userSession} authState={authState} />
          <Spacer mr={isDesktop ? 2 : 0} mt={isDesktop ? 0 : 1} />
          <GetTheAppButton size="large" variant="blur" block={!isDesktop} />
        </Flex>
      </Box>
      <Box mt={isDesktop ? 0 : 3}>
        {!isUserSignedIn && (
          <Sans size="4" color="white100">
            Already a member?{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => toggleLoginModal(true)}>
              Sign in here
            </span>
          </Sans>
        )}
      </Box>
    </Flex>
  )
}

const HeroImage = () => {
  return <Picture style={{ width: "100%", height: "auto" }} src={imageResize(heroImage, "large")} />
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
                <HeroImage />
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
  background-color: ${color("darkGreen")};
  width: 100%;
  position: relative;
`
