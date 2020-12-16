import { Box, Button, Sans, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import React from "react"

import { UserState } from "../Account"
import { useRouter } from "next/router"

export enum OnboardingStep {
  CreateAccount = "CreateAccount",
  SetMeasurements = "SetMeasurements",
  ChoosePlan = "ChoosePlan",
}

export enum CustomerStatus {
  Invited = "Invited",
  Created = "Created",
  Waitlisted = "Waitlisted",
  Authorized = "Authorized",
  Active = "Active",
  Suspended = "Suspended",
  Paused = "Paused",
  Deactivated = "Deactivated",
}

interface OnboardingChecklistProps {
  userState: UserState.Undetermined | UserState.Waitlisted
}

export const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({ userState }) => {
  const header = userState == UserState.Undetermined ? "Finish creating your account" : "You're on the waitlist"
  const detail =
    userState == UserState.Undetermined
      ? "You still have some steps to finish before you can place an order."
      : "We’ll send you an email when your account is ready and you’re able to choose your plan."

  const router = useRouter()
  const { closeDrawer } = useDrawerContext()

  return (
    <Box pb={2}>
      <Sans size="4">{header}</Sans>
      <Spacer mb={0.5} />
      <Sans size="4" color="black50">
        {detail}
      </Sans>
      {userState == UserState.Undetermined && (
        <>
          <Spacer mb={5} />
          <Button
            block
            type="button"
            variant="primaryBlack"
            onClick={() => {
              router.push("/signup")
              closeDrawer()
            }}
          >
            Finish your application
          </Button>
        </>
      )}
    </Box>
  )
}
