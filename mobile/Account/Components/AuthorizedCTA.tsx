import React from "react"
import { Button, Sans, Box, Spacer, Flex } from "components"
import { space } from "helpers/space"
import { DateTime, Duration } from "luxon"
import { Dimensions } from "react-native"
import { HourMinuteSecondCountdown } from "./HourMinuteSecondCountdown"
import styled from "styled-components"

export const AuthorizedCTA: React.FC<{
  authorizedAt: DateTime
  authorizationWindowClosesAt: DateTime
  onPressChoosePlan: () => void
  onPressLearnMore: () => void
}> = ({ authorizedAt, authorizationWindowClosesAt, onPressChoosePlan, onPressLearnMore }) => {
  const targetAuthorizationDate = authorizationWindowClosesAt.isValid
    ? authorizationWindowClosesAt
    : authorizedAt.plus({ days: 2 })
  const authorizationDuration =
    targetAuthorizationDate.valueOf() > authorizedAt.valueOf()
      ? targetAuthorizationDate.diff(authorizedAt, "hours")
      : Duration.fromMillis(0)

  return (
    <Box pb={1}>
      <Flex alignItems="center" justifyContent="center" pb={3}>
        <HourMinuteSecondCountdown targetDate={targetAuthorizationDate} />
      </Flex>
      <Sans size="5" color="black100" textAlign="center">
        You're in. Let's choose your plan
      </Sans>
      <Spacer mb={1} />
      <Sans size="4" color="black50" textAlign="center">
        You have{" "}
        <Underline>
          {authorizationDuration.get("hours") === 1
            ? `${authorizationDuration.toFormat("h")} hour`
            : `${authorizationDuration.toFormat("h")} hours`}
        </Underline>{" "}
        to secure your spot. If we don't hear from you, your invite will go to the next person and{" "}
        <Underline>you'll be waitlisted</Underline>.
      </Sans>
      <Spacer mb={3} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Button variant="primaryWhite" block onClick={onPressLearnMore}>
          Learn more
        </Button>
        <Spacer ml={2} />
        <Button variant="primaryBlack" block onClick={onPressChoosePlan}>
          Choose plan
        </Button>
      </Flex>
    </Box>
  )
}

const Underline = styled.span`
  text-decoration: underline;
`
