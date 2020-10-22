import { Theme } from "../lib/theme"
import { Box } from "./Box"
import { Drawer } from "./Drawer/Drawer"
import { Footer } from "./Footer"
import { LayoutHead } from "./LayoutHead"
import { MaxWidth } from "./MaxWidth"
import { Nav } from "./Nav"

interface LayoutProps {
  fixedNav?: boolean
  hideFooter?: boolean
  children?: any
  footerBottomPadding?: string | string[]
  includeDefaultHead?: boolean
}

export const Layout = ({
  fixedNav = false,
  children,
  hideFooter,
  footerBottomPadding,
  includeDefaultHead = true,
}: LayoutProps) => {
  return (
    <>
      {includeDefaultHead && <LayoutHead />}
      <Theme>
        <Nav fixed={fixedNav} />
        <MaxWidth>
          <Box pt={60} pb={60} style={{ flexGrow: 1, position: "relative", width: "100%" }}>
            {children}
            {!hideFooter && <Footer footerBottomPadding={footerBottomPadding} />}
          </Box>
        </MaxWidth>
        <Drawer />
      </Theme>
    </>
  )
}
