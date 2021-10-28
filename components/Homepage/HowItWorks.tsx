import { Box, Flex, Sans, Spacer } from "components"
import {
  BillingIcon, CalendarIcon, DiscordIcon, HeartIcon, MembershipCardIcon, SwapIcon
} from "components/Icons"
import React from "react"

import { Col, Grid, Row } from "../Grid"
import { Media } from "../Responsive"
import { Display } from "../Typography"

export const HOW_IT_WORKS_TEXT = [
  {
    icon: <MembershipCardIcon />,
    title: "Flexible membership",
    text: "Subscribe & get exclusive rental access to over 1,000 different styles.",
  },
  {
    icon: <CalendarIcon />,
    title: "Always have something to wear",
    text: "Rent your favorite styles whenever you want, for as long as you want.",
  },
  {
    icon: <SwapIcon />,
    title: "Wear, swap, repeat",
    text: "Reserve up to 6 items at a time. Want something new? Swap & repeat.",
  },
  {
    icon: <BillingIcon />,
    title: "Simple & clear billing",
    text: "You’re only billed for what you use at the end of the month. Like a hotel tab.",
  },
  {
    icon: <HeartIcon />,
    title: "Buy styles you love",
    text: "Love something? Apply the $20 membership fee towards any purchase.",
  },
  {
    icon: <DiscordIcon />,
    title: "Discord access",
    text: "Meet other members, preview collections & vote on new styles.",
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
      <Box px={[2, 2, 2, 2, 2]} pb={6}>
        <Display size={["7", "9"]} style={{ textAlign: "center" }}>
          How membership works
        </Display>
        <Spacer mb={1} />
        <Sans size={["3", "4"]} color="black50" style={{ textAlign: "center" }}>
          Access an exclusive rental library of over 1,000+ styles
        </Sans>
      </Box>
      <Media greaterThanOrEqual="lg">
        <Row px={[2, 2, 2, 2, 2]}>
          {HOW_IT_WORKS_TEXT?.map((step, index) => (
            <Col md="4" xs="12" key={index} px={8} py={5}>
              <Item index={index} step={step} />
            </Col>
          ))}
        </Row>
      </Media>
      <Media lessThan="lg">
        <Row px={[2, 2, 2, 2, 2]}>
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
