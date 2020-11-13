import { Box, Button } from "components"
import React from "react"
import styled from "styled-components"

import { DrawerBox, useDrawerScrollbarWidth } from "components/Drawer/Drawer"
import { WebButtonProps } from "components/Button/Button"

export interface DrawerBottomButtonProps {
  buttonProps: Omit<WebButtonProps, "children">
}
export const DrawerBottomButton: React.FC<DrawerBottomButtonProps> = ({ buttonProps, ...props }) => {
  const scrollbarWidth = useDrawerScrollbarWidth()

  return (
    <DrawerBox
      style={{
        position: "fixed",
        bottom: "0px",
        paddingBottom: "10px",
        backgroundColor: "white",
        right: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingRight: `${16 + scrollbarWidth}px`,
        paddingLeft: "16px",
      }}
    >
      <TopPaddingBox />
      <Button block variant={"primaryBlack"} {...buttonProps}>
        {props.children}
      </Button>
    </DrawerBox>
  )
}

const TopPaddingBox = styled(Box)`
  width: 100%;
  background-color: white;
  height: 10px;
`
