import { Box, Flex } from "components"
import { EditPaymentMethod, EditShipping, PaymentAndShipping } from "mobile/Account"
import { Account } from "mobile/Account/Account"
import { ChoosePlanPane } from "mobile/Account/Components/ChoosePlanPane"
import { ResumeConfirmation } from "mobile/Account/Components/Pause"
import { MembershipInfo } from "mobile/Account/MembershipInfo"
import { PersonalPreferences } from "mobile/Account/PersonalPreferences"
import { Bag } from "mobile/Bag/Bag"
import { DrawerFAQ } from "mobile/DrawerFAQ/DrawerFAQ"
import { OrderConfirmation } from "mobile/OrderConfirmation"
import { Reservation, ReservationConfirmation, ReservationShippingAddress } from "mobile/Reservation"
import { ReviewOrder } from "mobile/ReviewOrder"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Drawer as MuiDrawer } from "@material-ui/core"

import { DrawerBottomButton } from "./DrawerBottomButton"
import { useDrawerContext } from "./DrawerContext"
import { SavedAndHistory } from "mobile/Account/SavedAndHistory/SavedAndHistory"
import { GuestShipping } from "components/GuestCheckout/GuestShipping"
import { GuestPayment } from "components/GuestCheckout/GuestPayment"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

interface DrawerProps {
  open?: boolean
  onClose?: () => void
}

const stripePromise = loadStripe(process.env.STRIPE_API_KEY)

export const getDrawerWidth = () => {
  if (typeof window !== "undefined") {
    const windowWidth = window.innerWidth
    if (windowWidth < 800) {
      return windowWidth
    }
  }

  return 380
}

export const Drawer = (props: DrawerProps) => {
  const { open, onClose } = props
  const { isOpen, closeDrawer, openDrawer, currentView, params } = useDrawerContext()

  const drawerWidth = getDrawerWidth()

  useEffect(() => {
    if (open) {
      openDrawer(currentView)
    }
  }, [open])

  const handleClose = () => {
    closeDrawer()
    onClose?.()
  }

  const view = () => {
    switch (currentView) {
      case "bag":
        return <Bag initialTab={params?.initialTab} />
      case "savedAndHistory":
        return <SavedAndHistory />
      case "reservationShippingAddress":
        return (
          <ReservationShippingAddress
            shippingAddress={params?.shippingAddress}
            previousScreen={params?.previousScreen}
          />
        )
      case "reservation":
        return <Reservation previousScreen={params?.previousScreen} />
      case "reservationConfirmation":
        return <ReservationConfirmation route={{ params }} />
      case "profile":
        return <Account />
      case "membershipInfo":
        return <MembershipInfo />
      case "personalPreferences":
        return <PersonalPreferences initialTab={params?.initialTab} />
      case "paymentAndShipping":
        return <PaymentAndShipping />
      case "faq":
        return <DrawerFAQ previousScreen={params?.previousScreen} />
      case "resumeConfirmation":
        return <ResumeConfirmation />
      case "choosePlan":
        return <ChoosePlanPane headerText={"Let's choose your plan"} source={params?.source} />
      case "editShipping":
        return <EditShipping navigation={{}} route={{ params }} />
      case "editPaymentMethod":
        return <EditPaymentMethod />
      case "reviewOrder":
        return <ReviewOrder order={params.order} email={params.email} shippingAddress={params.shippingAddress} />
      case "orderConfirmation":
        return (
          <OrderConfirmation order={params.order} customer={params.customer} shippingAddress={params.shippingAddress} />
        )
      case "guestShipping":
        return <GuestShipping />
      case "guestPayment":
        return (
          <Elements stripe={stripePromise}>
            <GuestPayment order={params.order} email={params.email} shippingAddress={params.shippingAddress} />
          </Elements>
        )
    }
  }

  const showCloseButton = ["profile"].includes(currentView)

  return (
    <StyledDrawer
      width={drawerWidth}
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      variant="temporary"
      PaperProps={{ id: "appDrawer" }}
      ModalProps={{ disableEnforceFocus: true }}
    >
      <Flex width="100%" style={{ flex: 1, overflowY: "auto" }}>
        {view()}
      </Flex>
      {showCloseButton && (
        <DrawerBottomButton buttonProps={{ onClick: handleClose, variant: "primaryWhite" }}>Close</DrawerBottomButton>
      )}
    </StyledDrawer>
  )
}

const StyledDrawer = styled(MuiDrawer)<{ width: number }>`
  #appDrawer {
    width: ${(p) => p.width}px;
  }
  z-index: 2147483005 !important;
`
