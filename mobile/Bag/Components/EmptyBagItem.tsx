import { Box, Flex, Sans, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { BagPlus } from "components/SVGs/BagPlus"
import { useRouter } from "next/router"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"

export const EmptyBagItem: React.FC<{ text: string }> = ({ text }) => {
  const router = useRouter()
  const { closeDrawer } = useDrawerContext()

  return (
    <EmptyBagItemContainer>
      <Flex height="100%" flexDirection="row" alignItems="center" justifyContent="center" style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            router.push("/browse")
            closeDrawer()
          }}
        >
          <Flex flexDirection="column" alignItems="center" justifyContent="center">
            <BagPlus />
            <Spacer mb={2} />
            <Sans size="3" color="black50" style={{ textAlign: "center" }}>
              {text}
            </Sans>
          </Flex>
        </TouchableOpacity>
      </Flex>
    </EmptyBagItemContainer>
  )
}

const EmptyBagItemContainer = styled(Box)`
  height: 248px;
`
