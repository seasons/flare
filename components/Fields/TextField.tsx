import React from "react"
import { TextField as MuiTextField, TextFieldProps } from "formik-material-ui"
import { DateTime } from "luxon"
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

  if (fieldName === "email") {
    value = value.toLowerCase()
  } else if (fieldName === "firstName" || fieldName === "lastName") {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  } else if (fieldName == "dob" && !!value?.length) {
    const date = new Date(value)
    value = !!date && DateTime.fromJSDate(date).toISO()
  }

  return <StyledTextField {...props} InputLabelProps={{ shrink: value?.length > 0 }} />
}
