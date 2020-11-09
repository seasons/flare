import React from "react"
import Svg, { G, Path } from "react-native-svg"

export const BackArrowIcon = (props) => (
  <Svg width={26} height={26} {...props} viewBox="0 0 28 28">
    <G fill="none" fillRule="evenodd">
      <Path
        stroke={props.color || "#FFF"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6l-8 8 8 8M1 14h15"
      />
    </G>
  </Svg>
)
