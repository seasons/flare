import { Box } from "@material-ui/core"
import { Formik } from "formik"
import React from "react"

export const FormWrapper = ({
  initialValues,
  initialTouched,
  onSubmit,
  validationSchema,
  ...props
}: {
  initialValues: any
  initialTouched: any
  onSubmit: (values: any, actions: any) => Promise<boolean>
  children: any
  validationSchema: any
}) => {
  return (
    <Formik
      initialValues={initialValues}
      initialTouched={initialTouched}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={onSubmit}
    >
      {(formikRenderProps) => {
        const context = {
          form: formikRenderProps,
        }
        return (
          <Box style={{ height: "100%", width: "100%" }}>{React.createElement(props.children as any, context)}</Box>
        )
      }}
    </Formik>
  )
}
