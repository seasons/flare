import React from "react"
import { Box, Sans, Spacer, Flex } from "components"
import { Display } from "../Typography"

type ListItem = {
  title: string
  text: string
}

export const TextList: React.FC<{ listItems: ListItem[]; title: string; subtitle: string }> = ({
  listItems,
  title,
  subtitle,
}) => {
  return (
    <Box height="100%" width="100%">
      <Flex
        py={3}
        style={{ height: "100%", width: "100%" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box style={{ maxWidth: "320px" }}>
          <Display size="9">{title}</Display>
          <Spacer mb={1} />
          <Sans size="4" color="black50">
            {subtitle}
          </Sans>
          {listItems?.map((item) => (
            <React.Fragment key={item.title}>
              <Spacer mt={5} />
              <Sans size="4">{item.title}</Sans>
              <Sans size="4" color="black50">
                {item.text}
              </Sans>
            </React.Fragment>
          ))}
        </Box>
      </Flex>
    </Box>
  )
}
