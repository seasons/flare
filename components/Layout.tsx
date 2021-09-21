import { PopUpProvider } from "components/PopUp/PopUpProvider"
import { useRouter } from "next/router"
import React from "react"
import { useAuthContext } from "lib/auth/AuthContext"
import { Theme } from "../lib/theme"
import { Box } from "./Box"
import { Drawer } from "./Drawer/Drawer"
import { DrawerProvider } from "./Drawer/DrawerProvider"
import { Footer } from "./Footer"
import { Intercom } from "./Intercom"
import { LayoutHead } from "./LayoutHead"
import { MaxWidth } from "./MaxWidth"
import { Nav, NavFragment_Query } from "./Nav/Nav"
import { PopUp } from "./PopUp"
import { useMutation, useQuery } from "@apollo/client"
import { ModalProvider } from "./Modal/ModalProvider"
import { Modal } from "./Modal"
import { gql } from "@apollo/client"
import { ButtonVariant } from "./Button/Button.shared"
import { DESKTOP_NAV_HEIGHT } from "./Nav/DesktopNav"

export const SET_IMPACT_ID = gql`
  mutation SetImpactID($impactId: String) {
    addCustomerDetails(details: { impactId: $impactId }) {
      id
    }
  }
`

export const Layout_Query = gql`
  query Layout_Query {
    ...NavFragment_Query
  }
  ${NavFragment_Query}
`

export interface NavStyles {
  backgroundColor?: string
  textColor?: string
  buttonVariant?: ButtonVariant
  getTheAppVariant?: ButtonVariant
  hideSignIn?: boolean
}

interface LayoutProps {
  fixedNav?: boolean
  hideFooter?: boolean
  children?: any
  footerBottomPadding?: string | string[]
  includeDefaultHead?: boolean
  showIntercom?: boolean
  PageNotificationBar?: () => React.ReactElement
  navStyles?: NavStyles
  hideNavPadding?: boolean
}

export const Layout = ({
  children,
  hideFooter,
  footerBottomPadding,
  includeDefaultHead = true,
  showIntercom = false,
  hideNavPadding = false,
  PageNotificationBar,
  navStyles,
}: LayoutProps) => {
  const { authState } = useAuthContext()
  const [setImpactId] = useMutation(SET_IMPACT_ID)
  const isSignedIn = authState?.isSignedIn

  const { previousData, data = previousData } = useQuery(Layout_Query)

  const brandItems = data?.navigationBrands

  // If there are any UTM params, store them in a cookie
  // If there is an impact click id, store it in a cookie
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
    if (!!router.query?.irclickid) {
      localStorage?.setItem("impactId", router.query.irclickid as string)
      // If we're logged in already, add this to the customer record
      if (isSignedIn) {
        setImpactId({
          variables: {
            impactId: router.query.irclickid,
          },
        })
      }
    }
  }

  return (
    <>
      {includeDefaultHead && <LayoutHead />}
      <ModalProvider>
        <PopUpProvider>
          <DrawerProvider>
            <Theme>
              {showIntercom && <Intercom />}
              <Nav brandItems={brandItems} PageNotificationBar={PageNotificationBar} navStyles={navStyles} />
              <MaxWidth height="100%" disableMaxWidth>
                <Box style={{ flexGrow: 1, position: "relative", width: "100%" }}>
                  {children}
                  {!hideFooter && <Footer footerBottomPadding={footerBottomPadding} brandItems={brandItems} />}
                </Box>
              </MaxWidth>
              <Drawer />
              <PopUp />
              <Modal />
            </Theme>
          </DrawerProvider>
        </PopUpProvider>
      </ModalProvider>
    </>
  )
}
