import React, { CSSProperties } from "react"
import styled from "styled-components"
// import { Text } from "react-native"
import {
  color,
  ColorProps,
  display,
  DisplayProps as StyledSystemDisplayProps,
  fontSize,
  FontSizeProps,
  lineHeight,
  LineHeightProps,
  maxWidth,
  MaxWidthProps,
  space,
  SpaceProps,
  style,
  textAlign,
  TextAlignProps,
} from "styled-system"

import { color as colorHelper } from "./color"
import { SansSize, themeProps, Color, TypeSizes, TypeSize } from "./theme"

/**
 * Type definition for font objects
 */
export interface FontDefinition {
  fontFamily: string
  fontWeight?: string | number
  fontStyle?: string
}

/**
 * Type definition for font value properties which can either
 * be an object for complex definitions or a string for single entries.
 */
export type FontValue = string | FontDefinition

/**
 * Defines the shape of the font family
 */
export interface FontFamilyProps {
  sans: {
    thin: FontValue
    medium: FontValue
    bold: FontValue
  }
  display: {
    regular: FontValue
  }
}

/**
 * A map of the font families and their settings
 */
export const fontFamily: FontFamilyProps = {
  sans: {
    thin: "'ProximaNova-Thin', sans-serif",
    medium: "'ProximaNova-Medium', sans-serif",
    bold: "'ProximaNova-Bold', sans-serif",
  },
  display: {
    regular: "'Apercu-Mono', sans-serif",
  },
}

export interface VerticalAlignProps {
  verticalAlign?:
    | "baseline"
    | "sub"
    | "super"
    | "text-top"
    | "text-bottom"
    | "middle"
    | "top"
    | "bottom"
    | "inherit"
    | "initial"
    | "unset"
}
const verticalAlign = style({
  prop: "verticalAlign",
})

/** renderFontValue */
export const renderFontValue = (fontValue: FontValue) => {
  if (typeof fontValue === "string") {
    return `font-family: ${fontValue}`
  } else {
    return [`font-family: ${fontValue.fontFamily}`]
      .concat(fontValue.fontStyle ? `font-style: ${fontValue.fontStyle}` : [])
      .concat(fontValue.fontWeight ? `font-weight: ${fontValue.fontWeight}` : [])
      .join(";\n")
  }
}

export interface TextProps
  extends ColorProps,
    FontSizeProps,
    LineHeightProps,
    MaxWidthProps,
    SpaceProps,
    StyledSystemDisplayProps,
    TextAlignProps,
    VerticalAlignProps {
  fontFamily?: string
  style?: CSSProperties
  numberOfLines?: number
}

/** Base Text component for typography */
export const StyledText = styled.div<TextProps>`
  ${({ fontFamily }) => fontFamily && renderFontValue(fontFamily)};
  ${fontSize};
  ${color};
  ${display};
  ${maxWidth};
  ${space};
  ${lineHeight};
  ${verticalAlign};
  text-align: ${props => props.textAlign || "center"};
`

/**
 * Any valid font family
 */
export type FontFamily = typeof themeProps["fontFamily"]

/**
 * Determines which font sizes/line heights to use for typography.
 */
export function determineFontSizes(size: TypeSizes) {
  if (!Array.isArray(size)) {
    const match: TypeSize = themeProps.typeSizes[size]
    return {
      style: {
        fontSize: match.fontSize,
        lineHeight: match.lineHeight,
      },
    }
  }

  return (
    size
      //@ts-ignore
      .map(s => themeProps.typeSizes[s])
      .reduce(
        (accumulator, current) => {
          return {
            style: {
              fontSize: [...accumulator.style.fontSize, current.fontSize],
              lineHeight: [...accumulator.style.lineHeight, current.lineHeight],
            },
          }
        },
        { style: { fontSize: [], lineHeight: [] } }
      )
  )
}

/**
 * Sans
 */

export interface SansProps extends Partial<TextProps> {
  italic?: boolean
  role?: string
  size: SansSize
  color?: Color
  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "thin" | "medium"
}

/**
 * The Sans typeface is the main Seasons typeface
 */

export const Sans: React.SFC<SansProps> = props => {
  const { size, weight, numberOfLines } = props
  const color = props.color ? colorHelper(props.color) : colorHelper("black")
  return (
    <StyledText
      {...props}
      fontFamily={fontFamily.sans[weight || "medium"]}
      {...determineFontSizes(size)}
      color={color}
      numberOfLines={numberOfLines}
    />
  )
}

Sans.displayName = "Sans"
