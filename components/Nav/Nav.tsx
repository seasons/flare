import { Media } from "../Responsive"
import { NavProps } from "./Types"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"

const links = [
  {
    text: "Home",
    url: "/",
    match: /^\/$/,
    external: false,
  },
  {
    text: "Browse",
    url: "/browse/all",
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
    text: "About Us",
    url: "/about",
    match: /^\/#FAQ$/,
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
