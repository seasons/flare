import { Flex, MaxWidth } from "components"
import { SignupFormProps, SIGNUP_FOOTER_HEIGHT } from "pages/signup"
import React from "react"

import { CustomerMeasurementsForm } from "./CustomerMeasurementsForm"

interface CustomerMeasurementsStepProps {
  form: SignupFormProps
}

export const CustomerMeasurementsStep: React.FC<CustomerMeasurementsStepProps> = ({ form }) => {
  return <CustomerMeasurementsForm {...form} />
}
