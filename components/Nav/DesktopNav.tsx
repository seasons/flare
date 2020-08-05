import NextLink from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { color } from "../../helpers/color"
import { Flex } from "../Flex"
import { Grid } from "../Grid"
import { NavProps } from "./Types"
import { SeasonsLogo } from "./SeasonsLogo"
import { NavItem } from "./NavItem"
import { useTracking, Schema } from "../../utils/analytics"
import { MaxWidth } from ".."

export const DesktopNav = ({ fixed = false, links }: NavProps) => {
  const router = useRouter()
  const tracking = useTracking()

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
        <Flex ml="auto" flexDirection="row" alignItems="center" width="100%" px={2}>
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
          </Flex>
        </Flex>
      </MaxWidth>
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
