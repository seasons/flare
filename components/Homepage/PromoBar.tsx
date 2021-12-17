import { Flex, Sans } from "components"
import React from "react"

export const PromoBar = () => {
  return (
    <Flex style={{ backgroundColor: "#07256F" }} flexDirection="row" justifyContent="center" width="100%" py={1}>
      <Sans size="3" color="white100" textAlign="center">
        Shop the members-only archive sale until Dec 21 11:59PM 11:59 PM EST ✨
      </Sans>
    </Flex>
  )
}
