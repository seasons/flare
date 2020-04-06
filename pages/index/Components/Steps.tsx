import React from "react"
import { Box, Flex, Sans } from "../../../components"

export const Steps = () => {
  const steps = [
    {
      title: "Pick your 3 styles",
      text:
        "Browse our curated brands and reserve up to 3 tops at a time. We'll deliver them straight to your door with a pre-paid return shipping label.",
    },
    {
      title: "Rotate them out",
      text:
        "Wear them once or as many times as you want. Ready for something new? Return all 3 of your pieces and reserve your next order.",
    },
    {
      title: "Shipping & dry cleaning's on us",
      text:
        "We handle the back and forth, restoring and cleaning each piece before it gets to you. Oh, rental insurance is covered too.",
    },
  ]

  return (
    <Box>
      <Flex>
        {steps.map((step) => (
          <Box>
            <Sans size="3">{step.title}</Sans>
            <Sans size="3">{step.text}</Sans>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
