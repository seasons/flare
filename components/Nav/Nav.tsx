import React from "react"
import { Media } from "../Responsive"
import { BrandsNavItem, BrandsNavItemFragment_Query } from "./BrandsNavItem"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { NavProps } from "./Types"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useRouter } from "next/router"
import gql from "graphql-tag"
import { NotificationBar } from "@seasons/eclipse"
import { useAuthContext } from "lib/auth/AuthContext"
import { NavStyles } from "components/Layout"

type Props = Omit<NavProps, "onClickNotificationBar"> & {
  brandItems: { name: string; slug: string }[]
  PageNotificationBar?: () => React.ReactElement
  navStyles: NavStyles
}

export const NavFragment_Query = gql`
  fragment NavFragment_Query on Query {
    ...BrandsNavItemFragment_Query
  }
  ${BrandsNavItemFragment_Query}
`

export const Nav: React.FC<Props> = ({ brandItems, PageNotificationBar, navStyles }) => {
  const { openDrawer } = useDrawerContext()
  const router = useRouter()
  const links = [
    {
      text: "Home",
      url: "/",
      match: /^\/$/,
      external: false,
    },
    {
      text: "Blog",
      url: "/blog",
      match: /^\/blog/,
      external: true,
    },
    {
      text: "Browse",
      url: "/browse",
      match: /^\/browse/,
      external: false,
    },
    {
      text: "Designers",
      external: false,
      renderNavItem: () => <BrandsNavItem key="designers" brandItems={brandItems} textColor={navStyles?.textColor} />,
    },
  ]

  const onClickNotificationBar = (route) => {
    if (!!route?.drawerView) {
      openDrawer(route.drawerView)
    }
    if (!!route.url) {
      router.push(route.url)
    }
  }

  const {
    authState: { isSignedIn },
  } = useAuthContext()

  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopNav links={links} navStyles={navStyles} />
      </Media>
      <Media lessThan="md">
        <MobileNav links={links} />
      </Media>
      <NotificationBar onClickBanner={onClickNotificationBar} isLoggedIn={isSignedIn} />
      {PageNotificationBar?.()}
    </>
  )
}
