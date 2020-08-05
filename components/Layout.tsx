import { Theme } from "../lib/theme"
import { Nav } from "./Nav"
import { Footer } from "./Footer"
import { LayoutHead } from "./LayoutHead"
import { Box } from "./Box"
import { MaxWidth } from "./MaxWidth"

interface LayoutProps {
  fixedNav?: boolean
  hideFooter?: boolean
  children?: any
  footerBottomPadding?: string | string[]
}

export const Layout = ({ fixedNav = false, children, hideFooter, footerBottomPadding }: LayoutProps) => {
  return (
    <>
      <LayoutHead />
      <Theme>
        <Nav fixed={fixedNav} />
        <MaxWidth>
          <Box pt={60} pb={60} style={{ flexGrow: 1, position: "relative", width: "100%" }}>
            {children}
            {!hideFooter && <Footer footerBottomPadding={footerBottomPadding} />}
          </Box>
        </MaxWidth>
      </Theme>
    </>
  )
}
