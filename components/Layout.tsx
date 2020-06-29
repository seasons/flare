import { Theme } from "../lib/theme"
import { Nav } from "./Nav"
import { Footer } from "./Footer"
import { LayoutHead } from "./LayoutHead"
import { Box } from "./Box"

interface LayoutProps {
  fixedNav?: boolean
  hideFooter?: boolean
  children?: any
}

export const Layout = ({ fixedNav = false, children, hideFooter }: LayoutProps) => {
  return (
    <>
      <LayoutHead />
      <Theme>
        <Box pt={60} pb={60} style={{ height: "100%", position: "relative" }}>
          <Nav fixed={fixedNav} />
          {children}
          {!hideFooter && <Footer />}
        </Box>
      </Theme>
    </>
  )
}
