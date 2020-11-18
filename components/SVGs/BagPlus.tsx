import * as React from "react"

export const BagPlus = (props) => {
  return (
    <svg width={56} height={56} viewBox="0 0 56 56" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle fill="#F6F6F6" cx={28} cy={28} r={28} />
        <g transform="translate(18 18)" fill="#000">
          <rect
            transform="rotate(90 10 10)"
            x={9}
            width={2}
            height={20}
            rx={1}
          />
          <rect x={9} width={2} height={20} rx={1} />
        </g>
      </g>
    </svg>
  )
}