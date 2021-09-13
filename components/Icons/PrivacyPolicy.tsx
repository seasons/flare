import * as React from "react"

export const PrivacyPolicy = (props) => {
  return (
    <svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <g fill="#FFF" fillRule="evenodd" opacity={0.3}>
        <path d="M0 0h20v36H0z" />
        <g transform="translate(0 5)" stroke="#000" strokeWidth={2}>
          <ellipse cx={10} cy={5.5} rx={5} ry={5.5} />
          <rect x={1} y={7} width={18} height={18} rx={4} />
          <circle cx={10} cy={16} r={3} />
        </g>
      </g>
    </svg>
  )
}
