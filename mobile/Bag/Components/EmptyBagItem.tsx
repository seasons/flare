import { Box, Flex, Sans } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { BagPlus } from "components/SVGs/BagPlus"
import { useRouter } from "next/router"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"

export const EmptyBagItem: React.FC<{ index: number }> = ({ index }) => {
  const router = useRouter()
  const { closeDrawer } = useDrawerContext()

  return (
    <Box p={2}>
      <EmptyBagItemContainer>
        <Flex flex={1} py="84px" flexDirection="column" alignItems="center">
          <Flex flexWrap="nowrap" flexDirection="column" alignItems="center" alignSelf="center">
            <TouchableOpacity
              onPress={() => {
                router.push("/browse")
                closeDrawer()
              }}
            >
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
  height: 270px;
`
