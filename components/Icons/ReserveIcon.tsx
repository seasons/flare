import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const ReserveIcon = (props) => {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="#FFF" fillRule="evenodd">
        <Path d="M0 0h56v56H0z" />
        <Path
          d="M19.966 11H22c1.692 3.15 3.692 4.726 6 4.726S32.308 14.15 34 11h2.034a8.966 8.966 0 016.634 2.935L50 22h0l-6 5.5-4-2.795V44H16V24.705L12 27.5 6 22l7.332-8.065A8.966 8.966 0 0119.966 11z"
          stroke="#000"
          strokeWidth={1.5}
        />
      </G>
    </Svg>
  )
}
