import { MaxWidth, ProgressiveImage } from "components"
import React from "react"
import styled from "styled-components"

import { Box, Flex } from "@seasons/eclipse"

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
