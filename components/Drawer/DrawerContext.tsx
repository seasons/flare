import React, { useContext } from "react"

export type DrawerView =
  | "savedAndHistory"
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
  | "choosePlan"
  | "editShipping"
  | "reviewOrder"
  | "orderConfirmation"
  | "editPaymentMethod"
  | "guestShipping"
  | "guestPayment"

export const DrawerContext = React.createContext({
  isOpen: false,
  openDrawer: (view: string, options?: any) => null,
  closeDrawer: () => null,
  currentView: "bag" as DrawerView,
  params: null,
})

export const useDrawerContext = () => useContext(DrawerContext)
