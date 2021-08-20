import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import React from "react"
import { Checkbox } from "components/Checkbox"
import { Collapse } from "components/Collapse"
import { PaymentBillingAddress } from "../PaymentBillingAddress"
import { PaymentShippingAddress } from "../PaymentShippingAddress"
import { PaymentForm } from "../PaymentForm"
import { PaymentExpressButtons } from "../PaymentExpressButtons"
import styled from "styled-components"
import { InputLabel } from "@material-ui/core"
import { MembershipCard } from "mobile/Account/MembershipInfo/Components"
import { PaymentOrderSummary } from "../PaymentOrderSummary"
import { PaymentCouponField } from "../PaymentCouponField"
import { useDrawerContext } from "components/Drawer/DrawerContext"

const enableExpressCheckout = process.env.ENABLE_EXPRESS_CHECKOUT == "true"

export const PaymentStepOrderSummarySection = ({ setCoupon, selectedPlan, user, coupon }) => {
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
          setCoupon({
            amount: amount as number,
            percentage: percentage as number,
            type: type as "FixedAmount" | "Percentage",
            code: code as string,
            id: code,
          })
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
