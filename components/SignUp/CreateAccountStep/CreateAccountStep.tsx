import { MaxWidth } from "components"
import React from "react"

import { CreateAccountForm, CreateAccountFormProps } from "./CreateAccountForm"

interface CreateAccountStepProps {
  form: CreateAccountFormProps
}

export const CreateAccountStep: React.FC<CreateAccountStepProps> = ({ form }) => {
  return (
    <MaxWidth>
      <CreateAccountForm {...form} />
    </MaxWidth>
  )
}
