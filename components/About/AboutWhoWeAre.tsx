import React from "react"
import { Box, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"
import { imageResize } from "../../utils/imageResize"
import { FLARE_IMGIX_BASE } from "../../helpers/constants"
import { ProgressiveImage } from "../Image"

const gridItems = [
  {
    name: "Regy Perlera",
    text: "CEO & Founder",
    image: `${FLARE_IMGIX_BASE}/regy.png`,
    subText: "",
  },
  {
    name: "Luc Succes",
    text: "CTO & Co-Founder",
    image: `${FLARE_IMGIX_BASE}/luc.png`,
    subText: "",
  },
  {
    name: "San Pham",
    text: "Merchandise Planning",
    image: `${FLARE_IMGIX_BASE}/san.png`,
    subText: "",
  },
  {
    name: "Perla Trejo",
    text: "Operations",
    image: `${FLARE_IMGIX_BASE}/perla.png`,
    subText: "",
  },
  {
    name: "Francisco Sanchez",
    text: "Finance",
    image: `${FLARE_IMGIX_BASE}/francisco.png`,
    subText: "",
  },
  {
    name: "Kieran Gillen",
    text: "Engineering",
    image: `${FLARE_IMGIX_BASE}/Kieran.png`,
    subText: "",
  },
  {
    name: "Myles Thompson",
    text: "Art direction",
    image: `${FLARE_IMGIX_BASE}/myles.png`,
    subText: "",
  },
  {
    name: "Jesse Hudnutt",
    text: "Buying & Strategy",
    image: `${FLARE_IMGIX_BASE}/jesse.png`,
    subText: "",
  },
  {
    name: "Faiyam Rahman",
    text: "Engineering",
    image: `${FLARE_IMGIX_BASE}/Faiyam.png`,
    subText: "",
  },
  {
    name: "Solea Van Heyningan",
    text: "Photography",
    image: `${FLARE_IMGIX_BASE}/solea.png`,
    subText: "",
  },
  {
    name: "Rob Kelly",
    text: "Content & Social",
    image: `${FLARE_IMGIX_BASE}/rob.png`,
    subText: "(Joined 1 day before quarantine)",
  },
]

export const AboutWhoWeAre: React.FC = () => {
  return (
    <Grid>
      <Spacer mb={10} />
      <Box px={[2, 0]} mx={0.5}>
        <Sans size="6">Who we are</Sans>
      </Box>
      <Spacer mb={1} />
      <Row>
        {gridItems.map((item, index) => (
          <Col lg="3" md="6" xs="12" px={[2, "2px"]} py={[0, "2px"]} key={index}>
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
