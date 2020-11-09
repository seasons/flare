import { ChoosePlanStep } from "components/SignUp/ChoosePlanStep"
import React, { useEffect, useState } from "react"

import { Modal } from "@material-ui/core"

interface UpdatePaymentPlanModalProps {
  open?: boolean
  onClose?: () => void
}

export const UpdatePaymentPlanModal: React.FC<UpdatePaymentPlanModalProps> = ({ open, onClose }) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      setOpen(open)
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
    onClose?.()
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ChoosePlanStep />
    </Modal>
  )
}
