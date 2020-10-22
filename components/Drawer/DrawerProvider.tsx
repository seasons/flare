import React, { useReducer } from "react"

import { DrawerContext } from "./DrawerContext"

enum DrawerAction {
  Open = "OPEN",
  Close = "CLOSE",
}

export const DrawerProvider = ({ children }) => {
  const [drawerState, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case DrawerAction.Open:
          return {
            ...prevState,
            data: action.data,
            isOpen: true,
          }
        case DrawerAction.Close:
          return {
            ...prevState,
            isOpen: false,
          }
      }
    },
    {
      isOpen: false,
    }
  )

  const drawerContext = {
    openDrawer: async (view) => {
      dispatch({ type: DrawerAction.Open, view })
    },
    closeDrawer: async () => {
      dispatch({ type: DrawerAction.Close })
    },
    isOpen: drawerState.isOpen,
  }

  return <DrawerContext.Provider value={drawerContext}>{children}</DrawerContext.Provider>
}
