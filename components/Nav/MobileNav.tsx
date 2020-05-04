import NextLink from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { color } from "../../helpers/color"
import { Sans } from "../Typography"
import { Burger } from "./Burger"
import { NavProps } from "./Types"
import { SeasonsLogo } from "./SeasonsLogo"
import { BoxProps, Box } from "../Box"
import { useState } from "react"
import { useSpring, animated } from "react-spring"
import { Spacer } from ".."

const MENU_HEIGHT = "60px"

export const MobileNav: React.FC<NavProps> = ({ links, fixed }) => {
  const [isOpen, toggleOpen] = useState(false)

  return (
    <HeaderContainer fixed={fixed}>
      <Header>
        <SeasonsLogo />
        <Burger
          onClick={() => {
            toggleOpen(!isOpen)
          }}
        />
      </Header>
      <Menu items={links} open={isOpen} />
    </HeaderContainer>
  )
}

const Menu = ({ items, open }) => {
  const router = useRouter()
  const openAnimation = useSpring({
    transform: open ? `translateY(0)` : "translateY(-100%)",
    config: { tension: 500, friction: 33 },
  })

  return (
    <Wrapper>
      <AnimatedContainer style={openAnimation}>
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
      </AnimatedContainer>
    </Wrapper>
  )
}

const Wrapper = styled("div")`
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

const HeaderContainer = styled.div<{ fixed: boolean }>`
  position: ${(p) => (p.fixed ? "fixed" : "relative")};
  box-sizing: border-box;
  height: ${MENU_HEIGHT};
  z-index: 100;
  width: 100%;
  top: 0;
  background: ${color("white100")};
`

const MenuContainer = styled.div`
  overflow: hidden;
  padding-top: ${MENU_HEIGHT};
  width: 100%;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
  transform: translateY(-100%);
`

const Header = styled.div`
  height: 59px;
  z-index: 101;
  position: relative;
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
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
