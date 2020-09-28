import * as React from "react"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const Check = (props) => {
  return (
    <svg width={14} height={10} viewBox="0 0 14 10" {...props}>
      <path
        d="M1 5.216L5.062 9 13 1"
        stroke="#000"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
