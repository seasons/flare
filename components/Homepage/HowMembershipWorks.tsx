import { Box, Flex, Link, Sans, Spacer } from "components"
import { BillingIcon, CalendarIcon, DiscordIcon, HeartIcon, MembershipCardIcon, SwapIcon } from "components/Icons"
import { color } from "helpers/color"
import React from "react"
import styled from "styled-components"
import { useDrawerContext } from "components/Drawer/DrawerContext"

import { Col, Grid, Row } from "../Grid"
import { Media } from "../Responsive"
import { Display } from "../Typography"

export const HOW_IT_WORKS_TEXT = [
  {
    icon: <MembershipCardIcon />,
    title: "Pay for access",
    text: "Sign up, subscribe, & get rental access to over 1,000 different styles.",
  },
  {
    icon: <CalendarIcon />,
    title: "Wear. Swap. Repeat",
    text: "Rent & swap up to 6 items whenever you want, for as long as you want.",
  },
  {
    icon: <HeartIcon />,
    title: "Buy styles you love",
    text: "Love something? Apply the $20 membership fee towards a purchase.",
  },
  {
    icon: <BillingIcon />,
    title: "Simple & clear billing",
    text: "You’re only billed for what you use at the end of the month. Like a hotel tab.",
  },
]

const Item = ({ step, index, breakpoint }) => {
  const isDesktop = breakpoint === "desktop"

  return (
    <ItemWrapper
      px={2}
      py={isDesktop ? 5 : 2}
      height={isDesktop ? "400px" : "272px"}
      index={index}
      isDesktop={isDesktop}
    >
      {isDesktop && <Sans size="7" color="black50">{`0${index + 1}.`}</Sans>}
      <Box>
        <Flex>{step.icon}</Flex>
        <Spacer mb={5} />
        <Display size="7">{step.title}</Display>
        <Spacer mb={2} />
        <Sans size="4" color="black50">
          {step.text}
        </Sans>
      </Box>
    </ItemWrapper>
  )
}

const Content = ({ breakpoint }) => {
  const { openDrawer } = useDrawerContext()

  const isDesktop = breakpoint === "desktop"

  return (
    <>
      <Flex flexDirection="row" justifyContent="space-between" px={2}>
        <Display size={["7", "9"]}>How membership works</Display>
        {isDesktop && (
          <Display size={["7", "9"]} underline pointer onClick={() => openDrawer("faq")}>
            See FAQ
          </Display>
        )}
      </Flex>
      <Spacer mb={2} />
      <Row px={[2, 2, 2, 2, 2]}>
        {HOW_IT_WORKS_TEXT?.map((step, index) => (
          <Col md={isDesktop ? "3" : "6"} xs="12" key={index} pb={5}>
            <Item index={index} step={step} breakpoint={breakpoint} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export const HowMembershipWorks: React.FC = () => {
  return (
    <Grid>
      <Media greaterThanOrEqual="lg">
        <Content breakpoint="desktop" />
      </Media>
      <Media lessThan="lg">
        <Content breakpoint="mobile" />
      </Media>
    </Grid>
  )
}

const ItemWrapper = styled(Flex)<{ isDesktop: boolean; index: number }>`
  border-bottom: 1px solid ${color("black10")};
  border-top: ${(p) => (!p.isDesktop && p.index > 0 ? "none" : `1px solid ${color("black10")}`)};
  border-right: 1px solid ${color("black10")};
  border-left: ${(p) => (p.isDesktop && p.index > 0 ? "none" : `1px solid ${color("black10")}`)};
  flex-direction: column;
  justify-content: ${(p) => (p.isDesktop ? "space-between" : "flex-end")};

  &:hover {
    box-shadow: ${(p) => (p.isDesktop ? "6px 12px 16px 0 rgba(0, 0, 0, 0.1)" : "none")};
  }
`
