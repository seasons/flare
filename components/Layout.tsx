import { Theme } from "../lib/theme"
import styled from "styled-components"
import { color } from "../lib/color"
import { fontFamily } from "../lib/typography"

export const Layout = props => {
  return (
    <Theme>
      <HeaderContainer>
        <Logo />
        <LogoText>Seasons</LogoText>
      </HeaderContainer>
      {props.children}
    </Theme>
  )
}

const Logo = styled.div`
  background: url("/img/LogoMark.svg") no-repeat center;
  background-size: contain;
  width: 22px;
  height: 22px;
  margin-right: 10px;
`

export const LogoText = styled.div`
  font-family: ${fontFamily.display.regular};
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 24px;
  text-transform: uppercase;
`

const HeaderContainer = styled.div`
  border-bottom: 1.5px solid ${color("lightGray")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0px;
  height: 58.5px;
  box-sizing: border-box;
  z-index: 100;
`
