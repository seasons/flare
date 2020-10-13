import React, { useEffect, useState } from "react"
import styled from "styled-components"

import {
  Box, Button as MuiButton, CircularProgress, Divider, Drawer as MuiDrawer, IconButton,
  InputAdornment, Link, makeStyles, SvgIcon, TextField, Tooltip, Typography
} from "@material-ui/core"

export const Drawer = ({children}) => {
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
  
    const handleOpen = () => {
      setOpen(true)
    }
  
    const handleClose = () => {
      setOpen(false)
    }

    return (
    <MuiDrawer
    anchor="right"
    ModalProps={{ BackdropProps: { invisible: true } }}
    onClose={handleClose}
    open={isOpen}
    variant="temporary"
  >
      {children}
      </MuiDrawer>
      )
}