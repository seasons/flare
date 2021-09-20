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
import { Box, Button, MaxWidth, Media, Spacer } from "components"
import { Flex } from "../Flex"
import { NavItem } from "./NavItem"
import { NavProps } from "./Types"
import { GetTheAppButton } from "components/Button/GetTheApp"
import { SeasonsLogoTextIcon } from "components/Icons/SeasonsLogoTextIcon"

export const DESKTOP_NAV_HEIGHT = 72

export const DesktopNav = (props: NavProps) => {
  const { links, navStyles } = props
  const backgroundColor = navStyles?.backgroundColor ? navStyles?.backgroundColor : color("white100")
  const textColor = navStyles?.textColor ? navStyles?.textColor : color("black100")

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

  const renderLink = (link) => {
    if (link.external) {
      return (
        <Link
          key={link.url}
          href={link.url}
          active={!!router.pathname.match(link.match)}
          onClick={() => trackClick(link.url)}
        >
          <NavItem link={link} color={textColor} />
        </Link>
      )
    } else if (link.url) {
      return (
        <NextLink href={link.url} key={link.text}>
          <Link
            key={link.url}
            href={link.url}
            active={!!router.pathname.match(link.match)}
            onClick={() => trackClick(link.url)}
          >
            <NavItem link={link} color={textColor} />
          </Link>
        </NextLink>
      )
    } else {
      return link.renderNavItem()
    }
  }

  const renderLoggedOutNavLinks = () => (
    <>
      <HiddenSignInLink hide={navStyles?.hideSignIn}>
        <Link
          onClick={() => {
            toggleLoginModal(true)
          }}
        >
          <NavItem link={{ text: "Sign in" }} color={textColor} />
        </Link>
      </HiddenSignInLink>
      <Spacer ml={3} />
      <GetTheAppButton
        size="medium-x"
        variant={navStyles?.getTheAppVariant ? navStyles.getTheAppVariant : "primaryWhite"}
      />
      <HiddenApplyNowWrapper hide={navStyles?.hideSignIn}>
        <Button size="medium-x" onClick={() => router.push("/signup")}>
          Apply now
        </Button>
      </HiddenApplyNowWrapper>
    </>
  )

  const renderLoggedInNavLinks = () => (
    <>
      <Link
        onClick={() => {
          openDrawer("bag")
        }}
      >
        <NavItem link={{ text: "Bag" }} color={textColor} />
      </Link>
      <Link
        onClick={() => {
          openDrawer("profile")
        }}
      >
        <NavItem link={{ text: "Account" }} color={textColor} />
      </Link>
    </>
  )

  return (
    <HeaderContainer style={specialStyles} backgroundColor={backgroundColor}>
      <MaxWidth>
        <Box width="100%">
          <Flex ml="auto" flexDirection="row" alignItems="center" width="100%" px={[2, 2, 2, 2, 2]}>
            <Box style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
              <SeasonsLogoTextIcon />
            </Box>
            <Media greaterThanOrEqual="lg">
              <Box px={4}>
                <SearchBar breakPoint="large" />
              </Box>
            </Media>
            <Media lessThan="lg">
              <Box px={4}>
                <SearchBar breakPoint="medium" />
              </Box>
            </Media>
            <Flex ml="auto" flexDirection="row" alignItems="center">
              {links.map(renderLink)}
              {isLoggedIn ? renderLoggedInNavLinks() : renderLoggedOutNavLinks()}
            </Flex>
          </Flex>
        </Box>
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

const HiddenApplyNowWrapper = styled(Box)<{ hide: boolean }>`
  opacity: ${(p) => (p.hide ? 0 : 1)};
  width: ${(p) => (p.hide ? "0px" : "108px")};
  transition: width 250ms ease, opacity 250ms ease;
  overflow: hidden;
  height: 40px;
  padding-left: 8px;
`

const HiddenSignInLink = styled(Box)<{ hide: boolean }>`
  opacity: ${(p) => (p.hide ? 0 : 1)};
  width: ${(p) => (p.hide ? "0px" : "67px")};
  transition: width 250ms ease, opacity 250ms ease;
  overflow: hidden;
  height: 58px;
`

const HeaderContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${(p) => p.backgroundColor};
  transition: background-color 1000ms ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  padding-top: 8px;
  flex-direction: row;
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  height: ${DESKTOP_NAV_HEIGHT}px;
  align-items: flex-start;
`

const Link = styled.a<{ active?: boolean }>`
  color: black;
  text-decoration: none;
  height: 58px;
  line-height: 58px;

  &:after {
    display: block;
    position: absolute;
    height: 5px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`
