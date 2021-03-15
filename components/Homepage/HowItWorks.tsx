import React from "react"
import { Box, Flex, Sans, Spacer } from "components"
import { Display } from "../Typography"
import { Grid, Row, Col } from "../Grid"
import { Media } from "../Responsive"
import { BuyIcon, SwapIcon, WearIcon, ReserveIcon } from "components/Icons"

export const HOW_IT_WORKS_TEXT = [
  {
    icon: <ReserveIcon />,
    title: "Reserve your favorite styles",
    text: "Reserve up to 3 pieces at a time. Save your favorites for later & build a queue.",
  },
  {
    icon: <WearIcon />,
    title: "Wear as long as you want",
    text: "Try styles you want to buy without the commitment or buyers remorse. ",
  },
  {
    icon: <SwapIcon />,
    title: "Swap & repeat",
    text: "Ready for something new? Send back your bag & place a new order.",
  },
  {
    icon: <BuyIcon />,
    title: "Buy styles you love",
    text: "Enjoy exclusive access to our archive sale & own your favorites.",
  },
]

const Item = ({ step, index }) => {
  return (
    <Box key={index}>
      {index > 0 && <Spacer mb={[5, 5, 0, 0, 0]} />}
      <Flex justifyContent="center">{step.icon}</Flex>
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

export const HowItWorks: React.FC = () => {
  return (
    <Grid>
      <Box px={[2, 2, 2, 5, 5]} pb={6}>
        <Display size="9" style={{ textAlign: "center" }}>
          How it works
        </Display>
        <Spacer mb={1} />
        <Sans size="4" color="black50" style={{ textAlign: "center" }}>
          No commitment, pause or cancel anytime.
        </Sans>
      </Box>
      <Media greaterThanOrEqual="lg">
        <Row px={[2, 2, 2, 5, 5]}>
          {HOW_IT_WORKS_TEXT?.map((step, index) => (
            <Col md="3" xs="12" key={index} px={2}>
              <Item index={index} step={step} />
            </Col>
          ))}
        </Row>
      </Media>
      <Media lessThan="lg">
        <Row px={[2, 2, 2, 5, 5]}>
          {HOW_IT_WORKS_TEXT?.map((step, index) => (
            <Col md="6" xs="12" key={index} px={3} pt={2}>
              <Item index={index} step={step} />
            </Col>
          ))}
        </Row>
      </Media>
    </Grid>
  )
}
