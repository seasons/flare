import React from "react"
import { fontFamily } from "../components/Typography/Typography"
import { ThemeProvider } from "styled-components"

export const breakpoints = {
  /** Above 1192 */
  xl: 1200,
  /** Between 1024 and  1191 */
  lg: 992,
  /** Between 900 and 1023 */
  md: 768,
  /** Between 768 and  899 */
  sm: 576,
  /** Below 767 */
  xs: 575,
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
    /** Equivalent to 4px  */
    0.5: 4,
    /** Equivalent to 8px  */
    1: 8,
    /** Equivalent to 16px  */
    2: 16,
    /** Equivalent to 24px  */
    3: 24,
    /** Equivalent to 32px  */
    4: 32,
    /** Equivalent to 40px  */
    5: 40,
    /** Equivalent to 48px  */
    6: 48,
    /** Equivalent to 56px  */
    7: 56,
    /** Equivalent to 64px  */
    8: 64,
    /** Equivalent to 72px  */
    9: 72,
    10: 80,
    /** Equivalent to 72px  */
    12: 112,
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
        fontSize: 20,
        lineHeight: 30,
      },
      /** Equivalent to 28px size / 36px line-height  */
      "8": {
        fontSize: 24,
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
      maxWidth: {
        xl: 1200,
        lg: 960,
        md: 720,
        sm: 540,
        xs: 540,
      },
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

export const Theme = (props) => {
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
