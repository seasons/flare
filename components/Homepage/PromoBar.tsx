import { Flex, Link, Sans } from "components"
import React from "react"

export const PromoBar = () => {
  return (
    <Flex style={{ backgroundColor: "#07256F" }} flexDirection="row" justifyContent="center" width="100%" py={1}>
      <Sans size="3" color="white100" textAlign="center">
        Refer a friend & get $20 in credits each ✨
      </Sans>
    </Flex>
  )
}
