import { Box, Container, Flex, Spacer } from "components"
import { padStart } from "lodash"
import { DateTime } from "luxon"
import React from "react"

import { styled, TextField } from "@material-ui/core"

const formattedPhoneNumber = (phoneNumber: string) => {
  const suffix = phoneNumber.slice(-10)
  return `(${suffix.substring(0, 3)}) ${suffix.substring(3, 6)}-${suffix.substring(6)}`
}

const formattedDateTime = (dateTime: string) => {
  const date = DateTime.fromISO(dateTime)
  return [date.month, date.day, date.year].map((i) => padStart(i, 2, "0")).join("/")
}

const StyledTextField = styled(TextField)({
  width: "100%",
})

export const PersonalTab: React.FC<{
  createdAt: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}> = ({ createdAt, firstName, lastName, email, phoneNumber }) => {
  return (
    <Container insetsTop={false} insetsBottom={false}>
      <Box p={2} pt={4}>
        <Flex flexDirection="row">
          <StyledTextField defaultValue={firstName} disabled label="First name" />
          <Spacer mr={3} />
          <StyledTextField defaultValue={lastName} disabled label="Last name" />
        </Flex>
        <Spacer mb={4} />
        <StyledTextField defaultValue={email} disabled label="Email" />
        <Spacer mb={4} />
        <StyledTextField defaultValue={formattedPhoneNumber(phoneNumber)} disabled label="Phone number" />
        <Spacer mb={4} />
        <StyledTextField defaultValue={formattedDateTime(createdAt)} disabled label="Joined" />
      </Box>
    </Container>
  )
}
