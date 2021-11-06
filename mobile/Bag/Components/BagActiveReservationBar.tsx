import { Box, Button, Flex } from "components"
import React from "react"

export const BagActiveReservationBar = ({ reservation, isLoading, handlePress }) => {
  if (reservation?.status !== "Delivered") {
    return null
  }

  const markedAsReturned = !!reservation?.returnedAt
  if (markedAsReturned) {
    const returnLabelUrl = reservation?.returnedPackage?.shippingLabel?.trackingURL
    return (
      <Flex flexDirection="row" justifyContent="space-between" mx={2}>
        {returnLabelUrl && (
          <Button
            style={{ flex: 1 }}
            onPress={() => window.open(returnLabelUrl, "_blank")}
            disabled={isLoading}
            loading={isLoading}
            variant="primaryWhite"
          >
            Return label
          </Button>
        )}
        <Button
          style={{ flex: 1 }}
          onPress={handlePress}
          disabled={isLoading}
          loading={isLoading}
          variant="primaryBlack"
        >
          How to return
        </Button>
      </Flex>
    )
  }

  return (
    <Box mx={2}>
      <Button block onPress={handlePress} disabled={isLoading} loading={isLoading} variant="primaryWhite">
        Return bag
      </Button>
    </Box>
  )
}
