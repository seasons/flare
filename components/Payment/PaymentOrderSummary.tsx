import { Skeleton } from "components"
import React from "react"

import { Box, Flex, Sans, Spacer } from "@seasons/eclipse"

export const PaymentOrderSummary = ({ plan, coupon }) => {
  if (!plan) {
    return (
      <Box px={6} py={4}>
        <Loader />
      </Box>
    )
  }

  const taxes = plan.estimate?.taxes?.map((a) => a.amount)
  const totalTax = taxes.reduce((sum, amount) => sum + amount, 0)
  const discounts = plan?.estimate?.discounts || []

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
      {discounts.length > 0 && (
        <>
          {discounts?.map((discount) => {
            return (
              <>
                <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
                  <Sans size="5" color="black50">
                    {discount.description}
                  </Sans>
                  <Sans size="5" color="black50">
                    -{formatPrice(discount.amount)}
                  </Sans>
                </Flex>
              </>
            )
          })}
          <Spacer mt={1} />
        </>
      )}
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
      {coupon && <></>}
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

const Loader = () => {
  return (
    <Box>
      <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
        <Skeleton width={86} height={22} />
        <Skeleton width={60} height={22} />
      </Flex>
      <Spacer mt={1} />
      <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
        <Skeleton width={45} height={22} />
        <Skeleton width={70} height={22} />
      </Flex>
      <Spacer mt={1} />
      <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
        <Skeleton width={42} height={25} />
        <Skeleton width={70} height={25} />
      </Flex>
      <Spacer mt={4} />
      <Skeleton width={200} height={20} />
    </Box>
  )
}
