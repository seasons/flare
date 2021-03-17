import { color } from "helpers/color"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"

import { Box } from "./Box"
import { useDrawerContext } from "./Drawer/DrawerContext"
import { CloseXIcon } from "./Icons/CloseXIcon"

export type CloseButtonVariant = "light" | "dark"

export const CloseButton: React.FC<{
  variant?: CloseButtonVariant
  onClick?: () => void
}> = ({ variant, onClick }) => {
  const { closeDrawer } = useDrawerContext()
  return (
    <Wrapper>
      <TouchableOpacity
        onPress={() => {
          onClick ? onClick() : closeDrawer()
        }}
      >
        <Circle variant={variant}>
          <CloseXIcon variant={variant} />
        </Circle>
      </TouchableOpacity>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  top: 40px;
  right: 20px;
  z-index: 100;
`

const Circle = styled(Box)<{ variant: string }>`
  background-color: ${(p) => (p?.variant === "light" ? color("white100") : color("black85"))};
  border-width: ${(p) => (p?.variant === "light" ? 1 : 0)}px;
  border-color: ${(p) => (p?.variant === "light" ? color("black10") : color("black100"))};
  border-style: solid;
  border-radius: 100px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`
