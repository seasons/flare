import React from "react"

export const PersonalPreferencesIcon = (props) => (
  <svg width={20} height={36} viewBox="0 0 20 36" {...props}>
    <g fill="none" fillRule="evenodd" opacity={0.3}>
      <path fill="#FFF" d="M0 0h20v36H0z" />
      <g transform="translate(0 5)" stroke="#000" strokeWidth={2}>
        <rect fill="#FFF" x={1} y={1} width={18} height={24} rx={5.6} />
        <path d="M3 24c1.4-4 3.733-6 7-6h4" strokeLinecap="round" />
        <circle fill="#FFF" cx={10} cy={10} r={3} />
      </g>
    </g>
  </svg>
)
