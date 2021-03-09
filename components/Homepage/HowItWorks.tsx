import React from "react"
import { Box, Sans, Spacer } from "../"
import { Display } from "../Typography"
import { Grid, Row, Col } from "../Grid"
import { Media } from "../Responsive"

export const HOW_IT_WORKS_TEXT = [
  {
    title: "1. Reserve your favorite styles",
    text: "Reserve up to 5 pieces at a time. Save your favorites for later & build a queue.",
  },
  {
    title: "2. Wear as long as you want",
    text: "Try styles you want to buy without the commitment or buyers remorse. ",
  },
  {
    title: "3. Swap & repeat",
    text: "Ready for something new? Send back your bag & place a new order.",
  },
  {
    title: "4. Buy styles you love",
    text: "Enjoy exclusive access to our archive sale & own your favorites.",
  },
]

const Item = ({ step, index }) => {
  return (
    <Box key={index}>
      {index > 0 && <Spacer mb={[5, 5, 0, 0, 0]} />}
      <Spacer mb={1} />
      <Display size="4" style={{ textAlign: "center" }}>
        {step.title}
      </Display>
      <Spacer mb={1} />
      <Sans size="4" color="black50" style={{ textAlign: "center" }}>
        {step.text}
      </Sans>
    </Box>
  )
}

// FIXME: learn more goes where?

export const HowItWorks: React.FC = () => {
  return (
    <Grid>
      <Box px={[2, 2, 2, 5, 5]} pb={4}>
        <Sans size="9" style={{ textAlign: "center" }}>
          How it works
        </Sans>
        <Spacer mb={1} />
        <Sans size="4" color="black50" style={{ textAlign: "center" }}>
          No commitment, pause or cancel anytime.{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={null}>
            Learn more
          </span>
        </Sans>
      </Box>
      <Media greaterThanOrEqual="lg">
        <Row px={[2, 2, 2, 5, 5]}>
          {HOW_IT_WORKS_TEXT?.map((step, index) => (
            <Col md="3" xs="12" key={index} px={3}>
              <Item index={index} step={step} />
            </Col>
          ))}
        </Row>
      </Media>
      <Media lessThan="lg">
        <Row px={[2, 2, 2, 5, 5]}>
          {HOW_IT_WORKS_TEXT?.map((step, index) => (
            <Col md="6" xs="12" key={index} px={3}>
              <Item index={index} step={step} />
            </Col>
          ))}
        </Row>
      </Media>
    </Grid>
  )
}
