import { useDrawerContext } from "components/Drawer/DrawerContext"
import { LoginModal } from "components/Login/LoginModal"
import { SearchBar } from "components/Search/SearchBar"
import { color } from "helpers/color"
import { useAuthContext } from "lib/auth/AuthContext"
import NextLink from "next/link"
import { useRouter } from "next/router"
import queryString from "query-string"
import React, { useEffect } from "react"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"

import { Box, MaxWidth } from "../"
import { Flex } from "../Flex"
import { NavItem } from "./NavItem"
import { SeasonsLogo } from "./SeasonsLogo"
import { NavProps } from "./Types"

export const DesktopNav = (props: NavProps) => {
  const { links } = props
  const router = useRouter()

  const tracking = useTracking()
  const { authState, toggleLoginModal, loginModalOpen } = useAuthContext()
  const { openDrawer } = useDrawerContext()

  const isLoggedIn = !!authState.isSignedIn

  const trackClick = (url) => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.NavigationButtonClicked,
      actionType: Schema.ActionTypes.Tap,
      url,
    })
  }

  useEffect(() => {
    if (!authState.authInitializing) {
      const query = queryString.parse(router.asPath.split(/\?/)[1])
      if (query.login === "true" && !isLoggedIn) {
        toggleLoginModal(true)
      } else if (!!query.drawer) {
        openDrawer(query.drawer as string)
      }
    }
  }, [authState.authInitializing, authState.isSignedIn])

  let specialStyles = {}
  if (router.pathname === "/signup") {
    specialStyles = { borderBottom: `1px solid ${color("black15")}` }
  }

  return (
    <HeaderContainer style={specialStyles}>
      <MaxWidth>
        <Flex ml="auto" flexDirection="row" alignItems="center" width="100%" px={[2, 2, 2, 5, 5]}>
          <SeasonsLogo />
          <Box px={4}>
            <SearchBar />
          </Box>
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
              } else if (link.url) {
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
              } else {
                return link.renderNavItem()
              }
            })}
            <Link
              onClick={() => {
                openDrawer("bag")
              }}
            >
              <NavItem link={{ text: "Bag" }} />
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  onClick={() => {
                    openDrawer("profile")
                  }}
                >
                  <NavItem link={{ text: "Account" }} />
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" active={!!router.pathname.match("/signup")}>
                  <NavItem link={{ text: "Sign Up" }} />
                </Link>
                <Link
                  onClick={() => {
                    toggleLoginModal(true)
                  }}
                >
                  <NavItem link={{ text: "Log In" }} />
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </MaxWidth>
      <LoginModal
        open={loginModalOpen}
        onClose={() => {
          toggleLoginModal(false)
        }}
      />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  background-color: ${color("white100")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
