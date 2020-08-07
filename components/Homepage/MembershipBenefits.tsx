import React from "react"
import { Box, Sans, Spacer, Flex } from "../"
import { Grid, Row, Col } from "../Grid"
import { Return, Cleaning, Shipping, Rental, NewStyles, PauseCancel } from "../SVGs"
import { Media } from "../Responsive"

const items = [
  {
    icon: () => <Return />,
    title: "Quick & easy returns",
    text: "Pack up all 3 pieces, insert the prepaid return label, and drop off at the nearest UPS location.",
  },
  {
    icon: () => <Cleaning />,
    title: "Free dry cleaning",
    text: "Each piece is carefully inspected, cleaned and restored before being delivered to your door.",
  },
  {
    icon: () => <Shipping />,
    title: "1 to 2 day shipping",
    text: "All orders are processed, shipped and delivered within 1- 2 business days via UPS.",
  },
  {
    icon: () => <Rental />,
    title: "Rental insurance",
    text:
      "Any stain, tear or damage gets fixed by us. Just pack it up and ship it back. Lost it? Things happen. We'll just charge a fee to replace it.",
  },
  {
    icon: () => <NewStyles />,
    title: "New styles as they drop",
    text:
      "We buy the newest and latest collections. See something you like that we don't carry? Send us a message on Instagram.",
  },
  {
    icon: () => <PauseCancel />,
    title: "Pause or cancel anytime",
    text:
      "Want to take a break for a month? Pause or cancel your membership right in the app. Easily renew whenever you want.",
  },
]

const Desktop: React.FC = () => {
  return (
    <Grid>
      <Flex px={[2, 2, 5]} justifyContent="center">
        <Flex flexDirection="column" justifyContent="center">
          <Sans size="11" style={{ textAlign: "center" }}>
            The benefits
          </Sans>
          <Spacer mb={2} />
          <Sans size="4" color="black50" style={{ textAlign: "center" }}>
            What’s included in both memberships
          </Sans>
        </Flex>
      </Flex>
      <Row px={[1, 4]}>
        {items.map((step, index) => (
          <Col md="4" xs="12" px={1} key={index}>
            <Box mt={8}>
              <Flex justifyContent="center" flexDirection="column" alignItems="center">
                {step.icon()}
                <Spacer mb={2} />
                <Sans size="5" style={{ maxWidth: "80%", textAlign: "center" }}>
                  {step.title}
                </Sans>
                <Spacer mb={1} />
                <Sans size="4" color="black50" style={{ maxWidth: "80%", textAlign: "center" }}>
                  {step.text}
                </Sans>
              </Flex>
            </Box>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}

const Mobile: React.FC = () => {
  return (
    <Grid>
      <Flex px={[2, 2, 5]}>
        <Flex flexDirection="column">
          <Sans size="11">The benefits</Sans>
          <Sans size="4" color="black50">
            What’s included in both memberships
          </Sans>
        </Flex>
      </Flex>
      <Row px={[1, 4]}>
        {items.map((step, index) => (
          <Col md="4" xs="12" px={1} key={index}>
            <Box mt={8}>
              <Flex justifyContent="center" flexDirection="column" alignItems="center">
                {step.icon()}
                <Spacer mb={2} />
                <Sans size="5" style={{ maxWidth: "80%", textAlign: "center" }}>
                  {step.title}
                </Sans>
                <Spacer mb={1} />
                <Sans size="4" color="black50" style={{ maxWidth: "80%", textAlign: "center" }}>
                  {step.text}
                </Sans>
              </Flex>
            </Box>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}

export const MembershipBenefits: React.FC = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <Desktop />
      </Media>
      <Media lessThan="md">
        <Mobile />
      </Media>
    </>
  )
}
