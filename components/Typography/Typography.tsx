import React, { CSSProperties } from "react"
import styled, { StyledComponent } from "styled-components"
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
  TextAlignProps,
} from "styled-system"

import { DisplaySize, GLOBAL_TRANSITION, SansSize, themeProps, TypeSizes } from "../../lib/theme"
import { determineFontSizes } from "./determineFontSizes"

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
    regular: FontValue
    medium: FontValue
    bold: FontValue
  }
  serif: {
    medium: FontValue
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
    regular: "'ProximaNova-Medium', sans-serif",
    medium: "'ProximaNova-Medium', sans-serif",
    bold: "'ProximaNova-Bold', sans-serif",
  },
  serif: {
    medium: "",
  },
  display: {
    regular: "'NBAkademieProRegular', sans-serif",
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
  /**
   * React Native specific. When `numberOfLines` is set, this prop defines how
   * text will be truncated. `numberOfLines` must be set in conjunction with
   * this prop.
   */
  ellipsizeMode?: string
  element?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

/** Base Text component for typography */
export const Text = styled.p<TextProps>`
  ${({ fontFamily }) => fontFamily && renderFontValue(fontFamily)};
  text-align: ${(props) => props.textAlign || "left"};
  ${fontSize};
  ${color};
  ${display};
  ${maxWidth};
  ${space};
  ${lineHeight};
  ${verticalAlign};
  padding: 0;
  margin: 0;
`

/**
 * The supported typefaces
 */
export type FontTypes = keyof TypeSizes

/**
 * Any valid font family
 */
export type FontFamily = typeof themeProps["fontFamily"]

/**
 * Any valid font weight
 */
export type FontWeights = keyof FontFamily["sans"] | keyof FontFamily["display"]

/**
 * Returns the weight, if given, otherwise it defaults to `regular` unless
 * explicitly given `null` in which case it returns undefined, meaning the
 * weight should be inherited from the component’s parent.
 *
 * @param weight
 */
function _fontWeight(weight?: null | FontWeights) {
  if (weight === null) {
    return undefined
  }
  return weight || "regular"
}

function _selectFontFamilyType(weight?: null | FontWeights, italic?: boolean) {
  return italic ? "italic" : weight
}

interface StyledTextProps extends Partial<TextProps> {
  size: string | string[]
  weight?: null | FontWeights
  italic?: boolean
  underline?: boolean
  pointer?: boolean
}

export interface DisplayProps extends Partial<TextProps> {
  size: DisplaySize

  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "regular"
}

/**
 * Creates a wrapper around the generic `Text` component for a font type defined
 * in the palette’s theme (sans, serif, or display).
 *
 * The component’s props are specified with type parameter `P` and should hold
 * both the component’s specific props (size, weight, italic) as well as all of
 * the generic `Text` component’s props, although as optional.
 *
 * @param fontType
 *        The font type that this text component represents.
 * @param selectFontFamilyType
 *        An optional function that maps weight+italic to a font-family.
 */
function createStyledText<P extends StyledTextProps>(
  fontType: keyof FontFamily,
  selectFontFamilyType: typeof _selectFontFamilyType = _selectFontFamilyType
): StyledComponent<any, any, any, any> {
  // @ts-ignore
  return styled<P>(({ size, weight, italic, underline, element, pointer, ...textProps }: StyledTextProps) => {
    const fontFamilyType = selectFontFamilyType(_fontWeight(weight), italic)
    // This is mostly to narrow the type of `fontFamilyType` to remove `null`.
    if (fontFamilyType === null) {
      throw new Error("Did not expect `fontType` to be `null`.")
    }
    const styles = {
      transition: `color ${GLOBAL_TRANSITION}`,
      ...(underline ? { textDecoration: "underline" } : {}),
      ...(pointer ? { cursor: "pointer" } : {}),
      ...(fontType === "display" ? { letterSpacing: "-1px" } : {}),
      ...textProps.style,
    }

    return (
      <Text
        fontFamily={fontFamilyType && fontFamily[fontType][fontFamilyType]}
        {...determineFontSizes(fontType, size)}
        // styled-components supports calling the prop `as`, but there are
        //  issues when passing it into this component named `as`. See
        //  https://github.com/styled-components/styled-components/issues/2448
        //  for context.
        // So we are naming it `element` on the way into this component, and
        //  renaming it to `as` when we pass it to through.
        {...(element ? { as: element } : {})}
        {...textProps}
        style={styles}
      />
    )
  })``
}

/**
 * Sans
 */

export interface SansProps extends Partial<TextProps> {
  italic?: boolean

  role?: string

  size: SansSize

  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "regular" | "medium"
}

/**
 * @example
 *
 * <Sans color="black10" size="3t" weight="medium" italic>Hi</Sans>
 */
export const Sans = createStyledText<SansProps>("sans", (weight, italic) => {
  return _selectFontFamilyType(weight, italic)
})

/**
 * This is our Apercu font used mainly for headers
 *
 * @example
 *
 * <Display color="black10" size="3t">Hi</Display>
 */
export const Display = createStyledText<DisplayProps>("display")

/**
 * @example
 *
 * <Display color="black10" size="3t">Hi</Display>
 */
Sans.displayName = "Sans"
Display.displayName = "Display"
