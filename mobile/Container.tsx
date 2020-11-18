import { Flex } from "components"
import { DrawerBottomButton } from "components/Drawer/DrawerBottomButton"
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
          flexDirection: "column",
          backgroundColor: color(backgroundColor),
          height: "100%",
          ...style,
        }}
      >
        {children}
      </Flex>
    </Theme>
  )
}
