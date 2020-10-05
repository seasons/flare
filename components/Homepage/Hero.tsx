import React from "react"
import styled from "styled-components"
import { Grid, Row, Col } from "../Grid"
import { Flex, Sans, Spacer, Box, MaxWidth, Picture, Separator } from "../"
import { Display } from "../Typography"
import { GetTheAppButton } from "../Button/GetTheApp"
import Link from "next/link"
import { Media } from "../Responsive"
import { Button } from "../Button"
import { Check } from "../SVGs"

const imageURL = require("../../public/images/homepage/Hero-Image-10-29-20.png")
const headerText = "Wear,Swap,Repeat"

const listText = [
  "Free shipping, returns & dry cleaning.",
  "Purchase items you love directly from the app.",
  "No commitment. Pause or cancel anytime.",
]

const DesktopTextContent = () => {
  return (
    <Box pb={5} style={{ zIndex: 3, position: "relative" }} pr={2}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
        <Flex flexDirection="column" justifyContent="center">
          <Spacer mb={10} />
          <Display size="10" color="black100" style={{ letterSpacing: "-2px" }}>
            {headerText}
          </Display>
          <Spacer mb={1} />
          <Sans size="4" color="black50" style={{ whiteSpace: "pre-line", maxWidth: "400px" }}>
            Access hundreds of styles, discover new brands, all with zero commitment. Exclusively in select cities.
          </Sans>
          <Spacer mb={4} />
          <Flex flexDirection="row">
            <Link href="/signup">
              <Button>Apply for membership</Button>
            </Link>
            <Spacer mr={1} />
            <GetTheAppButton />
          </Flex>
          <Spacer mb={4} />
          {listText.map((listItem) => (
            <Flex mb={2} key={listItem} flexDirection="row" alignItems="center">
              <Check />
              <Spacer mr={2} />
              <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                {listItem}
              </Sans>
            </Flex>
          ))}
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
            <BackgroundImage style={{ backgroundImage: `url(${post?.imageURL})` }} />
          </StyledAnchor>
        </Flex>
        <Flex pt={1} flexDirection="row" justifyContent="space-between" width="100%" alignItems="center">
          <Sans size="4" color="black50">
            — Over 500+ curated, in-season, and archive styles.
          </Sans>
          <Flex flexDirection="row" justifyContent="flex-end">
            <a href={post?.url} style={{ color: "inherit", textDecoration: "none" }}>
              <Sans size="4">{post?.name}</Sans>
            </a>
          </Flex>
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
              <Display size="10" color="black100" style={{ letterSpacing: "-2px" }}>
                {headerText}
              </Display>
              <Spacer mb={1} />
              <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                Access hundreds of styles, discover new brands, all with zero commitment.
              </Sans>
              <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                Exclusively in select cities.
              </Sans>
              <Spacer mb={4} />
              <Link href="/signup">
                <Button>Apply for membership</Button>
              </Link>
              <Spacer mb={1} />
              <GetTheAppButton block />
              <Spacer mb={4} />
              {listText.map((listItem) => (
                <Flex mb={2} key={listItem} flexDirection="row" alignItems="center">
                  <Check />
                  <Spacer mr={2} />
                  <Sans size="4" color="black50" style={{ whiteSpace: "pre-line" }}>
                    {listItem}
                  </Sans>
                </Flex>
              ))}
              <Spacer mb={2} />
              <Sans size="4" color="black50">
                — Over 500+ curated, in-season, and archive styles.
              </Sans>
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
