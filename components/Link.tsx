import React from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import styled from "styled-components"

import { color as styledColor, display, position, space } from "styled-system"
import { color } from "../helpers/color"
import { GLOBAL_TRANSITION } from "lib/theme"

interface LinkProps extends NextLinkProps {}

export const Link: React.FC<LinkProps> = (props) => {
  return (
    <NextLink {...props}>
      <Anchor>{props.children}</Anchor>
    </NextLink>
  )
}

/**
 * Basic <a> tag styled with additional LinkProps
 * Spec: https://zpl.io/2Gm6D3d
 */
export const Anchor = styled.a`
  color: ${color("black100")};
  transition: color ${GLOBAL_TRANSITION};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${color("black100")};
  }
  ${display};
  ${position};
  ${space};
  ${styledColor};
`
