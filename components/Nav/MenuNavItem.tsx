import React from "react"
import styled from "styled-components"

import {
  Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { Box, Sans, Separator } from "../"

export const MenuNavItem = ({ link, isMenu = false, menu = [] }) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Wrapper ml={3} height="100%" style={{ cursor: "pointer", position: "relative" }}>
        <div
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Sans size="3" color="black" style={{ lineHeight: "inherit" }}>
            <span>{link.text}</span>
          </Sans>
          {isMenu && (
            <span style={{ marginLeft: "5px", marginTop: "-28px", height: "20px" }}>
              <ExpandMoreIcon />
            </span>
          )}
        </div>
      </Wrapper>
      {menu && (
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {menu.map((item) => [
                      item.separator && <Separator />,
                      <MenuItem onClick={item.onClick}>{item.text}</MenuItem>,
                    ])}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </>
  )
}

const Wrapper = styled(Box)`
  position: relative;
  &:hover {
    div {
      display: block;
    }
  }
`

const IconContainer = styled.div`
  height: 20px;
  margin-top: -28px;
`
