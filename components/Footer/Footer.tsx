import { Sans, Box, Flex, Spacer, Separator } from "components"
import { color } from "../../helpers"
import { Link } from "../Link"
import { Grid, Row, Col } from "../Grid"
import { Display } from "../Typography"

export const Footer: React.FC<{ footerBottomPadding?: string | string[] }> = ({ footerBottomPadding }) => {
  return (
    <Grid pb={footerBottomPadding ? footerBottomPadding : 0}>
      <Box px={[2, 2, 2, 2, 2]}>
        <Separator />
        <Spacer mb={5} />
      </Box>
      <Row px={[2, 2, 2, 2, 2]}>
        <Col lg="2" xs="9">
          <Display size="3">Info</Display>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <Sans size="3" color="black50">
            A members-only rental platform for designer menswear & vintage goods.
          </Sans>
          <Spacer mb={[5, 5, 5, 0, 0]} />
        </Col>
        <Col lg="2" xs="12" lgOffset={4}>
          <Display size="3">Misc.</Display>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <Link href="/about">
            <Sans size="3" color="black50" style={{ textDecoration: "underline", cursor: "pointer" }}>
              About
            </Sans>
          </Link>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <a href="https://blog.seasons.nyc/creative-project" style={{ textDecoration: "none" }}>
            <Sans size="3" color="black50" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Grant
            </Sans>
          </a>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <Link href="/privacy-policy">
            <Sans size="3" color="black50" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Privacy Policy
            </Sans>
          </Link>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <Link href="/terms-of-service">
            <Sans
              size="3"
              color={color("black50")}
              pt="0.5"
              pr="3"
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Terms of Service
            </Sans>
          </Link>
          <Spacer mb={[5, 5, 5, 0, 0]} />
        </Col>
        <Col lg="2" xs="12">
          <Display size="3">Get in touch</Display>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <a href="mailto:membership@seasons.nyc?subject=Hello" style={{ textDecoration: "none" }}>
            <Sans size="3" color="black50" style={{ textDecoration: "underline", cursor: "pointer" }}>
              membership@seasons.nyc
            </Sans>
          </a>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <Sans size="3" color={color("black50")} pt="0.5" pr="3">
            New York, NY
          </Sans>
          <Spacer mb={[5, 5, 5, 0, 0]} />
        </Col>
        <Col lg="2" xs="12">
          <Display size="3">Follow us</Display>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <a href="https://www.instagram.com/seasons.ny/" target="_blank" style={{ textDecoration: "none" }}>
            <Sans
              size="3"
              color={color("black50")}
              pt="0.5"
              pr="3"
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Instagram
            </Sans>
          </a>
          <Spacer mb={[1, 1, 1, 2, 2]} />
          <a href="https://www.instagram.com/seasons.ny/" target="_blank" style={{ textDecoration: "none" }}>
            <Sans
              size="3"
              color={color("black50")}
              pt="0.5"
              pr="3"
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Twitter
            </Sans>
          </a>
          <Spacer mb={[5, 5, 5, 0, 0]} />
        </Col>
      </Row>
      <Spacer mb={[0, 0, 0, "124px", "124px"]} />
      <Flex flexDirection={["column", "row"]} width="100%" justifyContent="space-between" px={[2, 2, 2, 2, 2]}>
        <Display size="3">© 2020 Seasons. All Rights Reserved.</Display>
        <Display size="3">Made remotely with love ❤️</Display>
      </Flex>
      <Spacer mb={5} />
    </Grid>
  )
}
