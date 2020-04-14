import React from "react"
import { Box, Sans, Spacer, Flex } from "../"

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
          <Sans size="8">{title}</Sans>
          <Sans size="4" color="black50">
            {subtitle}
          </Sans>
          {listItems?.map((item) => (
            <>
              <Spacer mt={5} />
              <Sans size="4">{item.title}</Sans>
              <Sans size="4" color="black50">
                {item.text}
              </Sans>
            </>
          ))}
        </Box>
      </Flex>
    </Box>
  )
}
