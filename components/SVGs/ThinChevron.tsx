import { Box } from "components"
import * as React from "react"

interface Props {
  rotateDeg?: string
  color?: string
}

export const ThinChevron: React.FC<Props> = (props) => {
  const rotationStyle = props.rotateDeg ? { transform: `rotate(${props.rotateDeg})` } : {}

  return (
    <Box style={rotationStyle}>
      <svg width={16} height={24} viewBox="0 0 22 42" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1l20 20L1 41"
          stroke={props.color || "#000"}
          strokeWidth={2}
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}
