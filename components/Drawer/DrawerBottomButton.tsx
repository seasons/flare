import { Box, Button, Flex } from "components"
import React from "react"
import styled from "styled-components"

// import { useDrawerScrollbarWidth } from "components/Drawer/Drawer"
import { WebButtonProps } from "components/Button/Button"
import { color } from "helpers"

export interface DrawerBottomButtonProps {
  buttonProps: Omit<WebButtonProps, "children">
}
export const DrawerBottomButton: React.FC<DrawerBottomButtonProps> = ({ buttonProps, ...props }) => {
  // const scrollbarWidth = useDrawerScrollbarWidth()
  return (
    <Wrapper p={2}>
      <Button block variant="primaryBlack" {...buttonProps}>
        {props.children}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
`
