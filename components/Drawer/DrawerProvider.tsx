import React, { useReducer } from "react"

import { DrawerContext, DrawerView } from "./DrawerContext"

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
            isOpen: true,
            currentView: action.view,
            params: action.params,
          }
        case DrawerAction.Close:
          return {
            ...prevState,
            isOpen: false,
            params: null,
          }
      }
    },
    {
      isOpen: false,
      params: null,
    }
  )

  const drawerContext = {
    openDrawer: async (view, params) => {
      dispatch({ type: DrawerAction.Open, view, params })
    },
    closeDrawer: async () => {
      dispatch({ type: DrawerAction.Close })
    },
    isOpen: drawerState.isOpen,
    currentView: drawerState.currentView as DrawerView,
    params: drawerState.params,
  }

  return <DrawerContext.Provider value={drawerContext}>{children}</DrawerContext.Provider>
}
