import React from "react"
import styled from "styled-components"

import { Box, Sans } from "../"
import { color } from "../../helpers"

export const NavItem = ({ link }) => {
  return (
    <>
      <Wrapper ml={3} height="100%" style={{ cursor: "pointer", position: "relative" }}>
        <Sans size="3" color="black" style={{ lineHeight: "inherit" }}>
          {link.text}
        </Sans>
        <Underline />
      </Wrapper>
    </>
  )
}

const Wrapper = styled(Box)`
  position: relative;
  &:hover {
    div {
      display: block;
    }
  }
`

const Underline = styled.div`
  height: 2px;
  display: none;
  position: absolute;
  left: 0;
  bottom: 14px;
  width: 100%;
  background-color: ${color("black100")};
`
