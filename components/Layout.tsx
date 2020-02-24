import { Theme } from "../lib/theme"
import styled, { css, CSSObject } from "styled-components"
import { color } from "../lib/color"
import { Sans } from "./Typography/Typography"
import { Grid } from "./Grid"
import { Box } from "."
import { Nav } from "./Nav"

export const Layout = props => {
  return (
    <Theme>
      <Nav />
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

const containerStyles = css`
  display: flex;
  flex-direction: row;
  padding: 16px 0px;
  height: 58.5px;
  box-sizing: border-box;
  z-index: 100;
`

const FooterContainer = styled(Grid)`
  border-top: 1px solid ${color("lightGray")};
  ${containerStyles};
`
