import styled from "styled-components"
import React from "react"
import { X } from "components/SVGs"
import { Box } from "components"
import { color } from "helpers"

export const Checkbox: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
  return (
    <CheckboxInput isActive={isActive} onClick={onClick}>
      <X />
    </CheckboxInput>
  )
}

const CheckboxInput = styled(Box)<{ isActive: boolean }>`
  height: 24px;
  width: 24px;
  border: 1px solid ${(p) => (p.isActive ? color("black100") : color("black10"))};
  background-color: ${(p) => (p.isActive ? color("black100") : color("white100"))};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 1px solid ${color("black100")};
    background-color: ${color("black100")};
  }
`
