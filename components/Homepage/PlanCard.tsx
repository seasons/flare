import { Box, Button, Flex, Sans, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { PlanFeatures } from "components/Payment/PlanFeatures"
import React from "react"
import styled from "styled-components"
import { MembershipCTA } from "./MembershipCTA"
import { useAuthContext } from "lib/auth/AuthContext"

export const PlanCard = ({ plan, isDesktop }) => {
  const isYearlyPlan = plan?.planID === "access-yearly"

  const { openDrawer } = useDrawerContext()
  const { authState, userSession } = useAuthContext()

  return (
    <Wrapper>
      <Box>
        <Sans size="9">{plan?.name} membership</Sans>
      </Box>
      <Box py={3}>
        <Sans size="10">
          ${plan?.price / 100}
          <Sans size="4" color="black50" style={{ display: "inline" }}>
            {" "}
            / {isYearlyPlan ? "year" : "month with a 3-month minimum"}
          </Sans>
        </Sans>
        <Spacer pb={3}/>
        <PlanFeatures features={plan?.features} />
      </Box>
      <Flex flexDirection={isDesktop ? "row" : "column"}>
        <MembershipCTA variant="blue" authState={authState} userSession={userSession} />
        <Spacer mb={isDesktop ? 0 : 2} mr={isDesktop ? 2 : 0} />
        <Button
          variant={isDesktop ? "primaryWhiteNoBorder" : "primaryGray"}
          size="large"
          onClick={() => openDrawer("faq")}
        >
          See our FAQ
        </Button>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Flex)`
  width: 100%;
  position: relative;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`
