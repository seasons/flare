import * as React from "react"
import { color as colorHelper } from "helpers"

/* SVGR has dropped some elements not supported by react-native-svg: title */

export const ListCheck: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <svg width={14} height={10} viewBox="0 0 14 10">
      <path
        d="M1 5.216L5.062 9 13 1"
        stroke={color ? color : colorHelper("black50")}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
