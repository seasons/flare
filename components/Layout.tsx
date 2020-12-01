import { PopUpProvider } from "components/PopUp/PopUpProvider"
import React, { useEffect } from "react"

import { Theme } from "../lib/theme"
import { Box } from "./Box"
import { Drawer } from "./Drawer/Drawer"
import { DrawerProvider } from "./Drawer/DrawerProvider"
import { Footer } from "./Footer"
import { LayoutHead } from "./LayoutHead"
import { MaxWidth } from "./MaxWidth"
import { Nav } from "./Nav"
import { useRouter } from "next/router"
import { PopUp } from "./PopUp"
import styled from "styled-components"

interface LayoutProps {
  fixedNav?: boolean
  hideFooter?: boolean
  children?: any
  footerBottomPadding?: string | string[]
  includeDefaultHead?: boolean
  brandItems: { name: string; slug: string }[]
  onScroll?: () => void
  scrollRef?: any
}

export const Layout = ({
  fixedNav = false,
  children,
  hideFooter,
  footerBottomPadding,
  includeDefaultHead = true,
  brandItems,
  onScroll,
  scrollRef,
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
            {fixedNav && <Nav fixed={fixedNav} brandItems={brandItems} />}
            <ScrollContainer mt={fixedNav ? 60 : 0} pb={60} onScroll={onScroll} ref={scrollRef}>
              <MaxWidth>
                <Box style={{ flexGrow: 1, position: "relative", width: "100%" }}>
                  {!fixedNav && <Nav fixed={fixedNav} brandItems={brandItems} />}
                  {children}
                  {!hideFooter && <Footer footerBottomPadding={footerBottomPadding} />}
                </Box>
              </MaxWidth>
              <Drawer />
              <PopUp />
            </ScrollContainer>
          </Theme>
        </DrawerProvider>
      </PopUpProvider>
    </>
  )
}

const ScrollContainer = styled(Box)`
  overflow-y: auto;
  display: flex;
  flex: 1;
`
