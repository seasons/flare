import { TypeSizes, themeProps } from "../lib/theme"

export const sans = (sansSizeKey: keyof TypeSizes["sans"]) => themeProps.typeSizes.sans[sansSizeKey]
