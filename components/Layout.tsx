import { PopUpProvider } from "components/PopUp/PopUpProvider"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import styled from "styled-components"

import { Theme } from "../lib/theme"
import { Box } from "./Box"
import { Drawer } from "./Drawer/Drawer"
import { DrawerProvider } from "./Drawer/DrawerProvider"
import { Footer } from "./Footer"
import { Intercom } from "./Intercom"
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
  brandItems: { name: string; slug: string }[]
  scrollRef?: any
}

export const Layout = ({
  children,
  hideFooter,
  footerBottomPadding,
  includeDefaultHead = true,
  brandItems,
}: LayoutProps) => {
  // If there are any UTM params, store them in a cookie
  const router = useRouter()
  const utm = {
    source: router.query?.utm_source,
    medium: router.query?.utm_medium,
    campaign: router.query?.utm_campaign,
    term: router.query?.utm_term,
    content: router.query?.utm_content,
  }
  if (typeof window !== "undefined") {
    if (!!utm.source || !!utm.medium || !!utm.campaign || !!utm.term || !!utm.content) {
      localStorage?.setItem("utm", JSON.stringify(utm))
    }
  }

  return (
    <>
      {includeDefaultHead && <LayoutHead />}
      <PopUpProvider>
        <DrawerProvider>
          <Theme>
            <Intercom />
            <Nav brandItems={brandItems} />
            <MaxWidth>
              <Box style={{ flexGrow: 1, position: "relative", width: "100%" }}>
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
