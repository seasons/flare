import * as React from "react"

export const MembershipCardIcon = (props) => {
  return (
    <svg width={56} height={56} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path fill="#FFF" d="M0 0h56v56H0z" />
        <g transform="translate(5 13)">
          <rect stroke="#000" strokeWidth={1.5} fill="#FFF" x={0.75} y={0.75} width={44.5} height={28.5} rx={4} />
          <path fill="#000" d="M32 22h8v1.5h-8z" />
          <rect stroke="#000" strokeWidth={1.5} x={6.75} y={6.75} width={6.5} height={6.5} rx={3.25} />
          <path fill="#000" d="M6 22h16v1.5H6z" />
        </g>
      </g>
    </svg>
  )
}
