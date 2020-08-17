import React from "react"
import { Box, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"
import { ProgressiveImage } from "../Image"

const regy = require("../../public/images/about/regy.png")
const faiyam = require("../../public/images/about/Faiyam.png")
const frank = require("../../public/images/about/francisco.png")
const jesse = require("../../public/images/about/jesse.png")
const kieran = require("../../public/images/about/Kieran.png")
const luc = require("../../public/images/about/luc.png")
const myles = require("../../public/images/about/myles.png")
const perla = require("../../public/images/about/perla.png")
const rob = require("../../public/images/about/rob.png")
const san = require("../../public/images/about/san.png")
const solea = require("../../public/images/about/solea.png")

const gridItems = [
  {
    name: "Regy Perlera",
    text: "CEO & Founder",
    image: regy,
    subText: "",
  },
  {
    name: "Luc Succes",
    text: "CTO & Co-Founder",
    image: luc,
    subText: "",
  },
  {
    name: "San Pham",
    text: "Merchandise Planning",
    image: san,
    subText: "",
  },
  {
    name: "Perla Trejo",
    text: "Operations",
    image: perla,
    subText: "",
  },
  {
    name: "Francisco Sanchez",
    text: "Finance",
    image: frank,
    subText: "",
  },
  {
    name: "Kieran Gillen",
    text: "Engineering",
    image: kieran,
    subText: "",
  },
  {
    name: "Myles Thompson",
    text: "Art direction",
    image: myles,
    subText: "",
  },
  {
    name: "Jesse Hudnutt",
    text: "Buying & Strategy",
    image: jesse,
    subText: "",
  },
  {
    name: "Faiyam Rahman",
    text: "Engineering",
    image: faiyam,
    subText: "",
  },
  {
    name: "Solea Van Heyningan",
    text: "Photography",
    image: solea,
    subText: "",
  },
  {
    name: "Rob Kelly",
    text: "Content & Social",
    image: rob,
    subText: "(Joined 1 day before quarantine)",
  },
]

export const AboutWhoWeAre: React.FC = () => {
  return (
    <Grid>
      <Spacer mb={10} />
      <Box px={[2, 2, 2, 5, 5]}>
        <Sans size="6">Who we are</Sans>
      </Box>
      <Spacer mb={1} />
      <Row px={["10px", "10px", "10px", "38px", "38px"]}>
        {gridItems.map((item, index) => (
          <Col lg="3" md="6" xs="12" px="2px" py={[0, "2px"]} key={index}>
            <Spacer mb={4} />
            <ProgressiveImage imageUrl={item.image} alt={item.name} size="small" />
            <Box mx={0.5}>
              <Sans size="3" style={{ maxWidth: "80%" }}>
                {item.name}
              </Sans>
              <Sans size="3" color="black50">
                {item.text}
              </Sans>
              {item.subText && (
                <Sans size="3" color="black50">
                  {item.subText}
                </Sans>
              )}
            </Box>
          </Col>
        ))}
      </Row>
      <Spacer mb={10} />
    </Grid>
  )
}
