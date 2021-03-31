import React from "react"
import { Media } from "../Responsive"
import { BrandsNavItem, BrandsNavItemFragment_Query } from "./BrandsNavItem"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { NavProps } from "./Types"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useRouter } from "next/router"
import gql from "graphql-tag"

type Props = Omit<NavProps, "onClickNotificationBar"> & {
  brandItems: { name: string; slug: string }[]
}

export const NavFragment_Query = gql`
  fragment NavFragment_Query on Query {
    ...BrandsNavItemFragment_Query
  }
  ${BrandsNavItemFragment_Query}
`

export const Nav: React.FC<Props> = ({ brandItems }) => {
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
      url: "https://blog.seasons.nyc",
      match: /blog.seasons.nyc/,
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
      renderNavItem: () => <BrandsNavItem key="designers" brandItems={brandItems} />,
    },
  ]

  const onClickNotificationBar = (route) => {
    if (!!route.drawerView) {
      openDrawer(route.drawerView)
    }
    if (!!route.url) {
      router.push(route.url)
    }
  }

  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopNav links={links} onClickNotificationBar={onClickNotificationBar} />
      </Media>
      <Media lessThan="md">
        <MobileNav links={links} onClickNotificationBar={onClickNotificationBar} />
      </Media>
    </>
  )
}
