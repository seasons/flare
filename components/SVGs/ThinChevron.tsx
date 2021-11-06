import { Box } from "components"
import * as React from "react"

interface Props {
  rotateDeg?: string
  color?: string
  width?: number
}

export const ThinChevron: React.FC<Props> = (props) => {
  const width = props.width ? props.width : 16
  const height = width / 0.52

  const rotationStyle = props.rotateDeg ? { transform: `rotate(${props.rotateDeg})`, transformOrigin: "3px" } : {}

  return (
    <Box style={rotationStyle} width={width + "px"} height={height + "px"}>
      <svg width={width} height={height} viewBox="0 0 22 42" xmlns="http://www.w3.org/2000/svg">
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
