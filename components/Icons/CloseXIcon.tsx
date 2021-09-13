import { color } from "helpers/color"
import React from "react"

import { CloseButtonVariant } from "../CloseButton"

export const CloseXIcon: React.FC<{ variant: CloseButtonVariant }> = ({ variant }) => (
  <svg width={12} height={12}>
    <g
      transform="rotate(45 9.414 4.586)"
      fill={variant && variant === "light" ? color("black100") : color("white100")}
      fillRule="evenodd"
    >
      <rect x={7} width={2} height={16} rx={1} />
      <rect transform="rotate(90 8 8)" x={7} width={2} height={16} rx={1} />
    </g>
  </svg>
)
