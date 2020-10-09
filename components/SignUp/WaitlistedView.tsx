import React from "react"

import { FormConfirmation } from "../Forms/FormConfirmation"

export const WaitlistedView: React.FC = () => {
  return (
    <>
      <FormConfirmation
        headerText={"You're Waitlisted"}
        bodyText={"We’ll send you a notification when your account is ready and you’re able to choose your plan."}
      />
    </>
  )
}
