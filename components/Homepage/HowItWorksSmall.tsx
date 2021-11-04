import { Box, Flex, Sans, Spacer } from "components"
import { BillingIcon, CalendarIcon, DiscordIcon, HeartIcon, MembershipCardIcon, SwapIcon } from "components/Icons"
import { color } from "helpers"
import React from "react"
import styled from "styled-components"

import { Col, Grid, Row } from "../Grid"
import { Media } from "../Responsive"
import { Display } from "../Typography"

const ITEMS = [
  {
    icon: <HeartIcon />,
    title: "Try before you buy",
    text:
      "Love something? Buy it. Any rental fees goes towards purchase. We’ll even apply your $20 membership fee as a discount each month.",
  },
  {
    icon: <BillingIcon />,
    title: "Flexible pricing",
    text:
      "Each item has its own 30-day rental price with a 12-day minimum. For any additional days, we pro-rate on a daily basis.",
  },
  {
    icon: <CalendarIcon />,
    title: "New styles every week",
    text:
      "We launch new styles every week and restock every Tuesday and Thursday. Tap notify me on out of stock items for updates.",
  },
]

const Item = ({ item }) => {
  return (
    <Flex flex={1} flexDirection="row" alignItems="center" width="100%">
      <Box width="38px">{item.icon}</Box>
      <Spacer mr={2} />
      <Flex flexDirection="column" flex={1} px={3}>
        <Display size="4">{item.title}</Display>
        <Spacer mb={0.5} />
        <Sans size="3" color="black50" style={{ maxWidth: "280px" }}>
          {item.text}
        </Sans>
      </Flex>
    </Flex>
  )
}

export const HowItWorksSmall: React.FC = () => {
  return (
    <Grid>
      <Media greaterThanOrEqual="lg">
        <Row px={2}>
          {ITEMS?.map((item, index) => (
            <Col md="4" xs="12" key={index} py={5}>
              <Item item={item} />
            </Col>
          ))}
        </Row>
      </Media>
      <Media lessThan="lg">
        <MobileWrapper pt={5}>
          <Row px={2}>
            {ITEMS?.map((item, index) => (
              <Col md="6" xs="12" key={index} pb={5}>
                <Item item={item} />
              </Col>
            ))}
          </Row>
        </MobileWrapper>
      </Media>
    </Grid>
  )
}

const MobileWrapper = styled(Box)`
  background-color: ${color("black04")};
`
