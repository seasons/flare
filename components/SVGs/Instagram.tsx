import * as React from "react"

export const InstagramSVG = (props) => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <title>{"Instagram"}</title>
      <g fill="none" fillRule="evenodd">
        <rect className="ig-stroke" stroke="#000" x={0.5} y={0.5} width={19} height={19} rx={6} />
        <circle className="ig-stroke" stroke="#000" cx={10} cy={10} r={4.5} />
        <circle className="ig-fill" fill="#000" cx={15.5} cy={4.5} r={1.5} />
      </g>
    </svg>
  )
}
