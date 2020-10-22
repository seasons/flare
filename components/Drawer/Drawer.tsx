import { Box } from "components"
import { Bag } from "mobile/Bag/Bag"
import { Reservation, ReservationConfirmation } from "mobile/Reservation"
import React, { useEffect } from "react"

import { Drawer as MuiDrawer } from "@material-ui/core"

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
    }
  }

  return (
    <MuiDrawer anchor="right" open={isOpen} onClose={handleClose} variant="temporary">
      <Box width="380px" height="100%" style={{ position: "relative" }}>
        {view()}
      </Box>
    </MuiDrawer>
  )
}
