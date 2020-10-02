import * as React from "react"

export const CheckWithOutline = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" {...props}>
      <title>{"HeroCheck"}</title>
      <g transform="translate(1 1)" fill="none" fillRule="evenodd">
        <circle stroke="#E5E5E5" strokeWidth={0.75} cx={12} cy={12} r={12} />
        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6 12.216L10.062 16 18 8" />
      </g>
    </svg>
  )
}
