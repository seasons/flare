import { Theme } from "../lib/theme"
import { Nav } from "./Nav"
import { Footer } from "./Footer"
import { LayoutHead } from "./LayoutHead"
import { Box } from "./Box"
import { BlackOverlay } from "./BlackOverlay"

interface LayoutProps {
  fixedNav?: boolean
  children?: any
}

export const Layout = ({ fixedNav = false, children }: LayoutProps) => {
  return (
    <>
      <LayoutHead />
      <Theme>
        <Box pt={60} pb={60} style={{ minHeight: "100vh", position: "relative" }}>
          <BlackOverlay />
          <Nav fixed={fixedNav} />
          {children}
          <Footer />
        </Box>
      </Theme>
    </>
  )
}
