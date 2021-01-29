import { MaxWidth } from "components"
import { SignupFormProps } from "pages/signup"
import React from "react"

import { CustomerMeasurementsForm } from "./CustomerMeasurementsForm"

interface CustomerMeasurementsStepProps {
  form: SignupFormProps
}

export const CustomerMeasurementsStep: React.FC<CustomerMeasurementsStepProps> = ({ form }) => {
  return (
    <MaxWidth>
      <CustomerMeasurementsForm {...form} />
    </MaxWidth>
  )
}