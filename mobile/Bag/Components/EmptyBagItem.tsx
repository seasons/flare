import { Box, Flex, Sans } from "components"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"

export const EmptyBagItem: React.FC<{ index: number }> = ({ index }) => {
  return (
    <Box p={2}>
      <EmptyBagItemContainer>
        <Flex flex={1} pt="84px" flexDirection="column" alignItems="center">
          <Flex flexWrap="nowrap" flexDirection="column" alignItems="center" alignSelf="center">
            <TouchableOpacity onPress={() => console.log("tapped empty bag")}>
              <Box>
                <Box my={1} mx="auto">
                  +
                </Box>
                <Sans size="2" color="black50" textAlign="center">
                  {`Slot ${index + 1}`}
                </Sans>
              </Box>
            </TouchableOpacity>
          </Flex>
        </Flex>
      </EmptyBagItemContainer>
    </Box>
  )
}

const EmptyBagItemContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
  height: 270;
`
