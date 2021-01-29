import { Field, useFormikContext } from "formik"
import React, { useState } from "react"

import { TextField } from "./TextField"

export const TelephoneMaskField = ({ name }) => {
  const { values, handleBlur, setFieldValue } = useFormikContext<{ tel: string }>()
  const [telVal, setTelVal] = useState("")
  return (
    <Field
      component={TextField}
      InputProps={{
        onChange: (e) => {
          const [newInputLength, oldInputLength] = [e.target.value.length, telVal.length]
          let maskVal = e.target.value
          // if they deleted a character, pass through
          if (newInputLength < oldInputLength) {
            setFieldValue(name, e.target.value || "")
            setTelVal(e.target.value || "")
          } else if (newInputLength === oldInputLength + 1) {
            // if they added a character, apply the mask as needed
            const lastChar = e.target.value[newInputLength - 1]
            if (/[0-9]/.test(lastChar)) {
              if (newInputLength === 4) {
                maskVal = `${e.target.value.slice(0, 3)}-${lastChar}`
                setFieldValue(name, maskVal)
                setTelVal(maskVal)
              } else if (newInputLength === 8) {
                maskVal = `${e.target.value.slice(0, 7)}-${lastChar}`
                setFieldValue(name, maskVal)
                setTelVal(maskVal)
              } else if (newInputLength <= 12) {
                setFieldValue(name, e.target.value)
                setTelVal(e.target.value)
              }
            }
          } else {
            // If they autocompleted the field, apply the mask
            // Filter out anything that's not a number
            maskVal = e.target.value.replace(/[^0-9]/g, "")
            // If 4th character isn't a dash, replace it.
            if (maskVal.length >= 4 && maskVal[3] !== "-") {
              maskVal = `${maskVal.slice(0, 3)}-${maskVal.slice(3)}`
            }
            // If 8th character isn't a dash, replace it
            if (maskVal.length >= 8 && maskVal[7] !== "-") {
              maskVal = `${maskVal.slice(0, 7)}-${maskVal.slice(7)}`
            }
            if (maskVal.length > 12) {
              maskVal = maskVal.slice(0, 12)
            }
            // Set the value
            setFieldValue(name, maskVal)
            setTelVal(maskVal)
          }
        },
      }}
      inputProps={{
        value: values?.tel || "",
      }}
      onBlur={handleBlur}
      type="tel"
      name={name}
      placeholder="000-000-0000"
    />
  )
}
