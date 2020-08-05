import React from "react"
import { Box, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"

const items = [
  {
    title: "Sustainability",
    text: "Reduce consumption, recycle raw textiles, and maximize the number of times our garments are worn.",
  },
  {
    title: "Transparency",
    text: "Talk about the issues within our industry, hold ourselves accountable to change, and keep an open dialogue.",
  },
  {
    title: "Perspective",
    text: "Include and embrace a wide range of perspectives to better inform product, design, and content.",
  },
  {
    title: "Community",
    text: "Create real relationships with members and bridge the communication gap between fashion and social.",
  },
]

export const AboutValues: React.FC = () => {
  return (
    <Grid>
      <Box px={[2, 0]} mx={0.5}>
        <Sans size="6" style={{ maxWidth: "80%" }}>
          Company values
        </Sans>
      </Box>
      <Spacer mb={3} />
      <Row>
        {items.map((step, index) => (
          <Col lg="3" md="6" xs="12" px={[2, 0]} key={index}>
            <Box mx={0.5}>
              <Sans size="6" color="black50" style={{ maxWidth: "80%" }}>
                {step.title}
              </Sans>
              <Spacer mb={2} />
              <Sans size="6" style={{ maxWidth: "80%" }}>
                {step.text}
              </Sans>
            </Box>
          </Col>
        ))}
      </Row>
      <Spacer mb={10} />
      <Box px={[2, 0]} mx={0.5}>
        <Sans size="3" color="black50">
          PSA: If the number of times a garment was worn were doubled, the greenhouse gas emissions over it’s lifetime
          would be 44% lower.
        </Sans>
      </Box>
      <Spacer mb={10} />
    </Grid>
  )
}
