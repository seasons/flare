import React from "react"

import { FormConfirmation } from "../Forms/FormConfirmation"

export const WaitlistedView: React.FC = () => {
  return (
    <>
      <FormConfirmation status={"waitlisted"} />
    </>
  )
}
