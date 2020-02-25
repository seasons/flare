import React from "react"
import { fontFamily } from "../components/Typography/Typography"
import { ThemeProvider } from "styled-components"

export const breakpoints = {
  /** Above 1192 */
  xl: 1192,
  /** Between 1024 and  1191 */
  lg: 1024,
  /** Between 900 and 1023 */
  md: 900,
  /** Between 768 and  899 */
  sm: 768,
  /** Below 767 */
  xs: 767,
}

export const themeProps = {
  colors: {
    black100: "#000",
    black85: "#252525",
    black65: "#5A5A5A",
    black50: "#7F7F7F",
    black15: "#D9D9D9",
    black10: "#E5E5E5",
    black04: "#F6F6F6",
    white100: "#fff",
    green: "#44524A",
    lightGreen: "#989F9B",
    blue: "#2B50DF",
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
    /** Unica  */
    sans: {
      /** Equivalent to 8px size / 8px line-height  */
      "0": {
        fontSize: 8,
        lineHeight: 8,
      },
      /** Equivalent to 10px size / 14px line-height  */
      "1": {
        fontSize: 10,
        lineHeight: 14,
      },
      /** Equivalent to 12px size / 16px line-height  */
      "2": {
        fontSize: 12,
        lineHeight: 16,
      },
      /** Equivalent to 14px size / 24px line-height  */
      "3": {
        fontSize: 14,
        lineHeight: 24,
      },
      /** Equivalent to 14px size / 20px line-height  */
      "3t": {
        fontSize: 14,
        lineHeight: 20,
      },
      /** Equivalent to 16px size / 26px line-height  */
      "4": {
        fontSize: 16,
        lineHeight: 26,
      },
      /** Equivalent to 16px size / 22px line-height  */
      "4t": {
        fontSize: 16,
        lineHeight: 22,
      },
      /** Equivalent to 18px size / 30px line-height  */
      "5": {
        fontSize: 18,
        lineHeight: 30,
      },
      /** Equivalent to 18px size / 26px line-height  */
      "5t": {
        fontSize: 18,
        lineHeight: 26,
      },
      /** Equivalent to 22px size / 30px line-height  */
      "6": {
        fontSize: 22,
        lineHeight: 30,
      },
      /** Equivalent to 28px size / 36px line-height  */
      "8": {
        fontSize: 28,
        lineHeight: 36,
      },
      /** Equivalent to 42px size / 50px line-height  */
      "10": {
        fontSize: 42,
        lineHeight: 50,
      },
      /** Equivalent to 60px size / 66px line-height  */
      "12": {
        fontSize: 60,
        lineHeight: 66,
      },
      /** Equivalent to 80px size / 84px line-height  */
      "14": {
        fontSize: 80,
        lineHeight: 84,
      },
      /** Equivalent to 100px size / 104px line-height  */
      "16": {
        fontSize: 100,
        lineHeight: 104,
      },
    },

    /** Garamond  */
    serif: {
      /** Equivalent to 12px size / 16px line-height  */
      "1": {
        fontSize: 12,
        lineHeight: 16,
      },
      /** Equivalent to 14px size / 18px line-height  */
      "2": {
        fontSize: 14,
        lineHeight: 18,
      },
      /** Equivalent to 16px size / 24px line-height  */
      "3": {
        fontSize: 16,
        lineHeight: 24,
      },
      /** Equivalent to 16px size / 20px line-height  */
      "3t": {
        fontSize: 16,
        lineHeight: 20,
      },
      /** Equivalent to 18px size / 26px line-height  */
      "4": {
        fontSize: 18,
        lineHeight: 26,
      },
      /** Equivalent to 18px size / 22px line-height  */
      "4t": {
        fontSize: 18,
        lineHeight: 22,
      },
      /** Equivalent to 22px size / 32px line-height  */
      "5": {
        fontSize: 22,
        lineHeight: 32,
      },
      /** Equivalent to 22px size / 28px line-height  */
      "5t": {
        fontSize: 22,
        lineHeight: 28,
      },
      /** Equivalent to 26px size / 32px line-height  */
      "6": {
        fontSize: 26,
        lineHeight: 32,
      },
      /** Equivalent to 32px size / 38px line-height  */
      "8": {
        fontSize: 32,
        lineHeight: 38,
      },
      /** Equivalent to 44px size / 50px line-height  */
      "10": {
        fontSize: 44,
        lineHeight: 50,
      },
      /** Equivalent to 60px size / 70px line-height  */
      "12": {
        fontSize: 60,
        lineHeight: 70,
      },
    },

    /** Avant Garde  */
    display: {
      /** Equivalent to 10px size / 12px line-height  */
      "2": {
        fontSize: 10,
        lineHeight: 12,
      },
      /** Equivalent to 12px size / 16px line-height  */
      "3t": {
        fontSize: 12,
        lineHeight: 16,
      },
      /** Equivalent to 14px size / 18px line-height  */
      "4t": {
        fontSize: 14,
        lineHeight: 18,
      },
      /** Equivalent to 16px size / 20px line-height  */
      "5t": {
        fontSize: 16,
        lineHeight: 20,
      },
      /** Equivalent to 18px size / 22px line-height  */
      "6": {
        fontSize: 18,
        lineHeight: 22,
      },
      /** Equivalent to 22px size / 24px line-height  */
      "8": {
        fontSize: 22,
        lineHeight: 24,
      },
    },
  },

  radii: {
    mainButton: 40,
  },

  mediaQueries: {
    xl: `(min-width: ${breakpoints.xl}px)`,
    lg: `(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
    md: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
    sm: `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
    xs: `(max-width: ${breakpoints.sm - 1}px)`,
    /** Determines if the input device has the notion of hover, e.g. mouse. */
    hover: `not all and (pointer: coarse), not all and (-moz-touch-enabled: 1)`,
  },

  // https://github.com/dragma/styled-bootstrap-grid#styled-bootstrap-grid
  grid: {
    /**
     * Breakpoints for the Artsy grid,
     * https://www.notion.so/artsy/Grid-e489a52e26bd4319b6ee7898044a8a53
     */
    breakpoints,
    container: {
      padding: 0,
    },
    row: {
      padding: 0,
    },
    col: {
      padding: 0,
    },
  },
}

/**
 * Creates a new Grid context for web. On React Native it serves as a noop.
 */
const GridThemeProvider = ({ children }) => {
  const StyledGrid = require("styled-bootstrap-grid")
  return <StyledGrid.GridThemeProvider gridTheme={themeProps.grid}>{children}</StyledGrid.GridThemeProvider>
}

export const Theme = props => {
  return (
    <ThemeProvider theme={themeProps}>
      <GridThemeProvider>{props.children}</GridThemeProvider>
    </ThemeProvider>
  )
}

/** All available px spacing maps */
export type SpacingUnit = keyof typeof themeProps["space"]
/** All available color keys */
export type Color = keyof typeof themeProps["colors"]
/** All available width breakpoint */
export type Breakpoint = keyof typeof breakpoints

/** All available type sizes */
export type TypeSizes = typeof themeProps.typeSizes
/** All available sizes for our serif font */
export type SerifSize = keyof TypeSizes["serif"] | Array<keyof TypeSizes["serif"]>
/** All available sizes for our serif font */
export type SansSize = keyof TypeSizes["sans"] | Array<keyof TypeSizes["sans"]>
/** All available sizes for our display font */
export type DisplaySize = keyof TypeSizes["display"] | Array<keyof TypeSizes["display"]>
