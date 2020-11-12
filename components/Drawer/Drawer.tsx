import { Box, Button } from "components"
import { FAQ } from "components/Homepage"
import { PaymentAndShipping } from "mobile/Account"
import { Account } from "mobile/Account/Account"
import { ResumeConfirmation } from "mobile/Account/Components/Pause"
import { MembershipInfo } from "mobile/Account/MembershipInfo"
import { PersonalPreferences } from "mobile/Account/PersonalPreferences"
import { Bag } from "mobile/Bag/Bag"
import {
  Reservation, ReservationConfirmation, ReservationShippingAddress
} from "mobile/Reservation"
import React, { useEffect } from "react"
import styled from "styled-components"

import { Drawer as MuiDrawer } from "@material-ui/core"

import { CloseButton } from "../CloseButton"
import { useDrawerContext } from "./DrawerContext"
import { ChoosePlanPane } from "mobile/Account/Components/ChoosePlanPane"

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
    <MuiDrawer anchor="right" open={isOpen} onClose={handleClose} variant="temporary">
      <Box width="380px" height="100%" style={{ position: "relative" }} pb={showCloseButton ? "60px" : 0}>
        {view()}
      </Box>
      {showCloseButton && (
        <ButtonContainer p={2}>
          <Button onClick={handleClose} variant="secondaryOutline" block>
            Close
          </Button>
        </ButtonContainer>
      )}
    </MuiDrawer>
  )
}

const ButtonContainer = styled(Box)`
  position: fixed;
  width: 380px;
  bottom: 0;
  right: 0;
`
