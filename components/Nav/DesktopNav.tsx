import { Drawer } from "components/Drawer"
import { LoginModal } from "components/Login/LoginModal"
import { useAuthContext } from "lib/auth/AuthContext"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"

import { MaxWidth } from "../"
import { color } from "../../helpers/color"
import { Schema, useTracking } from "../../utils/analytics"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { NavItem } from "./NavItem"
import { SeasonsLogo } from "./SeasonsLogo"
import { NavProps } from "./Types"

export const DesktopNav = ({ fixed = false, links }: NavProps) => {
  const router = useRouter()
  const tracking = useTracking()
  const [isDrawerOpen, toggleDrawer] = useState(false)
  const [isLoginOpen, toggleLogin] = useState(false)
  const { userSession, signOut } = useAuthContext()

  const isLoggedIn = !!userSession

  const trackClick = (url) => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.NavigationButtonClicked,
      actionType: Schema.ActionTypes.Tap,
      url,
    })
  }

  return (
    <HeaderContainer fixed={fixed}>
      <MaxWidth>
        <Flex ml="auto" flexDirection="row" alignItems="center" width="100%" px={[2, 2, 2, 5, 5]}>
          <SeasonsLogo />
          <Flex ml="auto" flexDirection="row" alignItems="center">
            {links.map((link) => {
              if (link.external) {
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    active={!!router.pathname.match(link.match)}
                    onClick={() => trackClick(link.url)}
                  >
                    <NavItem link={link} />
                  </Link>
                )
              } else {
                return (
                  <NextLink href={link.url} key={link.text}>
                    <Link
                      href={link.url}
                      active={!!router.pathname.match(link.match)}
                      onClick={() => trackClick(link.url)}
                    >
                      <NavItem link={link} />
                    </Link>
                  </NextLink>
                )
              }
            })}
            {isLoggedIn ? (
              <>
                <Link
                  onClick={() => {
                    toggleDrawer(true)
                  }}
                >
                  <NavItem link={{ text: "Bag" }} />
                </Link>
                <Link
                  onClick={() => {
                    signOut()
                  }}
                >
                  <NavItem link={{ text: "Log out" }} />
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" active={!!router.pathname.match("/signup")}>
                  <NavItem link={{ text: "Sign Up" }} />
                </Link>
                <Link
                  onClick={() => {
                    toggleLogin(true)
                  }}
                >
                  <NavItem link={{ text: "Log In" }} />
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </MaxWidth>
      <Drawer
        open={isDrawerOpen}
        onClose={() => {
          toggleDrawer(false)
        }}
      />
      <LoginModal
        open={isLoginOpen}
        onClose={() => {
          toggleLogin(false)
        }}
      />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div<{ fixed: boolean }>`
  top: 0;
  left: 0;
  background-color: ${color("white100")};
  position: ${(p) => (p.fixed ? "fixed" : "relative")};
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  height: 58.5px;
  align-items: center;
`

const Link = styled.a<{ active?: boolean }>`
  color: black;
  text-decoration: none;
  height: 60px;
  line-height: 60px;

  &:after {
    display: block;
    position: absolute;
    height: 5px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`
