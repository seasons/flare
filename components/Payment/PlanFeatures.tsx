import { Box, Flex, Sans } from "components"
import { ListCheck } from "components/SVGs/ListCheck"
import { color } from "helpers"
import React from "react"

interface Feature {
  caption: string
  title: string
}

export const PlanFeatures: React.FC<{ features: Feature[] }> = ({ features }) => {
  return (
    <>
      {features?.features?.map((feature, index) => {
        return (
          <Flex flexDirection="row" pb={2} alignItems="center" key={index} width="100%">
            <Box mr={2}>
              <ListCheck feature={true} />
            </Box>
            <Sans size="4" color="black100">
              {feature}
            </Sans>
          </Flex>
        )
      })}
      {features?.strikeThroughFeatures?.map((feature, index) => {
        return (
          <Flex flexDirection="row" pb={2} alignItems="center" key={index} width="100%">
            <Box mr={2}>
              <ListCheck feature={false} />
            </Box>
            <Sans size="4" color="black50" style={{ textDecorationLine: "line-through" }}>
              {feature}
            </Sans>
          </Flex>
        )
      })}
    </>
  )
}
