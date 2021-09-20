import { Box, Button, Flex, Sans, Spacer } from "components"
import { ButtonVariant } from "components/Button/Button.shared"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import gql from "graphql-tag"
import { color } from "helpers/color"
import { DateTime } from "luxon"
import { GET_MEMBERSHIP_INFO } from "mobile/Account/MembershipInfo/MembershipInfo"
import React, { useState } from "react"
import { Linking } from "react-native"
import { useMutation } from "@apollo/client"
import { identify, useTracking, Schema } from "utils/analytics"

const RESUME_MEMBERSHIP = gql`
  mutation ResumeSubscription($subscriptionID: String!) {
    resumeSubscription(subscriptionID: $subscriptionID)
  }
`

export const REMOVE_SCHEDULED_PAUSE = gql`
  mutation RemoveScheduledPause($subscriptionID: String!) {
    removeScheduledPause(subscriptionID: $subscriptionID)
  }
`

export const PauseButtons: React.FC<{ customer: any; fullScreen?: boolean }> = ({ customer, fullScreen }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const tracking = useTracking()

  const pauseRequest = customer?.membership?.pauseRequests?.[0]
  const customerStatus = customer?.status
  const isPending = pauseRequest?.pausePending
  const isPaused = customerStatus === "Paused"

  const resumeDate =
    customer?.membership?.pauseRequests?.[0]?.resumeDate &&
    DateTime.fromISO(customer?.membership?.pauseRequests?.[0]?.resumeDate)

  const pauseDateCanExtend =
    resumeDate?.diffNow("months")?.values?.months && resumeDate.diffNow("months")?.values?.months < 1

  const { openDrawer } = useDrawerContext()

  const [removeScheduledPause] = useMutation(REMOVE_SCHEDULED_PAUSE, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      identify(customer?.user?.id, { status: "Active" })
      const popUpData = {
        title: "Got it!",
        note: "Your membership is no longer scheduled to be paused.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      showPopUp(popUpData)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error canceling the pause on your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const [resumeSubscription] = useMutation(RESUME_MEMBERSHIP, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      identify(customer?.user?.id, { status: "Active" })
      openDrawer("resumeConfirmation")
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error resuming your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const subscriptionID = customer?.invoices?.[0]?.subscriptionId || ""

  const toggleSubscriptionStatus = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    const vars = {
      variables: {
        subscriptionID,
      },
      awaitRefetchQueries: true,
    }
    if (isPaused) {
      tracking.trackEvent({
        actionName: Schema.ActionNames.ResumeMembershipTapped,
        actionType: Schema.ActionTypes.Tap,
      })
      await resumeSubscription(vars)
    } else if (isPending) {
      tracking.trackEvent({
        actionName: Schema.ActionNames.ResumeMembershipTapped,
        actionType: Schema.ActionTypes.Tap,
      })
      await removeScheduledPause(vars)
    }
    setIsMutating(false)
  }

  return (
    <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
      <Box>
        {fullScreen && <Spacer mb={100} />}
        {isPending && (
          <>
            <Sans size="1">{`Your membership is scheduled to be paused on ${DateTime.fromISO(
              pauseRequest.pauseDate
            ).toFormat("EEEE LLLL d")}.`}</Sans>
            <Spacer mb={2} />
          </>
        )}
        {isPaused && (
          <>
            <Sans size="5">
              Your membership is paused until{" "}
              <Sans size="5" style={{ textDecorationLine: "underline", display: "inline-block" }}>
                {DateTime.fromISO(resumeDate).toFormat("EEEE LLLL d")}
              </Sans>
              .
            </Sans>
            <Spacer mb={3} />
            {fullScreen && (
              <Sans color="black50" size="3">
                It will automatically resume at this date.
              </Sans>
            )}
            {!pauseDateCanExtend && (
              <Sans size="1" color="black50">{`You can extend this again after ${DateTime.fromISO(resumeDate)
                .minus({ months: 1 })
                .toFormat("EEEE LLLL d")}.`}</Sans>
            )}
            <Spacer mb={4} />
          </>
        )}
      </Box>
      <Box>
        {(isPending || isPaused) && (
          <>
            <Button
              onClick={toggleSubscriptionStatus}
              disabled={isMutating}
              loading={isMutating}
              block
              variant="primaryBlack"
            >
              Resume membership
            </Button>
            <Spacer mb={1} />
          </>
        )}
        <Button
          variant="secondaryOutline"
          onClick={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
          block
        >
          Contact us
        </Button>
        <Spacer mb={2} />
        <Sans size="3" color={color("black50")}>
          If you’d like to cancel your membership, contact us using the button above. We’re happy to help with this.
        </Sans>
        <Spacer mb={8} />
      </Box>
    </Flex>
  )
}
