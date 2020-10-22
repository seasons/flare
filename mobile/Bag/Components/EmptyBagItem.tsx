import { Box, Flex, Sans } from "components"
import { BagPlus } from "components/SVGs/BagPlus"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"

export const EmptyBagItem: React.FC<{ index: number }> = ({ index }) => {
  return (
    <Box p={2}>
      <EmptyBagItemContainer>
        <Flex flex={1} pt="84px" flexDirection="column" alignItems="center">
          <Flex flexWrap="nowrap" flexDirection="column" alignItems="center" alignSelf="center">
            <TouchableOpacity onPress={() => {
              
            }}>
              <Box>
                <Box my={1} mx="auto">
                  <BagPlus />
                </Box>
                <Sans size="4" color="black50" textAlign="center">
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
