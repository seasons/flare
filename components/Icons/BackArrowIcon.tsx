import React from "react"

export const BackArrowIcon = (props) => (
  <svg width={26} height={26} {...props} viewBox="0 0 28 28">
    <g fill="none" fillRule="evenodd">
      <path
        stroke={props.color || "#FFF"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6l-8 8 8 8M1 14h15"
      />
    </g>
  </svg>
)
