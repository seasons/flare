import React from "react"
import styled from "styled-components"
import { GLOBAL_TRANSITION } from "../../lib/theme"
import { color } from "helpers"

import { Box, Sans } from "components"

type Props = {
  link: { text: string }
  active?: boolean
  color?: string
  badgeCount?: number
}

export const NavItem: React.FC<Props> = ({ link, active, color, badgeCount }) => {
  console.log("badgeCount", badgeCount)
  return (
    <>
      <Wrapper
        ml={3}
        height="100%"
        style={{ cursor: "pointer", position: "relative", display: "flex" }}
        active={active}
      >
        <Sans size="3" color={color} style={{ lineHeight: "inherit" }}>
          {link.text}
        </Sans>
        {!!badgeCount && badgeCount > 0 && (
          <Box style={{ paddingTop: "15px", paddingLeft: "2px" }}>
            <BadgeCount badgeCount={badgeCount}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Sans size="1" color="white100">
                  {badgeCount}
                </Sans>
              </Box>
            </BadgeCount>
          </Box>
        )}
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
  transition: color ${GLOBAL_TRANSITION};
  background-color: ${(p) => p.color};
`
const BadgeCount = styled(Box)<{ badgeCount: number }>`
  background-color: ${color("black100")};
  border-radius: 100%;
  height: 13px;
  width: 13px;
`
