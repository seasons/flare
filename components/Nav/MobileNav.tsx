import NextLink from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Box } from ".."
import { color } from "../../helpers/color"
import { Sans } from "../Typography"
import { Burger } from "./Burger"
import { NavProps } from "./Types"
import { SeasonsLogo } from "./SeasonsLogo"
import { BoxProps } from "../Box"
import { useState } from "react"

export const MobileNav: React.FC<NavProps> = ({ links, fixed }) => {
  const [isOpen, toggleOpen] = useState(false)

  return (
    <HeaderContainer fixed={fixed}>
      <Header>
        <Burger
          onClick={() => {
            toggleOpen(!isOpen)
          }}
        />
        <LogoContainer>
          <SeasonsLogo />
        </LogoContainer>
      </Header>
      <Menu items={links} open={isOpen} />
    </HeaderContainer>
  )
}

const Menu = ({ items, open }) => {
  const router = useRouter()
  return (
    <MenuContainer height={open ? "auto" : "0px"}>
      {items.map((link) => {
        if (link.external) {
          return (
            <StyledAnchor href={link.url} key={link.text}>
              <MenuItem
                key={link.text}
                width="100%"
                style={{ cursor: "pointer" }}
                active={!!router.pathname.match(link.match)}
              >
                <Sans size="3" p={2} color="black">
                  {link.text}
                </Sans>
              </MenuItem>
            </StyledAnchor>
          )
        } else {
          return (
            <NextLink href={link.url} key={link.text}>
              <MenuItem
                key={link.text}
                width="100%"
                style={{ cursor: "pointer" }}
                active={!!router.pathname.match(link.match)}
              >
                <Sans size="3" p={2} color="black">
                  {link.text}
                </Sans>
              </MenuItem>
            </NextLink>
          )
        }
      })}
    </MenuContainer>
  )
}

const StyledAnchor = styled("a")`
  text-decoration: none;
  color: inherit;
  &:hover,
  &:focus {
    background-color: transparent !important;
  }
`

const HeaderContainer = styled.div<{ fixed: boolean }>`
  position: ${(p) => (p.fixed ? "fixed" : "relative")};
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  top: 0;
  background: ${color("white100")};
`

const LogoContainer = styled.div`
  margin: 0 auto;
`

const MenuContainer = styled.div<{ height?: string }>`
  overflow: hidden;
  width: 100%;
  transition: all 0.3s linear;
  height: ${(p) => p.height};
`

const Header = styled.div`
  height: 58.5px;
  border-bottom: 1px solid ${color("black10")};
  display: flex;
  flex-direction: row;
  align-items: center;
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
