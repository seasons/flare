import { Flex, Media, Sans } from "components"
import { color } from "helpers/color"
import React from "react"

export const PromoBar = () => {
  return (
    <Flex
      style={{ backgroundColor: color("black100") }}
      flexDirection="row"
      justifyContent="center"
      width="100%"
      py={1}
    >
      <Media greaterThanOrEqual="md">
        <Sans size="3" color="white100" textAlign="center">
          Get 15% off your first month of membership with code FALL15 🍁
        </Sans>
      </Media>
      <Media lessThan="md">
        <Sans size="3" color="white100" textAlign="center">
          Get 15% off your first month with code FALL15 🍁
        </Sans>
      </Media>
    </Flex>
  )
}
