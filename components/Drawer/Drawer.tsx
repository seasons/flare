import { Box, Button, PinnedButtonContainer } from "components"
import { FAQ } from "components/Homepage"
import { PaymentAndShipping } from "mobile/Account"
import { Account } from "mobile/Account/Account"
import { ResumeConfirmation } from "mobile/Account/Components/Pause"
import { MembershipInfo } from "mobile/Account/MembershipInfo"
import { PersonalPreferences } from "mobile/Account/PersonalPreferences"
import { Bag } from "mobile/Bag/Bag"
import { Reservation, ReservationConfirmation, ReservationShippingAddress } from "mobile/Reservation"
import React, { useEffect } from "react"

import { Drawer as MuiDrawer } from "@material-ui/core"

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
      PaperProps={{ component: ResponsiveBox }}
    >
      <Box width="100%" height="100%" style={{ position: "relative" }} pb={showCloseButton ? "60px" : 0}>
        {view()}
      </Box>
      {showCloseButton && (
        <PinnedButtonContainer p={2}>
          <Button onClick={handleClose} variant="secondaryOutline" block>
            Close
          </Button>
        </PinnedButtonContainer>
      )}
    </MuiDrawer>
  )
}

const ResponsiveBox = styled(Box)`
  width: 380px;
  @media (max-width: 380px) {
    width: 100%;
  }
`
