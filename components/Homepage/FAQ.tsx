import React, { useState } from "react"

import { Box, Sans } from "../"
import { Grid, Row } from "../Grid"
import { Display } from "../Typography"
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
    title: "How long can I keep my pieces?",
    text:
      "We suggest returning your pieces after 28 days. If you love something in your order, feel free to hold on to it. We’ll only reset the slots of the items you decide to return.",
  },
  {
    title: "What if something doesn’t fit?",
    text:
      "Pack it up and send it back! We’ll make sure you get the right size or another item that fits. On an Essential plan? Any exchanges regarding size do not count towards your monthly swap.",
  },
  {
    title: "How often do you add new items?",
    text:
      "We release new styles every Friday and restock on Mondays and Thursdays. As new collections come in, we’ll announce a schedule of upcoming releases as well.",
  },
  {
    title: "Can I purchase items I like?",
    text:
      "Yes. Contact us via the app and we’ll take care of you. Soon, you’ll be able to purchase items in the app directly using your payment and shipping information on file.",
  },
]

export const FAQ: React.FC = () => {
  const [minHeight, setMinHeight] = useState(150)
  return (
    <Grid px={[1, 1, 1, 4, 4]}>
      <Box mb={[5, 5, 5, 3, 3]} px={1}>
        <Display size="9">Frequently asked questions</Display>
      </Box>
      <Row>
        {items.map((step, index) => (
          <FAQCard step={step} index={index} key={index} minHeight={minHeight} setMinHeight={setMinHeight} />
        ))}
      </Row>
    </Grid>
  )
}
