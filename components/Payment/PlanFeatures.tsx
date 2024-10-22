import { Box, Flex, Sans } from "components"
import { ListCheck } from "components/SVGs/ListCheck"
import { color } from "helpers"
import React from "react"

interface Features {
  included?: string[]
  excluded?: string[]
}

export const PlanFeatures: React.FC<{ features: Features }> = ({ features }) => {
  return (
    <Box>
      {features?.included?.map((feature, index) => {
        return (
          <Flex flexDirection="row" pb={2} alignItems="center" key={index} width="100%">
            <Box mr={2}>
              <ListCheck color={color("black100")} />
            </Box>
            <Sans size={["3", "4"]} color="black100">
              {feature}
            </Sans>
          </Flex>
        )
      })}
      {features?.excluded?.map((feature, index) => {
        return (
          <Flex flexDirection="row" pb={2} alignItems="center" key={index} width="100%">
            <Box mr={2}>
              <ListCheck />
            </Box>
            <Sans size={["3", "4"]} color="black50" style={{ textDecorationLine: "line-through" }}>
              {feature}
            </Sans>
          </Flex>
        )
      })}
    </Box>
  )
}
