import { Box, Button, Flex } from "components"
import React from "react"
import styled from "styled-components"

import { useDrawerScrollbarWidth } from "components/Drawer/Drawer"
import { WebButtonProps } from "components/Button/Button"
import { color } from "helpers"

export interface DrawerBottomButtonProps {
  buttonProps: Omit<WebButtonProps, "children">
}
export const DrawerBottomButton: React.FC<DrawerBottomButtonProps> = ({ buttonProps, ...props }) => {
  const scrollbarWidth = useDrawerScrollbarWidth()
  console.log("scrollbarWidth", scrollbarWidth)
  return (
    <Flex
      style={{
        position: "fixed",
        bottom: "0px",
        right: "0px",
        backgroundColor: color("white100"),
      }}
      className="drawer-bottom-button"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      px={2}
      pb={2}
    >
      <TopPaddingBox />
      <Button block variant={"primaryBlack"} {...buttonProps}>
        {props.children}
      </Button>
    </Flex>
  )
}

const TopPaddingBox = styled(Box)`
  width: 100%;
  background-color: white;
  height: 10px;
`
