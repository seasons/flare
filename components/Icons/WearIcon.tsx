import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
export const WearIcon = (props) => {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFF" d="M0 0h56v56H0z" />
        <G transform="translate(9 9)" stroke="#000" strokeWidth={1.5}>
          <Rect fill="#FFF" x={0.75} y={0.75} width={36.5} height={36.5} rx={18.25} />
          <Path d="M11.292 6.843L19 19.75M19 19h10.79" />
        </G>
      </G>
    </Svg>
  )
}
