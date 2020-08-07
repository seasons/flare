import { Sans, Box, Flex, Spacer, Separator } from "../"
import { color } from "../../helpers"
import { Link } from "../Link"
import styled from "styled-components"
import { Grid, Row, Col } from "../Grid"

export const Footer: React.FC<{ footerBottomPadding?: string | string[] }> = ({ footerBottomPadding }) => {
  return (
    <Grid pb={footerBottomPadding ? footerBottomPadding : 0}>
      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
        <Spacer mb={5} />
      </Box>
      <Row px={[2, 2, 2, 5, 5]}>
        <Col lg="2" xs="9">
          <Sans size="3">Info</Sans>
          <Spacer mb={[1, 2]} />
          <Sans size="3" color="black50">
            A members-only rental platform for designer menswear & streetwear.
          </Sans>
          <Spacer mb={[3, 0]} />
        </Col>
        <Col lg="2" xs="12" lgOffset={4}>
          <Sans size="3">Misc.</Sans>
          <Spacer mb={[1, 2]} />
          <Link href="/privacy-policy">
            <Sans size="3" color="black50">
              Privacy Policy
            </Sans>
          </Link>
          <Spacer mb={[1, 2]} />
          <Link href="/terms-of-service">
            <Sans size="3" color={color("black50")} pt="0.5" pr="3">
              Terms of Service
            </Sans>
          </Link>
          <Spacer mb={[3, 0]} />
        </Col>
        <Col lg="2" xs="12">
          <Sans size="3">Get in touch</Sans>
          <Spacer mb={[1, 2]} />
          <a href="mailto:membership@seasons.nyc?subject=Hello" style={{ textDecoration: "none" }}>
            <Sans size="3" color="black50">
              membership@seasons.nyc
            </Sans>
          </a>
          <Spacer mb={[1, 2]} />
          <Sans size="3" color={color("black50")} pt="0.5" pr="3">
            New York, NY
          </Sans>
          <Spacer mb={[3, 0]} />
        </Col>
        <Col lg="2" xs="12">
          <Sans size="3">Follow us</Sans>
          <Spacer mb={[1, 2]} />
          <a href="https://www.instagram.com/seasons.ny/" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" color={color("black50")} pt="0.5" pr="3">
              Instagram
            </Sans>
          </a>
          <Spacer mb={[1, 2]} />
          <a href="https://www.instagram.com/seasons.ny/" target="_blank" style={{ textDecoration: "none" }}>
            <Sans size="3" color={color("black50")} pt="0.5" pr="3">
              Twitter
            </Sans>
          </a>
        </Col>
      </Row>
      <Spacer mb={[3, "164px"]} />
      <Flex flexDirection={["column", "row"]} width="100%" justifyContent="space-between" px={[2, 2, 2, 5, 5]}>
        <Sans size="3">© 2020 Seasons. All Rights Reserved.</Sans>
        <Sans size="3">Made remotely with love ❤️</Sans>
      </Flex>
      <Spacer mb={5} />
    </Grid>
  )
}
