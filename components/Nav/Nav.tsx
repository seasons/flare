import { Media } from "../Responsive"
import { BrandsNavItem } from "./BrandsNavItem"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { NavProps } from "./Types"

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
