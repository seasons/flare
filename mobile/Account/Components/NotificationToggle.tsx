import { Box, Flex, Sans, Spacer, Toggle } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import gql from "graphql-tag"
import { color } from "helpers"
import React, { useEffect, useState } from "react"
import { AppState, Linking, Text } from "react-native"
import { Schema, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"

const UPDATE_USER_PUSH_NOTIFICATION_STATUS = gql`
  mutation updateUserPushNotificationStatus($newStatus: Boolean!) {
    updateUserPushNotificationStatus(newStatus: $newStatus) {
      id
      status
    }
  }
`

export const NotificationToggle: React.FC<{ pushNotification: any }> = ({ pushNotification }) => {
  // const { requestPermissions, unsubscribe, init } = useNotificationsContext()
  const [isMutating, setIsMutating] = useState(false)
  const [appState, setAppState] = useState("")
  const [deviceStatus, setDeviceStatus] = useState(null)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()

  const [updateStatus] = useMutation(UPDATE_USER_PUSH_NOTIFICATION_STATUS, {
    onCompleted: (data) => {
      const status = data?.updateUserPushNotificationStatus?.status
      if (status) {
        init()
      } else {
        unsubscribe()
      }
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error updating your push notifications. Please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const callback = (status) => {
    setDeviceStatus(status)
  }

  const onChange = async (newValue) => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    tracking.trackEvent({
      actionName: Schema.ActionNames.NotificationToggleTapped,
      actionType: Schema.ActionTypes.Tap,
      newValue,
    })
    if (deviceStatus === "denied") {
      requestPermissions(callback)
    } else {
      updateStatus({
        variables: { newStatus: newValue },
        optimisticResponse: {
          __typename: "Mutation",
          updateUserPushNotificationStatus: {
            __typename: "UserPushNotification",
            id: pushNotification.id,
            status: newValue,
          },
        },
      })
    }

    setIsMutating(false)
  }

  const TextContent = () => {
    if (deviceStatus === "blocked") {
      return (
        <Sans size="4" color={color("black50")}>
          Enable push notifications in your{" "}
          <Text
            onPress={() => Linking.openSettings()}
            style={{ color: color("black100"), textDecorationLine: "underline" }}
          >
            device settings
          </Text>
          .
        </Sans>
      )
    } else {
      return (
        <Sans size="4" color={color("black50")}>
          Send me push notifications
        </Sans>
      )
    }
  }

  const disabled = isMutating || deviceStatus === "blocked"
  const selected = deviceStatus !== "blocked" && deviceStatus !== "denied" && pushNotification?.status

  return (
    <Box px={2}>
      <Spacer m={2} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box style={{ maxWidth: 300 }}>
          <Sans size="5">Order updates</Sans>
          <TextContent />
        </Box>
        <Toggle disabled={disabled} onChange={(newValue) => onChange(newValue)} selected={selected} />
      </Flex>
      <Spacer m={2} />
    </Box>
  )
}
