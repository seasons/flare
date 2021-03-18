import { Box, Sans, Separator, Spacer } from ".."
import React from "react"
import { HOW_IT_WORKS_TEXT } from "components/Homepage/HowItWorks"

export const ProductHowItWorks = () => {
  return (
    <Box pt={8} mb={3}>
      <Sans size="5" color="black100">
        How it works
      </Sans>

      <Spacer mb={5} />

      {HOW_IT_WORKS_TEXT?.map((item, index) => {
        return (
          <Box key={index}>
            <Separator />
            <Spacer mb={5} />
            <Sans size="4">{item.title}</Sans>
            <Spacer mb={1} />
            <Sans size="3" color="black50">
              {item.text}
            </Sans>
            <Spacer mb={5} />
          </Box>
        )
      })}
    </Box>
  )
}
