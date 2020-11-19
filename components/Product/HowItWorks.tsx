import { Box, Sans, Separator, Spacer } from ".."
import React from "react"

export const HOW_IT_WORKS_TEXT = [
  {
    title: "Reserve your favorite styles",
    text:
      "Browse from a curated list of brands and reserve up to 3 pieces at a time. Save your favorites for later & build a queue.",
  },
  {
    title: "Wear for up to 30-days",
    text:
      "Wear the styles you want to try, but aren’t sure if you want to buy. A new way to discover your style without the commitment or buyers remorse.",
  },
  {
    title: "Shipping & returns are on us",
    text:
      "We handle the shipping back and forth, restoring and cleaning each piece for you. We cover rental insurance too.",
  },
]

export const HowItWorks = () => {
  return (
    <Box pt={8} mb={3}>
      <Sans size="5" color="black100">
        How it works
      </Sans>
      <Spacer mb={5} />
      {HOW_IT_WORKS_TEXT.map((item, index) => {
        return (
          <Box key={index}>
            <Separator />
            <Spacer mb={5} />
            <Sans size="4" color="black50">{`0${index + 1}`}</Sans>
            <Spacer mb={2} />
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
