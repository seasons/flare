import React from "react"
import { Box, Flex, Link, Sans, Spacer } from "components"
import gql from "graphql-tag"
import styled from "styled-components"
import { color } from "helpers"

export const BagSectionDeliveryStatusFragment_BagSection = gql`
  fragment BagSectionDeliveryStatusFragment_BagSection on BagSection {
    status
    deliveryStep
    deliveryTrackingUrl
    deliveryStatusText
  }
`

export const BagSectionDeliveryStatus = ({ section }) => {
  const status = section.status

  const statusColor = status === "CustomerToBusiness" ? color("blue100") : color("lightGreen")
  const trackText = status === "CustomerToBusiness" ? "Track return" : "Track order"

  const { deliveryStep, deliveryTrackingUrl, deliveryStatusText } = section

  return (
    <Box px={1.5}>
      <Flex flexDirection="row" flexWrap="nowrap" width="100%">
        {[...Array(3)].map((_pip, index) => {
          const backgroundColor = index < deliveryStep ? statusColor : color("black10")
          return <Pip backgroundColor={backgroundColor} mx={0.5} key={index} />
        })}
      </Flex>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={0.5}>
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
          <GreenDot statusColor={statusColor} />
          <Spacer mr={1} />
          <Sans size="4">{deliveryStatusText}</Sans>
        </Flex>
        {!!deliveryTrackingUrl && (
          <Box>
            <Link href={deliveryTrackingUrl}>
              <Sans size="4" style={{ textDecorationLine: "underline" }}>
                {trackText}
              </Sans>
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

const GreenDot = styled(Box)<{ statusColor: string }>`
  height: 8;
  width: 8;
  border-radius: 4;
  background-color: ${(p) => p.statusColor};
`

const Pip = styled(Box)<{ backgroundColor: string }>`
  flex: 1;
  height: 4;
  border-radius: 2;
  background-color: ${(p) => p.backgroundColor};
`
