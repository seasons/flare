import { color } from "helpers/color"
import React from "react"

import { Box } from "./Box"

export const Skeleton: React.FC<{ width: number | string; height: number | string }> = ({ width, height }) => {
  return <Box style={{ backgroundColor: color("black04") }} width={width} height={height} />
}
