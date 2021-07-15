import { Box, Flex, Sans, Spacer } from "components"
import { color } from "helpers"
import { DateTime } from "luxon"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"

export const DeliveryStatus: React.FC<{
  me
  atHome: boolean
}> = ({ me, atHome }) => {
  const activeReservation = me?.activeReservation
  const status = activeReservation?.status
  const updatedMoreThan24HoursAgo = DateTime.fromISO(activeReservation?.updatedAt).diffNow("days")?.values?.days <= -1

  const sentPackageTrackingURL = activeReservation?.sentPackage?.shippingLabel?.trackingURL
  const returnedPackageTrackingURL = activeReservation?.returnedPackage?.shippingLabel?.trackingURL

  if (atHome) {
    return null
  }

  let step
  let statusText = ""
  let statusColor = color("lightGreen")
  let trackingURL

  if (activeReservation.phase === "CustomerToBusiness") {
    // Package is heading back to the warehouse
    statusColor = color("blue")
    trackingURL = returnedPackageTrackingURL
    if (status === "Delivered") {
      statusText = "Returned"
      step = 3
    } else if (status === "Shipped") {
      statusText = "In-transit"
      step = 2
    } else if (status === "Packed") {
      statusText = "Received by UPS"
      step = 1
    } else {
      return null
    }
  } else {
    // Package is being sent to customer
    trackingURL = sentPackageTrackingURL
    if (status === "Delivered") {
      statusText = "Delivered"
      step = 3
    } else if (status === "Shipped") {
      statusText = "Shipped"
      step = 2
    } else if (status === "Packed" || status === "Picked") {
      statusText = "Order received"
      step = 1
    } else if (status === "Queued") {
      statusText = "Order received"
      step = 0
    } else {
      return null
    }
  }

  return (
    <Box>
      <Box px={2}>
        <Sans size="4">Status</Sans>
      </Box>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" px={1.5} width="100%">
        {[...Array(3)].map((_pip, index) => {
          const backgroundColor = index < step ? statusColor : color("black10")
          return <Pip backgroundColor={backgroundColor} mx={0.5} key={index} />
        })}
      </Flex>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={2}>
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
          <GreenDot statusColor={statusColor} />
          <Spacer mr={1} />
          <Sans size="3">{statusText}</Sans>
        </Flex>
        {!!trackingURL && (
          <Box>
            <TouchableWithoutFeedback
              onPress={() => {
                window.open(trackingURL)
              }}
            >
              <Sans size="3" style={{ textDecorationLine: "underline" }}>
                Track order
              </Sans>
            </TouchableWithoutFeedback>
          </Box>
        )}
      </Flex>
      <Spacer mb={3} />
    </Box>
  )
}

const GreenDot = styled(Box)<{ statusColor: string }>`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: ${(p) => p.statusColor};
`

const Pip = styled(Box)<{ backgroundColor: string }>`
  flex: 1;
  height: 4;
  border-radius: 2;
  background-color: ${(p) => p.backgroundColor};
`
