import React from "react"
import styled, { css } from "styled-components"
import { TextField as MuiTextField, TextFieldProps } from "formik-material-ui"
import { color } from "../../helpers"

export const sharedInputStyled = css`
  width: 100%;
  height: 36px;

  .MuiInputBase-input {
    color: black;
    opacity: 0.8;
    font-family: ProximaNova-Medium, sans-serif;
  }

  .muiinputlabel-root.mui-focused {
    color: black;
  }

  label {
    font-family: ProximaNova-Medium, sans-serif;
    font-size: 16px;
  }

  .MuiFormLabel-root {
    font-family: ProximaNova-Medium, sans-serif;
    color: ${color("black50")};
  }

  .MuiInputBase-input {
  }

  .MuiFormHelperText-root.Mui-error {
    font-size: 0.7rem;
  }

  .MuiFormHelperText-root {
    margin: 0px;
  }

  .MuiInput-formControl {
    margin: 0px;
  }

  .MuiInputLabel-formControl {
    transform: none;
    margin: 0 !important;
    top: 8px;
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
  }

  .MuiFormLabel-root.Mui-focused {
    color: ${color("black50")};
    margin: 0;
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
  const value = values?.[fieldName] || ""

  return <StyledTextField {...props} InputLabelProps={{ shrink: value.length > 0 }} />
}
