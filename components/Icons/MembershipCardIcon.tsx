import * as React from "react"

export const MembershipCardIcon = (props) => {
  return (
    <svg width={46} height={30} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect stroke="#000" strokeWidth={1.5} fill="#FFF" x={0.75} y={0.75} width={44.5} height={28.5} rx={4} />
        <path fill="#000" d="M32 22h8v1.5h-8z" />
        <rect stroke="#000" strokeWidth={1.5} x={6.75} y={6.75} width={6.5} height={6.5} rx={3.25} />
        <path fill="#000" d="M6 22h16v1.5H6z" />
      </g>
    </svg>
  )
}
