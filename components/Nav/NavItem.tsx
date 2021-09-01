import React from "react"
import styled from "styled-components"
import { Color } from "../../lib/theme"

import { Box, Sans } from "components"

type Props = {
  link: { text: string }
  active?: boolean
  color?: string
}

export const NavItem: React.FC<Props> = ({ link, active, color }) => {
  return (
    <>
      <Wrapper ml={3} height="100%" style={{ cursor: "pointer", position: "relative" }} active={active}>
        <Sans size="3" color={color} style={{ lineHeight: "inherit" }}>
          {link.text}
        </Sans>
        <Underline color={color} />
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

const Underline = styled.div<{ color: string }>`
  height: 2px;
  display: none;
  position: absolute;
  left: 0;
  bottom: 14px;
  width: 100%;
  transition: color 0.25s ease;
  background-color: ${(p) => p.color};
`
