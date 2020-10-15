import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Modal } from "@material-ui/core"

import { LoginView } from "./Login"

interface LoginModalProps {
    open?: boolean
    onClose?: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
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
        <Modal
  open={isOpen}
  onClose={handleClose}
>
    
  <LoginView />

</Modal>
    )
}

const Container = styled.div`
    background: white;
    border: 1px solid #000;
`