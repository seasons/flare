import React, { useContext } from "react"

export type DrawerView =
  | "bag"
  | "faq"
  | "reservation"
  | "reservationConfirmation"
  | "reservationShippingAddress"
  | "profile"
  | "membershipInfo"
  | "personalPreferences"
  | "paymentAndShipping"
  | "resumeConfirmation"

export const DrawerContext = React.createContext({
  isOpen: false,
  openDrawer: (view: string, options?: any) => null,
  closeDrawer: () => null,
  currentView: "bag" as DrawerView,
  params: null,
})

export const useDrawerContext = () => useContext(DrawerContext)
