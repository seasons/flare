import { Box } from "components"
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

export const Drawer: React.FC<DrawerProps> = ({ children, open, onClose }) => {
  const { isOpen, closeDrawer, openDrawer, currentView, params } = useDrawerContext()

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
        return <ChoosePlanPane headerText={"Let's choose your plan"} />
    }
  }
  const showCloseButton = ["bag", "profile"].includes(currentView)

  return (
    <MuiDrawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      variant="temporary"
      PaperProps={{ component: DrawerBox, id: "appDrawer" }}
    >
      <Box width="100%" height="100%" style={{ position: "relative" }} pb={showCloseButton ? "60px" : 0}>
        {view()}
      </Box>
      {showCloseButton && (
        <DrawerBottomButton buttonProps={{ onClick: handleClose, variant: "secondaryOutline" }}>
          Close
        </DrawerBottomButton>
      )}
    </MuiDrawer>
  )
}

// Returns the width of the scrollbar on the drawer
export const useDrawerScrollbarWidth = () => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0)

  useEffect(() => {
    let newWidth = 0
    if (typeof document !== "undefined") {
      const pane = document.getElementById("appDrawer")
      newWidth = pane.offsetWidth - pane.clientWidth
    }
    setScrollbarWidth(newWidth)
  }, [document])

  return scrollbarWidth
}

export const DrawerBox = styled(Box)`
  width: 380px;
  @media (max-width: 380px) {
    width: 100%;
  }
`
