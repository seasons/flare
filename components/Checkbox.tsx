import styled from "styled-components"
import React from "react"
import { X } from "components/SVGs"
import { Box } from "components"
import { color } from "helpers"

export const Checkbox: React.FC<{ isActive: boolean; onClick?: () => void; size?: "default" | "small" }> = ({
  isActive,
  onClick,
  size = "default",
}) => {
  return (
    <CheckboxInput isActive={isActive} onClick={onClick} size={size}>
      <X />
    </CheckboxInput>
  )
}

const CheckboxInput = styled(Box)<{ isActive: boolean; size: "default" | "small" }>`
  height: ${(p) => (p.size === "default" ? "24px" : "18px")};
  width: ${(p) => (p.size === "default" ? "24px" : "18px")};
  border: 1px solid ${(p) => (p.isActive ? color("black100") : color("black10"))};
  background-color: ${(p) => (p.isActive ? color("black100") : color("white100"))};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 767px) {
    &:hover {
      border: 1px solid ${color("black100")};
      background-color: ${color("black100")};
    }
  }
`
