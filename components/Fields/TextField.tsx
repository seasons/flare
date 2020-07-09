import React from "react"
import { TextField as MuiTextField, TextFieldProps } from "formik-material-ui"
import { styled as muiStyled } from "@material-ui/core"

export const StyledTextField = muiStyled(MuiTextField)({
  width: "100%",
  height: "36px",
  fontFamily: "ProximaNova-Medium, sans-serif",
})

export const TextField = (props: TextFieldProps) => {
  const { field, form } = props
  const fieldName = field.name || ""
  const values = form.values || {}
  let value = values?.[fieldName] || ""

  return <StyledTextField {...props} InputLabelProps={{ shrink: value?.length > 0 }} />
}
