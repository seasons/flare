import { Box, Flex } from "components"
import { FAQ } from "components/Homepage"
import { PaymentAndShipping } from "mobile/Account"
import { Account } from "mobile/Account/Account"
import { ResumeConfirmation } from "mobile/Account/Components/Pause"
import { MembershipInfo } from "mobile/Account/MembershipInfo"
import { PersonalPreferences } from "mobile/Account/PersonalPreferences"
import { Bag } from "mobile/Bag/Bag"
import { Reservation, ReservationConfirmation, ReservationShippingAddress } from "mobile/Reservation"
import React, { useEffect, useState } from "react"

import { Drawer as MuiDrawer } from "@material-ui/core"
import { DrawerBottomButton } from "./DrawerBottomButton"

import { useDrawerContext } from "./DrawerContext"
import { ChoosePlanPane } from "mobile/Account/Components/ChoosePlanPane"
import styled from "styled-components"

interface DrawerProps {
  open?: boolean
  onClose?: () => void
}

export const Drawer = (props: DrawerProps) => {
  const { open, onClose } = props
  const { isOpen, closeDrawer, openDrawer, currentView, params } = useDrawerContext()

  let drawerWidth = 380
  if (typeof window !== "undefined") {
    const windowWidth = window.innerWidth
    if (windowWidth < 800) {
      drawerWidth = windowWidth
    }
  }

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
        return <PersonalPreferences />
      case "paymentAndShipping":
        return <PaymentAndShipping />
      case "faq":
        return <FAQ />
      case "resumeConfirmation":
        return <ResumeConfirmation />
      case "choosePlan":
        return <ChoosePlanPane headerText={"Let's choose your plan"} source={params?.source} />
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
        <DrawerBottomButton buttonProps={{ onClick: handleClose, variant: "secondaryOutlineWhite" }}>
          Close
        </DrawerBottomButton>
      )}
    </StyledDrawer>
  )
}

const StyledDrawer = styled(MuiDrawer)<{ width: number }>`
  #appDrawer {
    width: ${(p) => p.width}px;
  }
`
