import * as React from "react"

export const QuestionMark = (props) => {
  return (
    <svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <g fill="none" fillRule="evenodd" opacity={0.3}>
        <path fill="#FFF" d="M0 0h20v36H0z" />
        <g transform="translate(0 5)">
          <rect stroke="#000" strokeWidth={2} fill="#FFF" x={1} y={1} width={18} height={24} rx={5.6} />
          <text fontFamily="ProximaNova-Bold, Proxima Nova" fontSize={16} fontWeight="bold" fill="#000">
            <tspan x={6} y={18}>
              {"?"}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  )
}
