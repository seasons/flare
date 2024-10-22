import React from "react"
import gql from "graphql-tag"
import { Flex, Box, Sans, Spacer } from "components"

export const CreditBalanceFragment_Customer = gql`
  fragment CreditBalanceFragment_Customer on Customer {
    membership {
      id
      adjustedCreditBalance
    }
  }
`

export const CreditBalance = ({ membership }) => {
  const credits = membership?.adjustedCreditBalance

  if (typeof credits !== "number") {
    return null
  }

  return (
    <>
      <Spacer mb={1} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-end" px={2} style={{ width: "100%" }}>
        <Box>
          <Sans size="4" color="black50">
            $ZNS Wallet
          </Sans>
          <Sans size="5">Credits available</Sans>
        </Box>
        <Sans size="8">
          {(credits / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Sans>
      </Flex>
      <Spacer mb={4} />
    </>
  )
}
