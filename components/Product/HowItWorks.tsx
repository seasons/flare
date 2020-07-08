import { Box, Sans, Separator, Spacer } from ".."
import React from "react"

const items = [
  {
    title: "Choose your items",
    text:
      "Browse from over 40 different brands and reserve up to 3 pieces per order. Not sure what to get? We’ll recommend some.",
  },
  {
    title: "Wear, swap & repeat",
    text:
      "Wear the styles you want to try, but aren’t sure if you want to buy. A new way to discover your style without the commitment or buyers remorse.",
  },
  {
    title: "Returns & dry cleaning's on us",
    text:
      "We handle the shipping back and forth, restoring and cleaning each piece for you. Oh, we cover rental insurance too.",
  },
]

export const HowItWorks = () => {
  return (
    <Box pt={10} px={2} mb={3}>
      <Sans size="5" color="black100">
        How it works
      </Sans>
      <Spacer mb={5} />
      {items.map((item, index) => {
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
