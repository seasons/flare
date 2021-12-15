import { color } from "helpers/color"
import * as React from "react"

export const BagPlus = (props) => {
  return (
    <svg width={45} height={45} {...props} viewBox="0 0 66 66">
      <g fill="none" fillRule="evenodd">
        <circle stroke={color("black10")} fill={color("black10")} cx={32} cy={32} r={32} />
        <g transform="translate(20 20)" fill={color("black100")}>
          <rect x={11} width={2} height={24} rx={1} />
          <rect transform="rotate(90 12 12)" x={11} width={2} height={24} rx={1} />
        </g>
      </g>
    </svg>
  )
}
