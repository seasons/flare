import { Box, Flex } from "components"
import { EditPaymentAndShipping, PaymentAndShipping, EditPaymentMethod } from "mobile/Account"
import { Account } from "mobile/Account/Account"
import { ChoosePlanPane } from "mobile/Account/Components/ChoosePlanPane"
import { ResumeConfirmation } from "mobile/Account/Components/Pause"
import { MembershipInfo } from "mobile/Account/MembershipInfo"
import { PersonalPreferences } from "mobile/Account/PersonalPreferences"
import { Bag } from "mobile/Bag/Bag"
import { Reservation, ReservationConfirmation, ReservationShippingAddress } from "mobile/Reservation"
import { ReviewOrder } from "mobile/ReviewOrder"
import { OrderConfirmation } from "mobile/OrderConfirmation"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Drawer as MuiDrawer } from "@material-ui/core"

import { DrawerBottomButton } from "./DrawerBottomButton"
import { useDrawerContext } from "./DrawerContext"
import { DrawerFAQ } from "mobile/DrawerFAQ/DrawerFAQ"

interface DrawerProps {
  open?: boolean
  onClose?: () => void
}

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
        return <Bag />
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
      case "editPaymentAndShipping":
        return <EditPaymentAndShipping navigation={{}} route={{ params }} />
      case "editPaymentMethod":
        return <EditPaymentMethod />
      case "reviewOrder":
        return <ReviewOrder order={params.order} />
      case "orderConfirmation":
        return <OrderConfirmation order={params.order} customer={params.customer} />
    }
  }

  const showCloseButton = ["bag", "profile"].includes(currentView)

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
`
