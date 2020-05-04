import React from "react"
import { Box, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"
import { color } from "../../helpers"
import { Separator } from "../Separator"
import { Media } from "../Responsive"

const backers = [
  {
    name: "Intialized Capital",
    link: "",
  },
  {
    name: "Kindred Ventures",
    link: "",
  },
  {
    name: "Notation",
    link: "",
  },
  {
    name: "Boxgroup",
    link: "",
  },
  {
    name: "WndrCo",
    link: "",
  },
  {
    name: "Rogue Capital",
    link: "",
  },
  {
    name: "Nas",
    link: "",
  },
]

const ContactContent = () => {
  return (
    <>
      <Sans size="6">Interested in what we’re building or just want just want to say hi? Contact us below</Sans>
      <Spacer mb={2} />
      <Sans size="3">Email</Sans>
      <a href="mailto:membership@seasons.nyc?subject=Hello" style={{ color: color("black100") }}>
        <Sans size="6">membership@seasons.nyc</Sans>
      </a>
      <Spacer mb={2} />
      <Sans size="3">Instagram</Sans>
      <a href="https://www.instagram.com/seasons.ny" style={{ color: color("black100") }}>
        <Sans size="6">seasons.ny</Sans>
      </a>
      <Spacer mb={2} />
      <Sans size="3">Twitter</Sans>
      <a href="https://twitter.com/seasons_ny" style={{ color: color("black100") }}>
        <Sans size="6">seasons_ny</Sans>
      </a>
    </>
  )
}

export const AboutFooter: React.FC = () => {
  return (
    <>
      <Separator />
      <Grid>
        <Row>
          <Col md="6" xs="12">
            <Box py={5} px={[2, 5]} style={{ width: "100%" }}>
              <Sans size="6">Who we’re backed by</Sans>
              <Spacer mb={5} />
              {backers.map((backer) => (
                <Box key={backer.name}>
                  <a href={backer.link} target="_blank" style={{ color: color("black100") }}>
                    <Sans size="6" style={{ maxWidth: "80%" }}>
                      {backer.name}
                    </Sans>
                  </a>
                </Box>
              ))}
            </Box>
          </Col>
          <Col md="6" xs="12">
            <Media greaterThanOrEqual="md">
              <Box style={{ borderLeft: `1px solid ${color("black15")}`, width: "100%" }} p={5}>
                <ContactContent />
              </Box>
            </Media>
            <Media lessThan="md">
              <Box style={{ width: "100%" }} px={2} pb={5}>
                <ContactContent />
              </Box>
            </Media>
          </Col>
        </Row>
      </Grid>
    </>
  )
}
