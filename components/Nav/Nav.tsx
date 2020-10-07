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
    text: "Grant",
    url: "https://blog.seasons.nyc/creative-project",
    match: /blog.seasons.nyc\/creative-project/,
    external: true,
  },
  {
    text: "About",
    url: "/about",
    match: /^\/about/,
    external: false,
  },
  {
    text: "Sign up",
    url: "/signup",
    match: /^\/signup/,
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
