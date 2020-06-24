import React from "react"
import styled, { css } from "styled-components"
import { TextField as MuiTextField, TextFieldProps } from "formik-material-ui"
import { color } from "../../helpers"

export const sharedInputStyled = css`
  width: 100%;

  .MuiInputBase-input {
    color: black;
    opacity: 0.8;
    font-family: ProximaNova-Medium, sans-serif;
    padding: 6px 0px 16px;
  }

  .muiinputlabel-root.mui-focused {
    color: black;
  }

  .MuiInputBase-root {
    margin-bottom: 8px;
  }

  .MuiFormLabel-root {
    font-family: ProximaNova-Medium, sans-serif;
    color: ${color("black50")};
    margin-bottom: -20px;
  }

  .MuiInputBase-input {
  }

  .MuiFormHelperText-root.Mui-error {
    font-size: 0.7rem;
  }

  .MuiFormHelperText-root {
    margin-top: 0px;
    margin-bottom: 4px;
  }

  .MuiInputBase-input:focus {
    padding-top: 4px;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    opacity: 0.3;
    border-bottom: 2px solid ${color("black50")};
  }

  .MuiInput-underline:hover:not(.Mui-disabled):before {
    opacity: 0.3;
    border-bottom: 2px solid ${color("black50")};
  }

  .MuiInputBase-input.Mui-focused {
    background: white;
    color: black;
    opacity: 0.84;
    margin-bottom: 8px;
  }

  .MuiFormLabel-root.Mui-focused {
    color: ${color("black50")};
    background: white !important;
  }

  .MuiFormLabel-root.Mui-disabled {
    color: ${color("black50")};
  }

  .MuiInputBase-root.Mui-disabled {
    color: white;
  }

  .MuiInput-underline.Mui-disabled:before {
    border-bottom-style: solid;
  }

  /* Override chrome/safari autofill stylings */
  input:-webkit-autofill,
  input:-webkit-autofill: hover,
  input:-webkit-autofill: focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill: hover,
  textarea:-webkit-autofill: focus,
  select:-webkit-autofill,
  select:-webkit-autofill: hover,
  select:-webkit-autofill: focus {
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
  }
`

export const StyledTextField = styled(MuiTextField)`
  ${sharedInputStyled}
`

export const TextField = (props: TextFieldProps) => {
  const { field, form } = props
  const fieldName = field.name || ""
  const values = form.values || {}
  const value = values?.[fieldName] || "test"

  return <StyledTextField {...props} InputLabelProps={{ shrink: value?.length > 0 }} />
}
