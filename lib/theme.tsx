import React from "react"
import { fontFamily } from "./typography"
import { ThemeProvider } from "styled-components"

export const themeProps = {
  colors: {
    white: "#fff",
    black: "#000",
    green: "#04b853",
    gray: "#7F7F7F",
    darkGray: "#1c1c1c",
    mediumGray: "#2c2c2c",
    lightGray: "#DFDFDF",
    blue: "#2C52E5",
  },
  fontFamily,
  space: {
    // unit: px value
    /** Equivalent to 3px  */
    0.3: 3,
    /** Equivalent to 5px  */
    0.5: 5,
    /** Equivalent to 10px  */
    1: 10,
    /** Equivalent to 20px  */
    2: 20,
    /** Equivalent to 30px  */
    3: 30,
    /** Equivalent to 40px  */
    4: 40,
    /** Equivalent to 60px  */
    6: 60,
    /** Equivalent to 90px  */
    9: 90,
    /** Equivalent to 120px  */
    12: 120,
    /** Equivalent to 180px  */
    18: 180,
  },

  typeSizes: {
    /** Equivalent to 14px size / 20px line-height  */
    "0": {
      fontSize: 14,
      lineHeight: 24,
    },
    /** Equivalent to 16px size / 24px line-height  */
    "1": {
      fontSize: 16,
      lineHeight: 28,
    },
    /** Equivalent to 18px size / 20px line-height  */
    "2": {
      fontSize: 18,
      lineHeight: 20,
    },
    /** Equivalent to 24px size / 32px line-height  */
    "3": {
      fontSize: 24,
      lineHeight: 32,
    },
    /** Equivalent to 40px size / 40px line-height  */
    "4": {
      fontSize: 40,
      lineHeight: 40,
    },
  },

  radii: {
    mainButton: 40,
  },
}

//@ts-ignoreg
export const Theme = props => {
  return <ThemeProvider theme={themeProps}>{props.children}</ThemeProvider>
}

/** All available px spacing maps */
export type SpacingUnit = keyof typeof themeProps["space"]
/** All available color keys */
export type Color = keyof typeof themeProps["colors"]
/** All available width breakpoint */
// export type Breakpoint = keyof typeof breakpoints

/** All available type sizes */
export type TypeSizes = keyof typeof themeProps.typeSizes
/** A single type size **/
export interface TypeSize {
  fontSize: number
  lineHeight: number
}
/** All available sizes for our sans font */
export type SansSize = TypeSizes
