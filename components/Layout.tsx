import { Theme } from "../lib/theme"
import styled, { css, CSSObject } from "styled-components"
import { color } from "../lib/color"
import { fontFamily, Sans } from "./Typography/Typography"
import { Grid } from "./Grid"
import { Box } from "."

export const Layout = props => {
  return (
    <Theme>
      <HeaderContainer>
        <Logo />
        <LogoText>Seasons</LogoText>
      </HeaderContainer>
      {props.children}
      <FooterContainer>
        <Sans size="2" color="gray" pt="0.5" pr="3">
          Terms of Service
        </Sans>
        <Sans size="2" color="gray" pt="0.5" pr="3">
          Privacy Policy
        </Sans>

        <Box ml="auto">
          <Sans size="2" color="gray" pt="0.5" pr="3">
            (c) 2020 Seasons. All Rights Reserved.
          </Sans>
        </Box>
      </FooterContainer>
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
  font-family: ${fontFamily.display.regular as CSSObject};
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 24px;
  text-transform: uppercase;
`

const containerStyles = css`
  display: flex;
  flex-direction: row;
  padding: 16px 0px;
  height: 58.5px;
  box-sizing: border-box;
  z-index: 100;
`

const HeaderContainer = styled(Grid)`
  border-bottom: 1px solid ${color("lightGray")};
  ${containerStyles};
`

const FooterContainer = styled(Grid)`
  border-top: 1px solid ${color("lightGray")};
  ${containerStyles};
`
