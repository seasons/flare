import { Box, Flex, Sans, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { BagPlus } from "components/SVGs/BagPlus"
import { color } from "helpers/color"
import { useRouter } from "next/router"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"

export const EmptyBagItem: React.FC<{ text: string; view: "buy" | "rent" }> = ({ text, view }) => {
  const router = useRouter()
  const { closeDrawer } = useDrawerContext()
  const isBuyView = view === "buy"

  return (
    <EmptyBagItemContainer>
      <Flex height="100%" flexDirection="row" alignItems="center" justifyContent="center" style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            isBuyView
              ? router.push("/browse/all+all?page=1&available=true&forSale=true&orderBy=publishedAt_DESC")
              : router.push("/browse")

            closeDrawer()
          }}
        >
          <Flex flexDirection="column" alignItems="center" justifyContent="center">
            <Circle>
              <BagPlus />
            </Circle>
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

const Circle = styled(Box)`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background-color: ${color("black10")};
  display: flex;
  align-items: center;
  justify-content: center;
`
