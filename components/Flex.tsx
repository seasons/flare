import React, { ClassAttributes, HTMLAttributes } from "react"
import styled from "styled-components"
import {
  alignContent, AlignContentProps, alignItems, AlignItemsProps, background, BackgroundProps, bottom,
  BottomProps, display, DisplayProps, flex, flexBasis, FlexBasisProps, flexDirection,
  FlexDirectionProps, FlexProps as IFlexProps, flexWrap, FlexWrapProps, height, HeightProps,
  justifyContent, JustifyContentProps, maxHeight, MaxHeightProps, maxWidth, MaxWidthProps, order,
  OrderProps, position, PositionProps, space, SpaceProps, style, width, WidthProps, zIndex,
  ZIndexProps
} from "styled-system"

const flexGrow = style({
  prop: "flexGrow",
})

export interface FlexProps
  extends AlignItemsProps,
    AlignContentProps,
    BackgroundProps,
    BottomProps,
    DisplayProps,
    IFlexProps,
    FlexBasisProps,
    FlexDirectionProps,
    FlexWrapProps,
    HeightProps,
    JustifyContentProps,
    MaxHeightProps,
    MaxWidthProps,
    OrderProps,
    PositionProps,
    SpaceProps,
    WidthProps,
    ZIndexProps {
  flexGrow?: number | string
  style?: any
}

/**
 * A utility component that encapsulates flexbox behavior
 */
export const Flex = styled.div<FlexProps>`
  display: flex;
  ${alignContent};
  ${alignItems};
  ${background};
  ${bottom};
  ${display};
  ${flex};
  ${flexBasis};
  ${flexDirection};
  ${flexGrow};
  ${flexWrap};
  ${height};
  ${justifyContent};
  ${maxHeight};
  ${maxWidth};
  ${order};
  ${position};
  ${space};
  ${width};
  ${zIndex};
`

Flex.displayName = "Flex"
