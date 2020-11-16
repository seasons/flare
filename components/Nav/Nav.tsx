import { Media } from "../Responsive"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { NavProps } from "./Types"
import { BrandsNavItem } from "./BrandsNavItem"

type Props = NavProps & {
  brandItems: { name: string; slug: string }[]
}

export const Nav: React.FC<Props> = ({ fixed, brandItems }) => {
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
      text: "Designers",
      external: false,
      renderNavItem: () => <BrandsNavItem key="designers" brandItems={brandItems} />,
    },
    {
      text: "Blog",
      url: "https://blog.seasons.nyc",
      match: /blog.seasons.nyc/,
      external: true,
    },
  ]

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
