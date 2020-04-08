import React from "react"
import { Box, Sans, Spacer, Flex } from "../../../components"
import { Grid, Row, Col } from "../../../components/Grid"

const items = [
  {
    title: "Quick & easy returns",
    text: "Pack up all 3 pieces, insert the prepaid return label, and drop off at the nearest UPS location.",
  },
  {
    title: "Free dry cleaning",
    text: "Each piece is carefully inspected, cleaned and restored before being delivered to your door.",
  },
  {
    title: "1 to 2 day shipping",
    text: "All orders are processed, shipped and delivered within 1- 2 business days via UPS.",
  },
  {
    title: "Rental insurance",
    text:
      "Any stain, tear or damage gets fixed by us. Just pack it up and ship it back. Lost it? Things happen. We'll just charge a fee to replace it.",
  },
  {
    title: "New styles as they drop",
    text:
      "We buy the newest and latest collections. See something you like that we don't carry? Send us a message on Instagram.",
  },
  {
    title: "Pause or cancel anytime",
    text:
      "Want to take a break for a month? Pause or cancel your membership right in the app. Easily renew whenever you want.",
  },
]

export const MembershipBenefits: React.FC = () => {
  return (
    <Grid>
      <Spacer mb={6} />
      <Flex px={[2, 0]} mx={0.5} justifyContent="center">
        <Flex flexDirection="column" justifyContent="center">
          <Sans size="8" style={{ textAlign: "center" }}>
            Membership benefits
          </Sans>
          <Spacer mb={0.5} />
          <Sans size="4" color="black50" style={{ textAlign: "center" }}>
            What's included in both memberships
          </Sans>
        </Flex>
      </Flex>
      <Row>
        {items.map((step, index) => (
          <Col md="4" xs="12" px={[2, 0]} key={index}>
            <Box mt={8} mx={0.5}>
              <Sans size="5" color="black50">{`0${index + 1}.`}</Sans>
              <Spacer mb={2} />
              <Sans size="5" style={{ maxWidth: "80%", textAlign: "center" }}>
                {step.title}
              </Sans>
              <Spacer mb={1} />
              <Sans size="3" color="black50" style={{ maxWidth: "80%", textAlign: "center" }}>
                {step.text}
              </Sans>
            </Box>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}
