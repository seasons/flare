import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import { Checkbox } from "components/Checkbox"
import { Collapse } from "components/Collapse"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { MembershipCard } from "mobile/Account/MembershipInfo/Components"
import React from "react"
import styled from "styled-components"

import { InputLabel } from "@material-ui/core"

import { PaymentBillingAddress } from "../PaymentBillingAddress"
import { PaymentCouponField } from "../PaymentCouponField"
import { PaymentExpressButtons } from "../PaymentExpressButtons"
import { PaymentForm } from "../PaymentForm"
import { PaymentOrderSummary } from "../PaymentOrderSummary"
import { PaymentShippingAddress } from "../PaymentShippingAddress"

const enableExpressCheckout = process.env.ENABLE_EXPRESS_CHECKOUT == "true"

export const PaymentStepOrderSummarySection = ({ selectedPlan, user, coupon, onCouponUpdate }) => {
  const { openDrawer } = useDrawerContext()

  const customerFirstName = user?.firstName
  const customerLastName = user?.lastName

  return (
    <Box>
      <Sans size="8">Order summary</Sans>
      <Spacer mb={5} />
      <MembershipCard memberName={`${customerFirstName} ${customerLastName}`} />
      <Box pt={4} pb={3}>
        <PaymentOrderSummary plan={selectedPlan} coupon={coupon} />
      </Box>
      <PaymentCouponField
        onApplyPromoCode={(amount, percentage, type, code) => {
          const coupon = {
            amount: amount as number,
            percentage: percentage as number,
            type: type as "FixedAmount" | "Percentage",
            code: code as string,
            id: code,
          }
          onCouponUpdate?.(coupon)
        }}
      />
      <Spacer mt={5} />
      <Separator />
      <Spacer mt={5} />
      <Sans size="4" color="black50">
        Have a question about membership?
      </Sans>
      <Spacer mt={2} />
      <Button block variant="secondaryOutline" onClick={() => openDrawer("faq")}>
        View FAQ
      </Button>
    </Box>
  )
}
