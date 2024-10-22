import React from "react"
import Svg, { Circle, G, Path, Rect } from "react-native-svg"

export const PersonalPreferencesIcon = (props) => (
  <Svg width={20} height={36} viewBox="0 0 20 36" {...props}>
    <G fill="none" fillRule="evenodd" opacity={0.3}>
      <Path fill="#FFF" d="M0 0h20v36H0z" />
      <G transform="translate(0 5)" stroke="#000" strokeWidth={2}>
        <Rect fill="#FFF" x={1} y={1} width={18} height={24} rx={5.6} />
        <Path d="M3 24c1.4-4 3.733-6 7-6h4" strokeLinecap="round" />
        <Circle fill="#FFF" cx={10} cy={10} r={3} />
      </G>
    </G>
  </Svg>
)
