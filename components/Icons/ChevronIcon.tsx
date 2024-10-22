import React from "react"
import { View } from "react-native"
import Svg, { G, Path } from "react-native-svg"

interface Props {
  rotateDeg?: string
  scale?: number
  color?: string
}

export const ChevronIcon = (props: Props) => {
  const rotationStyle = props.rotateDeg ? { transform: [{ rotate: props.rotateDeg }] } : {}
  const scale = props.scale || 1
  return (
    <View {...props} style={rotationStyle}>
      <Svg width={11 * scale} height={18 * scale} viewBox="0 0 11 18">
        <G fill="none" fillRule="evenodd">
          <Path
            stroke={props.color || "#C6C6C6"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 2l7 7-7 7"
          />
        </G>
      </Svg>
    </View>
  )
}
