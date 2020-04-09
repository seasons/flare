import { Theme } from "../lib/theme"
import { Nav } from "./Nav"
import { Footer } from "./Footer"

interface LayoutProps {
  fixedNav?: boolean
  children?: any
}

export const Layout = ({ fixedNav = false, children }: LayoutProps) => {
  return (
    <Theme>
      <Nav fixed={fixedNav} />
      {children}
      <Footer />
    </Theme>
  )
}
