import styled from "styled-components"
import {
  background, BackgroundProps, bottom, BottomProps, color as styledColor, ColorProps, display,
  DisplayProps, flex, FlexProps, height, HeightProps, left, LeftProps, maxHeight, MaxHeightProps,
  maxWidth, MaxWidthProps, minHeight, MinHeightProps, minWidth, MinWidthProps, position,
  PositionProps, right, RightProps, space as styledSpace, SpaceProps, textAlign, TextAlignProps,
  top, TopProps, width, WidthProps, zIndex, ZIndexProps
} from "styled-system"

export interface BoxProps
  extends BackgroundProps,
    BottomProps,
    ColorProps,
    FlexProps,
    DisplayProps,
    HeightProps,
    LeftProps,
    MaxWidthProps,
    MinWidthProps,
    MaxHeightProps,
    MinHeightProps,
    PositionProps,
    RightProps,
    SpaceProps,
    TextAlignProps,
    TopProps,
    WidthProps,
    ZIndexProps {
  style?: any
  borderRadius?: number
}

/**
 * Box is just a `View` or `div` (depending on the platform) with common styled-systems
 * hooks.
 */
export const Box = styled.div<BoxProps>`
  ${background};
  ${bottom};
  ${display};
  ${flex};
  ${height};
  ${left};
  ${minWidth};
  ${maxWidth};
  ${minHeight};
  ${maxHeight};
  ${position};
  ${right};
  ${styledColor};
  ${styledSpace};
  ${textAlign};
  ${top};
  ${width};
  ${zIndex};
`

Box.displayName = "Box"
