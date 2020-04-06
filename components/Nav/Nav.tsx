import { Media } from "../Responsive"
import { NavProps } from "./Types"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"

const links = [
  {
    text: "Home",
    url: "/",
    match: /^\/$/,
  },
  {
    text: "Browse",
    url: "/browse/all",
    match: /^\/browse/,
  },
  {
    text: "Blog",
    url: "https://blog.seasons.nyc",
    match: /blog.seasons.nyc/,
  },
  {
    text: "Pricing",
    url: "/#Membership",
    match: /^\/\#Membership$/,
  },
  {
    text: "Brands",
    url: "/#FAQ",
    match: /^\/#FAQ$/,
  },
  {
    text: "About Us",
    url: "/about",
    match: /^\/#FAQ$/,
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
