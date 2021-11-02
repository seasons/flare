import * as React from "react"

export const CalendarIcon = (props) => {
  return (
    <svg width={36} height={36} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect stroke="#000" strokeWidth={1.5} fill="#FFF" x={0.75} y={0.75} width={34.5} height={34.5} rx={4} />
        <rect fill="#000" opacity={0.2} x={4} y={12} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={12} y={12} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={20} y={12} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={28} y={12} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={4} y={20} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={12} y={20} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={20} y={20} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={28} y={20} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={4} y={28} width={4} height={4} rx={1} />
        <rect fill="#000" opacity={0.2} x={12} y={28} width={4} height={4} rx={1} />
        <rect fill="#000" x={20} y={28} width={4} height={4} rx={1} />
        <path stroke="#000" strokeWidth={1.5} d="M0 8h36" />
      </g>
    </svg>
  )
}
