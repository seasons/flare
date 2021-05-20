import { Sans, Box, Flex, Spacer, Separator, Media } from "components"
import { color } from "../../helpers"
import { Link } from "../Link"
import { Grid, Row, Col } from "../Grid"
import React from "react"
import styled from "styled-components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { SeasonsLogo } from "components/Nav/SeasonsLogo"
import { SeasonsLogoIcon } from "components/Icons/SeasonsLogoIcon"

export const Footer: React.FC<{ footerBottomPadding?: string | string[]; brandItems: any }> = ({
  footerBottomPadding,
  brandItems = [],
}) => {
  const { openDrawer } = useDrawerContext()
  const resortedBrands = [...brandItems, { name: "View all", slug: "all" }]

  return (
    <Grid pb={footerBottomPadding ? footerBottomPadding : 0}>
      <Box px={[2, 2, 2, 2, 2]}>
        <Separator />
        <Spacer mb={5} />
      </Box>
      <Row px={[2, 2, 2, 2, 2]}>
        <Col lg="2" md="4" sm="6">
          <Sans size="3" color="black50">
            Membership
          </Sans>
          <Spacer mb={1} />
          <Link href="/signup">
            <Sans size="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Choose a plan
            </Sans>
          </Link>
          <Spacer mb={1} />
          <Link href="/browse/all+all">
            <Sans size="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Browse
            </Sans>
          </Link>
          <Spacer mb={1} />
          <div onClick={() => openDrawer("faq")}>
            <Sans size="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              FAQ
            </Sans>
          </div>
          <Spacer mb={1} />
          <a href="mailto:membership@seasons.nyc?subject=Question" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" pr="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Ask a question
            </Sans>
          </a>
          <Spacer mb={[5, 5, 5, 0, 0]} />
        </Col>
        <Col lg="2" md="4" sm="6">
          <Sans size="3" color="black50">
            Seasons
          </Sans>
          <Spacer mb={1} />
          <Link href="/about">
            <Sans size="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              About us
            </Sans>
          </Link>
          <Spacer mb={1} />
          <Link href="/blog">
            <Sans size="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Blog
            </Sans>
          </Link>
          <Spacer mb={1} />
          <a href="mailto:membership@seasons.nyc?subject=Careers" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" pr="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Careers
            </Sans>
          </a>
          <Spacer mb={1} />
          <a href="mailto:membership@seasons.nyc?subject=Wholesale" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" pr="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Wholesale
            </Sans>
          </a>
          <Spacer mb={[5, 5, 5, 0, 0]} />
        </Col>
        <Col lg="2" md="4" xs="12">
          <Sans color="black50" size="3">
            Contact
          </Sans>
          <Spacer mb={1} />
          <a href="https://www.instagram.com/seasons.ny/" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" pr="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Instagram
            </Sans>
          </a>
          <Spacer mb={1} />
          <a href="https://www.instagram.com/seasons.ny/" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" pr="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Twitter
            </Sans>
          </a>
          <Spacer mb={1} />
          <a href="https://www.tiktok.com/@seasons.ny" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" pr="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              TikTok
            </Sans>
          </a>
          <Spacer mb={1} />
          <a href="mailto:membership@seasons.nyc?subject=Hello" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" pr="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Email
            </Sans>
          </a>
          <Spacer mb={[5, 5, 5, 0, 0]} />
        </Col>
        <Col lg="6" xs="12">
          <Sans size="3" color={color("black50")} pr="3">
            Designers
          </Sans>
          <Spacer mb={1} />
          <Media greaterThanOrEqual="md">
            <DesktopBrandsContainer>
              {resortedBrands?.map(({ name, slug }, index) => {
                return (
                  <Link href={slug === "all" ? "/browse/all+all" : `/designer/${slug}`} key={index} prefetch={false}>
                    <Sans size={3} style={{ textDecoration: "underline", cursor: "pointer" }}>
                      {name}
                    </Sans>
                    <Spacer mb={1} />
                  </Link>
                )
              })}
            </DesktopBrandsContainer>
          </Media>
          <Media lessThan="md">
            <MobileBrandsContainer>
              {resortedBrands?.map(({ name, slug }, index) => {
                return (
                  <Link href={slug === "all" ? "/browse/all+all" : `/designer/${slug}`} key={index}>
                    <Box mr={4}>
                      <Sans size={3} style={{ textDecoration: "underline", cursor: "pointer" }}>
                        {name}
                      </Sans>
                    </Box>
                    <Spacer mb={1} />
                  </Link>
                )
              })}
            </MobileBrandsContainer>
          </Media>
        </Col>
      </Row>
      <Spacer mb={[5, 5, 5, "132px", "132px"]} />
      <Flex
        flexDirection={["column", "row"]}
        width="100%"
        justifyContent="flex-start"
        alignItems={["flex-start", "center"]}
        px={[2, 2, 2, 2, 2]}
      >
        <Sans size="3">© 2021 Seasons. All Rights Reserved.</Sans>
        <Spacer mr={5} />
        <Link href="/privacy-policy">
          <Spacer mt={[1, 1, 1, 0, 0]} />
          <Sans size="3" style={{ textDecoration: "underline", cursor: "pointer" }}>
            Privacy Policy
          </Sans>
        </Link>
        <Spacer mr={5} />
        <Link href="/terms-of-service">
          <Spacer mt={[1, 1, 1, 0, 0]} />
          <Sans size="3" pr="3" style={{ textDecoration: "underline", cursor: "pointer" }}>
            Terms of Service
          </Sans>
        </Link>
      </Flex>
      <Spacer mb={4} />
    </Grid>
  )
}

const DesktopBrandsContainer = styled(Box)`
  column-count: 4;
  column-gap: 48px;
`

const MobileBrandsContainer = styled(Box)`
  column-count: 2;
  column-gap: 0px;
`
