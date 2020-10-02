import React from "react"

interface Props {
  backgroundColor?: string
  width?: number
  height?: number
  strokeWidth?: number
}

export const CheckWithBackground: React.FC<Props> = (props) => {
  return (
    <svg width={props.width || 42} height={props.height || 42} {...props} viewBox="0 0 56 56">
      <g fill="none" fillRule="evenodd">
        <circle fill={props.backgroundColor ? props.backgroundColor : "#04B853"} cx={28} cy={28} r={28} />
        <path
          stroke="#FFF"
          strokeWidth={props.strokeWidth ? props.strokeWidth : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 28.263L24.85 34 38 21"
        />
      </g>
    </svg>
  )
}
