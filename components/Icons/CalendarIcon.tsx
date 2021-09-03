import * as React from "react"

export const CalendarIcon = (props) => {
  return (
    <svg width={56} height={56} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>{"Calendar"}</title>
      <g fill="none" fillRule="evenodd">
        <path fill="#FFF" d="M0 0h56v56H0z" />
        <g transform="translate(10 10)">
          <path stroke="#000" strokeWidth={1.5} fill="#FFF" d="M.75.75h34.5v34.5H.75z" />
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
      </g>
    </svg>
  )
}
