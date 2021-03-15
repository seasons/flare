import React from "react"
import styled from "styled-components"

import { Box, Sans } from "components"
import { color } from "../../helpers"

type Props = {
  link: { text: string }
  active?: boolean
}

export const NavItem: React.FC<Props> = ({ link, active }) => {
  return (
    <>
      <Wrapper ml={3} height="100%" style={{ cursor: "pointer", position: "relative" }} active={active}>
        <Sans size="3" color="black" style={{ lineHeight: "inherit" }}>
          {link.text}
        </Sans>
        <Underline />
      </Wrapper>
    </>
  )
}

const Wrapper = styled<any>(Box)`
  position: relative;
  &:hover {
    div {
      display: block;
    }
  }
  ${({ active }: Props) =>
    active &&
    `
    div {
      display: block;
    }
  `}
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
