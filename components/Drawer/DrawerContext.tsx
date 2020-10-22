import React, { useContext } from "react"

export const DrawerContext = React.createContext({
    isOpen: false,
    openDrawer: (view: string) => null,
    closeDrawer: () => null, 
})

export const useDrawerContext = () => useContext(DrawerContext)