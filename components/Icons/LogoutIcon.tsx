import * as React from "react"

/* SVGR has dropped some elements not supported by react-native-svg: title */

export const LogoutIcon = (props) => {
  return (
    <svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <g fill="none" fillRule="evenodd" opacity={0.3}>
        <path fill="#FFF" d="M0 0h20v36H0z" />
        <g transform="translate(0 5)">
          <rect stroke="#000" strokeWidth={2} fill="#FFF" x={1} y={1} width={18} height={24} rx={4} />
          <g fill="#000">
            <path d="M11 12v2H1v-2z" />
            <path d="M15 13l-6 4V9z" />
          </g>
        </g>
      </g>
    </svg>
  )
}
