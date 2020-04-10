import { Theme } from "../lib/theme"
import { Nav } from "./Nav"
import { Footer } from "./Footer"
import { LayoutHead } from "./LayoutHead"

interface LayoutProps {
  fixedNav?: boolean
  children?: any
}

export const Layout = ({ fixedNav = false, children }: LayoutProps) => {
  return (
    <>
      <LayoutHead />
      <Theme>
        <Nav fixed={fixedNav} />
        {children}
        <Footer />
      </Theme>
    </>
  )
}
