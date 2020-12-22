import * as React from "react"

export const X = (props) => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="#FFF" fillRule="evenodd" opacity={0.9}>
        <path d="M13.935 4.743l1.06 1.06-9.192 9.193-1.06-1.061z" />
        <path d="M14.996 13.935l-1.061 1.06-9.192-9.192 1.06-1.06z" />
      </g>
    </svg>
  )
}
