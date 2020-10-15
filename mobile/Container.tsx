import { Flex } from "components"
import { color } from "helpers"
import { Theme } from "lib/theme"
import React from "react"

export const Container: React.FC<{
  children: any
  style?: any
  insetsBottom?: boolean
  insetsTop?: boolean
  backgroundColor?: "black100" | "white100"
}> = ({ children, backgroundColor = "white100", insetsBottom = true, insetsTop = true, style }) => {

  return (
    <Theme>
      <Flex
        style={{
          flex: 1,
          backgroundColor: color(backgroundColor),
          ...style,
        }}
      >
        {children}
      </Flex>
    </Theme>
  )
}
