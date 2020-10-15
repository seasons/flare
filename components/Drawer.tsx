import { Box } from "components"
import React, { useEffect, useState } from "react"

import { Drawer as MuiDrawer } from "@material-ui/core"

interface DrawerProps {
    open?: boolean
    onClose?: () => void
}

export const Drawer: React.FC<DrawerProps> = ({ children, open, onClose }) => {
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
    <MuiDrawer
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        variant="temporary"
    >
        <Box mx={6}>
        Hello World!
        </Box>
    </MuiDrawer>
    )
}