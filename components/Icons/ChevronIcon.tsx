import React from "react"

interface Props {
  rotateDeg?: string
  scale?: number
  color?: string
}

export const ChevronIcon = (props: Props) => {
  const rotationStyle = props.rotateDeg ? { transform: `rotate(${props.rotateDeg})` } : {}
  const scale = props.scale || 1

  return (
    <div {...props} style={rotationStyle}>
      <svg width={11 * scale} height={18 * scale} viewBox="0 0 11 18">
        <g fill="none" fillRule="evenodd">
          <path
            stroke={props.color || "#C6C6C6"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 2l7 7-7 7"
          />
        </g>
      </svg>
    </div>
  )
}
