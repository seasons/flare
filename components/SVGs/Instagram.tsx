import * as React from "react"

export const InstagramSVG = (props) => {
  return (
    <svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <g fill="none" fillRule="evenodd" opacity={props.opaque ? 0.3 : 1}>
        <path d="M0 0h24v36H0z" />
        <g transform="translate(0 6)">
          <rect
            stroke="#000"
            className="ig-stroke"
            strokeWidth={1.5}
            x={0.75}
            y={0.75}
            width={22.5}
            height={22.5}
            rx={6}
          />
          <circle stroke="#000" className="ig-stroke" strokeWidth={1.5} cx={12} cy={12} r={4.25} />
          <circle fill="#000" className="ig-fill" cx={18.5} cy={5.5} r={1.5} />
        </g>
      </g>
    </svg>
  )
}
