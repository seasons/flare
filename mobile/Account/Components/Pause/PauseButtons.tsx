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

export type PauseStatus = "active" | "pending" | "paused"

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

const PAUSE_MEMBERSHIP = gql`
  mutation PauseSubscription($subscriptionID: String!) {
    pauseSubscription(subscriptionID: $subscriptionID)
  }
`

const UPDATE_RESUME_DATE = gql`
  mutation UpdateResumeDate($date: DateTime!) {
    updateResumeDate(date: $date)
  }
`

export const PauseButtons: React.FC<{ customer: any; fullScreen?: boolean }> = ({ customer, fullScreen }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const pauseRequest = customer?.membership?.pauseRequests?.[0]
  const customerStatus = customer?.status
  const pausePending = pauseRequest?.pausePending
  const dueDate = pauseRequest?.pauseDate && DateTime.fromISO(pauseRequest?.pauseDate).toFormat("EEEE LLLL d")

  const resumeDate =
    customer?.membership?.pauseRequests?.[0]?.resumeDate &&
    DateTime.fromISO(customer?.membership?.pauseRequests?.[0]?.resumeDate)

  const resumeDatePlusOneMonth = resumeDate && resumeDate.plus({ months: 1 })
  const pauseExtendDateDisplay = (!!resumeDatePlusOneMonth && resumeDatePlusOneMonth.toFormat("LLLL d")) || ""

  const pauseDateCanExtend =
    resumeDate?.diffNow("months")?.values?.months && resumeDate.diffNow("months")?.values?.months < 1

  const { openDrawer } = useDrawerContext()
  const [updateResumeDate] = useMutation(UPDATE_RESUME_DATE, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      // navigation.navigate("Modal", {
      //   screen: Schema.PageNames.ExtendPauseConfirmation,
      //   params: { dueDate: pauseExtendDateDisplay },
      // })
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error updating your resume date, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const [removeScheduledPause] = useMutation(REMOVE_SCHEDULED_PAUSE, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
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

  const [pauseSubscription] = useMutation(PAUSE_MEMBERSHIP, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      // navigation.navigate("Modal", {
      //   screen: Schema.PageNames.PauseConfirmation,
      //   params: { dueDate },
      // })
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error pausing your membership, please contact us.",
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

  let pauseStatus: PauseStatus = "active"
  let pauseButtonVariant = "primaryGray"
  let pauseButtonText = "Pause membership"

  if (customerStatus === "Paused") {
    pauseStatus = "paused"
    pauseButtonText = "Resume membership"
    pauseButtonVariant = "primaryBlack"
  } else if (pausePending) {
    pauseStatus = "pending"
    pauseButtonText = "Resume membership"
    pauseButtonVariant = "primaryBlack"
  }

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
    if (pauseStatus === "paused") {
      await resumeSubscription(vars)
    } else if (pauseStatus === "pending") {
      await removeScheduledPause(vars)
    } else {
      await pauseSubscription(vars)
    }
    setIsMutating(false)
  }

  const SubText = () => {
    return pauseStatus === "paused" ? (
      <Sans size="4" color={color("black50")} style={{ textAlign: "center" }}>
        Have a question?{" "}
        <Sans
          size="4"
          style={{ textDecorationLine: "underline", display: "inline-block" }}
          onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
        >
          Contact us
        </Sans>
      </Sans>
    ) : (
      <Sans size="3" color={color("black50")}>
        If you’d like to cancel your membership, contact us using the button above. We’re happy to help with this.
      </Sans>
    )
  }

  return (
    <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
      <Box>
        {fullScreen && <Spacer mb={100} />}
        {pauseStatus === "pending" && (
          <>
            <Sans size="1">{`Your membership is scheduled to be paused on ${DateTime.fromISO(
              pauseRequest.pauseDate
            ).toFormat("EEEE LLLL d")}.`}</Sans>
            <Spacer mb={2} />
          </>
        )}
        {pauseStatus === "paused" && (
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
        <Button
          onClick={toggleSubscriptionStatus}
          disabled={isMutating}
          loading={isMutating}
          block
          variant={pauseButtonVariant as ButtonVariant}
        >
          {pauseButtonText}
        </Button>
        <Spacer mb={1} />
        {pauseStatus === "paused" ? (
          <Button
            variant="primaryBlack"
            disabled={!pauseDateCanExtend}
            onClick={() =>
              updateResumeDate({
                variables: { date: resumeDatePlusOneMonth?.toISO() },
                awaitRefetchQueries: true,
              })
            }
            block
          >
            {`Pause until ${pauseExtendDateDisplay}`}
          </Button>
        ) : (
          <Button
            variant="secondaryOutline"
            onClick={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
            block
          >
            Contact us
          </Button>
        )}
        <Spacer mb={2} />
        <SubText />
      </Box>
    </Flex>
  )
}
