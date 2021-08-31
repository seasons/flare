import { Box, Flex, Sans } from "components"
import { ListCheck } from "components/SVGs/ListCheck"
import { color } from "helpers"
import React from "react"

interface Features {
  features: string[]
  strikeThroughFeatures: string[]
}

export const PlanFeatures: React.FC<{ features: Features; hideStrikeThroughFeatures: boolean }> = ({
  features,
  hideStrikeThroughFeatures = false,
}) => {
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
      {!hideStrikeThroughFeatures &&
        features?.strikeThroughFeatures?.map((feature, index) => {
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
