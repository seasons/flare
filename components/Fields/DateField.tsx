import React, { useState } from "react"
import { Field } from "formik"
import { FormProps } from "../Forms/FormsTemplate"
import { TextField } from "./TextField"

interface Props extends FormProps {
  inputName: string
}

export const DateField: React.FC<Props> = ({ context, inputName }) => {
  const {
    form: { setValues, values, handleBlur },
  } = context
  const [dateVal, setDateVal] = useState("")
  return (
    <Field
      component={TextField}
      InputProps={{
        onChange: (e) => {
          const [newInputLength, oldInputLength] = [e.target.value.length, dateVal.length]
          let maskVal
          // if they deleted a character, pass through
          if (newInputLength < oldInputLength) {
            setValues({ ...values, [inputName]: e.target.value || "" })
            setDateVal(e.target.value || "")
          } else if (newInputLength === oldInputLength + 1) {
            // if they added a character, apply the mask as needed
            const lastChar = e.target.value[newInputLength - 1]
            if (/[0-9]/.test(lastChar)) {
              if (newInputLength === 3) {
                maskVal = `${e.target.value.slice(0, 2)}/${lastChar}`
                setValues({ ...values, [inputName]: maskVal })
                setDateVal(maskVal)
              } else if (newInputLength === 6) {
                maskVal = `${e.target.value.slice(0, 5)}/${lastChar}`
                setValues({ ...values, [inputName]: maskVal })
                setDateVal(maskVal)
              } else if (newInputLength <= 10) {
                setValues({ ...values, [inputName]: e.target.value })
                setDateVal(e.target.value)
              }
            }
          } else {
            // If they autocompleted the field, apply the mask
            // Filter out anything that's not a number
            maskVal = e.target.value.replace(/[^0-9]/g, "")
            // If 3rd character isn't a slash, replace it.
            if (maskVal.length >= 3 && maskVal[2] !== "/") {
              maskVal = `${maskVal.slice(0, 2)}/${maskVal.slice(2)}`
            }
            // If 6th character isn't a slash, replace it
            if (maskVal.length >= 6 && maskVal[5] !== "/") {
              maskVal = `${maskVal.slice(0, 5)}/${maskVal.slice(5)}`
            }
            if (maskVal.length > 10) {
              maskVal = maskVal.slice(0, 10)
            }
            // Set the value
            setValues({ ...values, [inputName]: maskVal })
            setDateVal(maskVal)
          }
        },
      }}
      type="text"
      placeholder="mm/dd/yyyy"
      onBlur={handleBlur}
      name={inputName}
    />
  )
}
