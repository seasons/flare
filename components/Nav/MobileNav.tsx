import { useDrawerContext } from "components/Drawer/DrawerContext"
import { LoginModal } from "components/Login/LoginModal"
import { useAuthContext } from "lib/auth/AuthContext"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { animated, useSpring } from "react-spring"
import styled from "styled-components"

import { color } from "../../helpers/color"
import { Schema, useTracking } from "../../utils/analytics"
import { Box, BoxProps } from "../Box"
import { Sans } from "../Typography"
import { Burger } from "./Burger"
import { SeasonsLogo } from "./SeasonsLogo"
import { NavProps } from "./Types"
import { NotificationBar } from "@seasons/eclipse"

export const MENU_HEIGHT = "59px"

export const MobileNav: React.FC<NavProps> = ({ links, onClickNotificationBar }) => {
  const [isOpen, toggleOpen] = useState(false)
  const router = useRouter()
  const tracking = useTracking()
  const [isLoginOpen, toggleLogin] = useState(false)
  const {
    authState: { isSignedIn },
  } = useAuthContext()

  // Delay rendering of notif bar by 1 second so simultaneous renders of
  // notif bar in DesktopNav and MobileNav do not create a race condition
  // on the backend that ends up creating multiple receipts for a given notif.
  const [renderNotifBar, setRenderNotifBar] = useState(false)
  setTimeout(() => setRenderNotifBar(true), 1000)

  useEffect(() => {
    toggleOpen(false)
  }, [router.asPath])

  return (
    <HeaderContainer>
      <Header>
        <Box px={2}>
          <SeasonsLogo />
        </Box>
        <Burger
          onClick={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.BurgerClicked,
              actionType: Schema.ActionTypes.Tap,
            })
            toggleOpen(!isOpen)
          }}
        />
      </Header>
      <Menu
        items={links}
        open={isOpen}
        onSelect={() => {
          toggleOpen(false)
        }}
        openLogin={() => {
          toggleLogin(true)
        }}
      />
      <LoginModal
        open={isLoginOpen}
        onClose={() => {
          toggleLogin(false)
        }}
      />
      {renderNotifBar && <NotificationBar onClick={onClickNotificationBar} isLoggedIn={isSignedIn} />}
    </HeaderContainer>
  )
}

const Menu = ({ items, open, onSelect, openLogin }) => {
  const router = useRouter()
  const tracking = useTracking()
  const { userSession } = useAuthContext()
  const { openDrawer } = useDrawerContext()

  const isLoggedIn = !!userSession
  const openAnimation = useSpring({
    transform: open ? `translateY(0)` : "translateY(-100%)",
    config: { tension: 500, friction: 33 },
  })

  const trackClick = (url) => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.NavigationButtonClicked,
      actionType: Schema.ActionTypes.Tap,
      url,
    })
  }

  return (
    <Wrapper>
      <AnimatedContainer style={openAnimation}>
        <Box px={2} style={{ backgroundColor: color("white100") }}>
          {items.map((link) => {
            if (link.external) {
              return (
                <StyledAnchor
                  href={link.url}
                  key={link.text}
                  onClick={() => {
                    trackClick(link.url)
                    onSelect()
                  }}
                >
                  <MenuItem
                    key={link.text}
                    width="100%"
                    style={{ cursor: "pointer" }}
                    active={!!router.pathname.match(link.match)}
                  >
                    <Box py={2}>
                      <Sans size="3" py={2} color="black">
                        {link.text}
                      </Sans>
                    </Box>
                  </MenuItem>
                </StyledAnchor>
              )
            } else if (link.url) {
              return (
                <NextLink href={link.url} key={link.text}>
                  <MenuItem
                    key={link.text}
                    width="100%"
                    style={{ cursor: "pointer" }}
                    active={!!router.pathname.match(link.match)}
                    onClick={() => {
                      trackClick(link.url)
                      onSelect()
                    }}
                  >
                    <Box py={2}>
                      <Sans size="3" py={2} color="black">
                        {link.text}
                      </Sans>
                    </Box>
                  </MenuItem>
                </NextLink>
              )
            } else {
              return link.renderNavItem()
            }
          })}
          {isLoggedIn ? (
            <>
              <MenuItem
                key="bag"
                width="100%"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  openDrawer("bag")
                  onSelect()
                }}
              >
                <Box py={2}>
                  <Sans size="3" py={2} color="black">
                    Bag
                  </Sans>
                </Box>
              </MenuItem>
              <MenuItem
                key="account"
                width="100%"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  openDrawer("profile")
                  onSelect()
                }}
              >
                <Box py={2}>
                  <Sans size="3" py={2} color="black">
                    Account
                  </Sans>
                </Box>
              </MenuItem>
            </>
          ) : (
            <>
              <NextLink href="/signup">
                <MenuItem
                  width="100%"
                  style={{ cursor: "pointer" }}
                  active={!!router.pathname.match("/signup")}
                  onClick={() => {
                    trackClick("/signup")
                    onSelect()
                  }}
                >
                  <Box py={2}>
                    <Sans size="3" py={2} color="black">
                      Sign Up
                    </Sans>
                  </Box>
                </MenuItem>
              </NextLink>
              <MenuItem
                key="login"
                width="100%"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  openLogin()
                  onSelect()
                }}
              >
                <Box py={2}>
                  <Sans size="3" py={2} color="black">
                    Log In
                  </Sans>
                </Box>
              </MenuItem>
            </>
          )}
        </Box>
      </AnimatedContainer>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  height: ${MENU_HEIGHT};
  top: 0;
  left: 0;
  width: 100%;
`

const StyledAnchor = styled("a")`
  text-decoration: none;
  color: inherit;
  &:hover,
  &:focus {
    background-color: transparent !important;
  }
`

const HeaderContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  height: ${MENU_HEIGHT};
  z-index: 100;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${color("white100")};
`

const MenuContainer = styled.div`
  overflow: hidden;
  padding-top: ${MENU_HEIGHT};
  width: 100%;
  transform: translateY(-100%);
`

const Header = styled(Box)`
  height: ${MENU_HEIGHT};
  z-index: 101;
  width: 100%;
  position: relative;
  background-color: ${color("white100")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
`

const MenuItem = styled.div<BoxProps & { active?: boolean }>`
  border-bottom: 1px solid ${color("black10")};
  background: ${color("white100")};
  flex-direction: row;
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  align-items: center;
  text-align: center;
`

const AnimatedContainer = animated((props) => <MenuContainer {...props} />)
