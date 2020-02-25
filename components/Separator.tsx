import React from "react"
import styled from "styled-components"

import { space, SpaceProps, width, WidthProps } from "styled-system"
import { color } from "../helpers/color"

export interface SeparatorProps extends SpaceProps, WidthProps {
  color?: string
}

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = styled.div<SeparatorProps>`
  border: 1px solid ${props => props.color || color("black15")};
  border-bottom-width: 0;
  ${space};
  ${width};
`

Separator.defaultProps = {
  width: "100%",
}
