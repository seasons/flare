import { SelectField } from "components/Fields/SelectField"
import { TextField } from "components/Fields/TextField"
import { Field, useFormikContext } from "formik"
import React from "react"

import { makeStyles, MenuItem } from "@material-ui/core"

import SelectItem from "./SelectItem"

const useStyles = makeStyles({
  root: {
    backgroundColor: "white !important",
    "&.Mui-selected": {
      color: "#e8e8e8 !important",
    },
  },
})

export interface FieldDefinition {
  id?: string
  name?: string
  placeholder: string
  selectOptions?: SelectItem[]
  onClick?: () => void
  customElement?: JSX.Element
  type?: string
  initialValue?: string
  label: string
  mobileOrder?: number
  multiple?: boolean
}

export const FormField: React.FC<any> = (props) => {
  const { handleBlur, handleChange, setFieldValue, values } = useFormikContext()
  const menuItemStyle = useStyles()
  const { selectOptions, name, placeholder, customElement, type, multiple }: FieldDefinition = props
  const isSelectField = !!selectOptions && Array.isArray(selectOptions)

  return !!customElement ? (
    customElement
  ) : (
    <Field
      component={isSelectField ? SelectField : TextField}
      onChange={isSelectField ? (e) => setFieldValue(name, e.target.value) : handleChange}
      select={isSelectField}
      onBlur={handleBlur}
      name={name}
      value={values[name]}
      placeholder={placeholder}
      type={type || "text"}
      multiple={isSelectField && multiple}
    >
      {isSelectField && !!selectOptions
        ? selectOptions.map((input, index) => {
            return (
              <MenuItem
                className={menuItemStyle.root}
                key={index}
                value={multiple ? input.value || [] : input.value}
                style={{
                  fontSize: "16px",
                  fontFamily: "ProximaNova-Medium, sans-serif",
                  backgroundColor: props.selected ? "#e8e8e8" : "#f6f6f6",
                  color: "black",
                  borderBottom: "1px solid #d2d2d2",
                }}
              >
                {input.label}
              </MenuItem>
            )
          })
        : null}
    </Field>
  )
}
