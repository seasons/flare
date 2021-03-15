import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const SwapIcon = (props) => {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFF" d="M0 0h56v56H0z" />
        <G stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
          <Path d="M44 37l-7-7M44 37l-7 7M11 37h32" />
        </G>
        <G stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
          <Path d="M11 19l7-7M11 19l7 7M43 19H11" />
        </G>
      </G>
    </Svg>
  )
}
