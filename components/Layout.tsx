import { PopUpProvider } from "components/PopUp/PopUpProvider"
import React from "react"

import { Theme } from "../lib/theme"
import { Box } from "./Box"
import { Drawer } from "./Drawer/Drawer"
import { DrawerProvider } from "./Drawer/DrawerProvider"
import { Footer } from "./Footer"
import { LayoutHead } from "./LayoutHead"
import { MaxWidth } from "./MaxWidth"
import { Nav } from "./Nav"
import { PopUp } from "./PopUp"

interface LayoutProps {
  fixedNav?: boolean
  hideFooter?: boolean
  children?: any
  footerBottomPadding?: string | string[]
  includeDefaultHead?: boolean
}

export const Layout = ({
  fixedNav = false,
  children,
  hideFooter,
  footerBottomPadding,
  includeDefaultHead = true,
}: LayoutProps) => {
  return (
    <>
      {includeDefaultHead && <LayoutHead />}
      <PopUpProvider>
        <DrawerProvider>
          <Theme>
            <Nav fixed={fixedNav} />
            <MaxWidth>
              <Box pt={60} pb={60} style={{ flexGrow: 1, position: "relative", width: "100%" }}>
                {children}
                {!hideFooter && <Footer footerBottomPadding={footerBottomPadding} />}
              </Box>
            </MaxWidth>
            <Drawer />
            <PopUp />
          </Theme>
        </DrawerProvider>
      </PopUpProvider>
    </>
  )
}
