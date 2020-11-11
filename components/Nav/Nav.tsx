import { useState } from "react"

import { Media } from "../Responsive"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { NavProps } from "./Types"

const links = [
  {
    text: "Home",
    url: "/",
    match: /^\/$/,
    external: false,
  },
  {
    text: "Browse",
    url: "/browse",
    match: /^\/browse/,
    external: false,
  },
  {
    text: "Blog",
    url: "https://blog.seasons.nyc",
    match: /blog.seasons.nyc/,
    external: true,
  },
  {
    text: "About",
    url: "/about",
    match: /^\/about/,
    external: false,
  },
]

export const Nav: React.FC<NavProps> = ({ fixed }) => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopNav links={links} fixed={fixed} />
      </Media>
      <Media lessThan="md">
        <MobileNav links={links} fixed={fixed} />
      </Media>
    </>
  )
}
