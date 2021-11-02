import * as React from "react"

export const BillingIcon = (props) => {
  return (
    <svg width={38} height={38} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle stroke="#000" strokeWidth={1.5} cx={19} cy={19} r={18.25} />
        <text fontFamily="ProximaNova-Medium, Proxima Nova" fontSize={16} fontWeight={400} fill="#000">
          <tspan x={14.208} y={24.5}>
            {"$"}
          </tspan>
        </text>
      </g>
    </svg>
  )
}
