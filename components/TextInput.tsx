import React from "react"

import { TextField } from "@material-ui/core"

interface TextInputProps {
  autoCapitalize?: string
  currentValue?: string
  headerText?: string
  onChangeText?: (event: any, value: string) => void
  onPress?: (event: any) => void
  placeholder?: string
  value?: string
  style?: any
}

export const TextInput: React.FC<TextInputProps> = ({
  autoCapitalize,
  currentValue,
  headerText,
  onChangeText,
  placeholder,
  value,
  style,
}) => {
  return (
    <TextField
      value={currentValue || value}
      label={headerText}
      placeholder={placeholder}
      onChange={(e) => {
        onChangeText?.(e, e.target.value)
      }}
      style={style}
    />
  )
}
