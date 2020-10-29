import { Box } from "components"
import { Account } from "mobile/Account/Account"
import { Bag } from "mobile/Bag/Bag"
import { Reservation, ReservationConfirmation } from "mobile/Reservation"
import React, { useEffect } from "react"

import { Drawer as MuiDrawer } from "@material-ui/core"

import { CloseButton } from "../CloseButton"
import { useDrawerContext } from "./DrawerContext"

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
      case "reservation":
        return <Reservation />
      case "reservationConfirmation":
        return <ReservationConfirmation route={{ params }} />
      case "profile":
        return <Account />
    }
  }

  return (
    <MuiDrawer anchor="right" open={isOpen} onClose={handleClose} variant="temporary">
      <Box width="380px" height="100%" style={{ position: "relative" }}>
        <CloseButton variant="light" />
        {view()}
      </Box>
    </MuiDrawer>
  )
}