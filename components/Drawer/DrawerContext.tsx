import React, { useContext } from "react"

export type DrawerView = "bag" | "reservation" | "reservationConfirmation"

export const DrawerContext = React.createContext({
  isOpen: false,
  openDrawer: (view: string, options?: any) => null,
  closeDrawer: () => null,
  currentView: "bag" as DrawerView,
  params: null,
})

export const useDrawerContext = () => useContext(DrawerContext)
