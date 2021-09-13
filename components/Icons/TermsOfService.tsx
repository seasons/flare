import * as React from "react"

export const TermsOfService = (props) => {
  return (
    <svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <g fill="none" fillRule="evenodd" opacity={0.3}>
        <path fill="#FFF" d="M0 0h20v36H0z" />
        <g transform="translate(0 5)">
          <rect stroke="#000" strokeWidth={2} fill="#FFF" x={1} y={1} width={18} height={24} rx={4} />
          <rect fill="#000" x={5} y={8} width={10} height={2} rx={1} />
          <rect fill="#000" x={5} y={12} width={10} height={2} rx={1} />
          <rect fill="#000" x={5} y={16} width={10} height={2} rx={1} />
        </g>
      </g>
    </svg>
  )
}
