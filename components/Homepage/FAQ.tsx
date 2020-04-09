import React from "react"
import { Grid, Row, Col } from "../Grid"
import { Sans, Box, Spacer, Flex } from ".."
import styled from "styled-components"
import { color } from "../../helpers"

const items = [
  {
    title: "Where is Seasons available?",
    text:
      "We're exclusively servicing New York City right now. Manhattan, Brooklyn, Queens, The Bronx, and Staten Island. Sign up for updates to get notified when we roll out service in more cities.",
  },
  {
    title: "Who is Seasons for?",
    text:
      "Seasons is for everyone. Gender lines have been blurred and it's no longer about Men's or Women's. It's about whether you like something or not and helping you find a size that fits.",
  },
  {
    title: "How long can I keep my 3 pieces?",
    text:
      "On an Essential plan you have 28 days to wear and return (don't worry, we'll remind you). With an All Access plan you're free to keep them as long as you want and swap out anytime.",
  },
  {
    title: "Want more than 3 pieces?",
    text:
      "Unfortunately we're not offering slot upgrades just yet. It's something we're still working on and will roll out soon. Have thoughts? Shoot us a message at <a href='mailto:membership@seasons.nyc?subject=Hello'>membership@seasons.nyc</a>.",
  },
  {
    title: "Received a damaged item?",
    text:
      "This rarely happens, but if it does, contact our customer service team, pack it up and send it back using the prepaid shipping label. We'll make sure we take care of you.",
  },
  {
    title: "Are there late fees?",
    text:
      "We'll charge a $35 fee for each day it's late (along with the monthly charge for your subscription). This only applies to the Essentials membership or if you cancel or pause your plan.",
  },
]

export const FAQ: React.FC = () => {
  return (
    <Grid>
      <Box px={[2, 0]} mb={6}>
        <Sans px={0.5} size="6">
          Frequently asked questions
        </Sans>
      </Box>
      <Row>
        {items.map((step, index) => (
          <Col md="4" xs="12" px={["2", "0"]} key={index}>
            <Flex
              mt={2}
              flexDirection="column"
              style={{ backgroundColor: color("black04"), height: "320px", borderRadius: "8px" }}
              p={3}
              m={0.5}
            >
              <Sans size="5" color="black50">{`0${index + 1}.`}</Sans>
              <Spacer mb={8} />
              <Box>
                <Sans size="5" style={{ maxWidth: "90%" }}>
                  {step.title}
                </Sans>
                <Spacer mb={1} />
                <InjectedSans
                  size="3"
                  color="black50"
                  style={{ maxWidth: "90%" }}
                  dangerouslySetInnerHTML={{ __html: step.text }}
                />
              </Box>
            </Flex>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}

const InjectedSans = styled(Sans)`
  a {
    text-decoration: underline;
    color: ${color("black100")};
  }
`
