import React from "react"
import { Box, Sans, Spacer, Flex } from "../"
import { Grid, Row, Col } from "../Grid"
import { Return, Cleaning, Shipping, Rental, NewStyles, PauseCancel } from "../SVGs"
import { Media } from "../Responsive"
import { Display } from "../Typography"

const items = [
  {
    icon: () => <Return />,
    title: "Quick & easy returns",
    text:
      "Pack up your pieces, insert the pre-paid return label and drop off at your nearest UPS location. Need an at home pickup? We’ve got those too.",
  },
  {
    icon: () => <Cleaning />,
    title: "Safe, free, dry cleaning",
    text:
      "Each piece is carefully inspected, dry cleaned and restored before being delivered to you. All bag are also cleaned and sanitized after every use.",
  },
  {
    icon: () => <Shipping />,
    title: "Super fast shipping",
    text: "All orders are processed, shipped and delivered within 2-3 business days via UPS.",
  },
  {
    icon: () => <Rental />,
    title: "Rental insurance",
    text:
      "Any stain, tear or damage gets fixed by us. Just pack it up and ship it back. Lost it? Things happen. We'll just charge a small fee to replace it.",
  },
  {
    icon: () => <NewStyles />,
    title: "Find the perfect fit",
    text:
      "Avoid the hassle of dealing with refunds and store returns. Try on clothes in the comfort of your home and find your perfect fit.",
  },
  {
    icon: () => <PauseCancel />,
    title: "Pause or cancel anytime",
    text:
      "Want to take a break for a month? Pause your membership right in the app. Easily renew whenever you’re ready to come back.",
  },
]

const Desktop: React.FC = () => {
  return (
    <Grid>
      <Flex px={[2, 2, 5]} justifyContent="center">
        <Flex flexDirection="column" justifyContent="center">
          <Display size="9" style={{ textAlign: "center" }}>
            The benefits
          </Display>
          <Spacer mb={1} />
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
                <Display size="4" style={{ maxWidth: "80%", textAlign: "center" }}>
                  {step.title}
                </Display>
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
          <Display size="9">The benefits</Display>
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
