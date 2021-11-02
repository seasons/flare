import * as React from "react"

export const BillingIcon = (props) => {
  return (
    <svg width={56} height={56} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>{"Billing"}</title>
      <g fill="none" fillRule="evenodd">
        <circle stroke="#000" strokeWidth={1.5} cx={28} cy={28} r={18.25} />
        <text fontFamily="ProximaNova-Medium, Proxima Nova" fontSize={16} fontWeight={400} fill="#000">
          <tspan x={23.208} y={33.5}>
            {"$"}
          </tspan>
        </text>
      </g>
    </svg>
  )
}
