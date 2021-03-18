import React from "react"
import Svg, { Circle, G, Path } from "react-native-svg"

interface Props {
  backgroundColor?: string
  width?: number
  height?: number
  strokeWidth?: number
}

export const CheckCircledIcon: React.FC<Props> = (props) => {
  return (
    <Svg width={props.width || 42} height={props.height || 42} {...props} viewBox="-1 -1 58 58">
      <G fill="none" fillRule="evenodd">
        <Circle
          fill={props.backgroundColor ? props.backgroundColor : "#04B853"}
          stroke="#FFF"
          strokeWidth={props.strokeWidth ? props.strokeWidth : 0}
          cx={28}
          cy={28}
          r={28}
        />
        <Path
          stroke="#FFF"
          strokeWidth={props.strokeWidth ? props.strokeWidth : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 28.263L24.85 34 38 21"
        />
      </G>
    </Svg>
  )
}
