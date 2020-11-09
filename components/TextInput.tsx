import React from "react"

import { TextField } from "@material-ui/core"

export const TextInput = ({ autoCapitalize, currentValue, headerText, onChangeText, placeholder, value }) => {
  return (
    <TextField
      value={currentValue}
      label={headerText}
      placeholder={placeholder}
      onChange={(e) => {
        onChangeText?.(e, e.target.value)
      }}
    />
  )
}
