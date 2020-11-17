import { createMuiTheme } from "@material-ui/core"
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme"

import palette from "./palette"
import typography from "./typography"

const baseTheme = {
  palette,
  typography,
  overrides: {
    MuiInputBase: {
      root: {
        fontWeight: "normal",
      },
    },
  },
} as ThemeOptions

export const theme = createMuiTheme(baseTheme)
