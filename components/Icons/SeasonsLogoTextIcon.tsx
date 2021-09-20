import * as React from "react"

export const SeasonsLogoTextIcon = (props) => {
  return (
    <svg width={109} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path fill="#FFF" d="M0 3h109v20H0z" />
        <text fontFamily="Apercu-Mono, Apercu Mono" fontSize={24} letterSpacing={0.5} fill="#000">
          <tspan x={1} y={23}>
            {"SEASONS"}
          </tspan>
        </text>
      </g>
    </svg>
  )
}
