import { color } from "helpers"
import React, { useState } from "react"
import { Box } from "./Box"
import { Button } from "./Button"
import { Collapse } from "./Collapse"
import { Flex } from "./Flex"
import { ChevronIcon } from "./Icons"
import { Separator } from "./Separator"
import { Spacer } from "./Spacer"
import { Sans } from "./Typography"

const CollapseableSection = ({ section, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen ? defaultOpen : false)
  return (
    <>
      <Spacer mb={3} />
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <Sans size="4">{section?.title}</Sans>
        <ChevronIcon rotateDeg={open ? "-90deg" : "90deg"} color={color("black100")} scale={0.7} />
      </Flex>
      <Separator />
      <Collapse open={open}>
        <Spacer mb={1} />
        <Sans size="4" color="black50">
          {section?.text}
        </Sans>
      </Collapse>
    </>
  )
}

export const CollapsableFAQ: React.FC<{ faqSections: any; defaultOpen?: boolean }> = ({ faqSections, defaultOpen }) => {
  return (
    <Box>
      {faqSections?.[0]?.subsections?.map((section, index) => {
        return <CollapseableSection section={section} key={index} defaultOpen={defaultOpen} />
      })}
      <Spacer mb={3} />
      <Sans color="black50" size="3">
        Have a question not covered in the FAQ?
      </Sans>
      <Spacer mb={2} />
      <a href="mailto:membership@seasons.nyc?subject=Support" style={{ textDecoration: "none" }}>
        <Button variant="secondaryOutline" block type="button">
          Contact us
        </Button>
      </a>
    </Box>
  )
}
