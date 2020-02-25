import { Color, themeProps } from "../lib/theme"

/**
 * A helper to easily access colors when not in a styled-components or
 * styled-systems context.
 */
export const color = (colorKey: Color) => themeProps.colors[colorKey] || colorKey
