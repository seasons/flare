import React from "react"

import { Box, Flex, Sans, Spacer } from "@seasons/eclipse"

export const PaymentOrderSummary = ({ plan }) => {
  if (!plan) {
    return <Box px={6} py={4}></Box>
  }

  const taxes = plan.estimate?.taxes?.map((a) => a.amount)
  const totalTax = taxes.reduce((sum, amount) => sum + amount, 0)

  const formatPrice = (price) =>
    (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

  return (
    <Box px={6} py={4}>
      <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
        <Sans size="5" color="black50">
          {plan.name}
        </Sans>
        <Sans size="5" color="black50">
          {formatPrice(plan.price)}
        </Sans>
      </Flex>
      <Spacer mt={1} />
      {taxes.length > 0 && (
        <>
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
            <Sans size="5" color="black50">
              Taxes
            </Sans>
            <Sans size="5" color="black50">
              {formatPrice(totalTax)}
            </Sans>
          </Flex>
          <Spacer mt={1} />
        </>
      )}
      <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
        <Sans size="6">Total</Sans>
        <Sans size="6">{formatPrice(plan.estimate?.total)}</Sans>
      </Flex>
      <Spacer mt={4} />
      <Sans size="3" color="black50">
        Billed every 30-days. Pause or cancel anytime.
      </Sans>
    </Box>
  )
}
