import React, { useState } from "react"
import { Grid, Row } from "../Grid"
import { Sans, Box } from ".."
import { FAQCard } from "./FAQCard"

const items = [
  {
    title: "Where is Seasons available?",
    text:
      "We're exclusively servicing select cities in the North and Southeast. Create an account with your ZIP code and we'll let you know if we're in your area.",
  },
  {
    title: "Who is Seasons for?",
    text:
      "Seasons is for everyone. Gender lines have been blurred and it's no longer about Men's or Women's. It's about whether you like something or not and helping you find a size that fits.",
  },
  {
    title: "How long can I keep my 3 pieces?",
    text:
      "On an Essential plan you have 28 days to wear and return (don't worry, we'll remind you). With an All Access plan you're free to keep them as long as you want and swap out anytime.",
  },
  {
    title: "Want more than 3 pieces?",
    text:
      "Unfortunately we're not offering slot upgrades just yet. It's something we're still working on and will roll out soon. Have thoughts? Shoot us a message at <a href='mailto:membership@seasons.nyc?subject=Hello'>membership@seasons.nyc</a>.",
  },
  {
    title: "Received a damaged item?",
    text:
      "This rarely happens, but if it does, contact our customer service team, pack it up and send it back using the prepaid shipping label. We'll make sure we take care of you.",
  },
  {
    title: "Are there late fees?",
    text:
      "We'll charge a $35 fee for each day it's late (along with the monthly charge for your subscription). This only applies to the Essentials membership or if you cancel or pause your plan.",
  },
]

export const FAQ: React.FC = () => {
  const [minHeight, setMinHeight] = useState(150)
  return (
    <Grid>
      <Box px={2} mb={[2, 6]}>
        <Sans size="7">Frequently asked questions</Sans>
      </Box>
      <Row>
        {items.map((step, index) => (
          <FAQCard step={step} index={index} key={index} minHeight={minHeight} setMinHeight={setMinHeight} />
        ))}
      </Row>
    </Grid>
  )
}
