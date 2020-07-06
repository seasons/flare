import * as React from "react"
export const BackArrow = (props) => {
  return (
    <svg width={18} height={28} viewBox="0 0 18 28" {...props}>
      <title>{"BackArrow"}</title>
      <g fill="none" fillRule="evenodd">
        <path fill="#282828" opacity={0.5} d="M0 0h18v28H0z" />
        <path stroke="#E5E5E5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 6l-8 8 8 8M1 14h15" />
      </g>
    </svg>
  )
}
