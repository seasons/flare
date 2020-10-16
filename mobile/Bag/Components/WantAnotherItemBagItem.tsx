import { Box, Flex, Sans, Separator } from "components"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const WantAnotherItemBagItem: React.FC<{
  plan
  paymentPlans: (any | null)[] | null
}> = ({ plan, paymentPlans }) => {
  const itemCount = plan?.itemCount
  const nextItem = itemCount === 2 ? "3rd" : "2nd"

  const nextPlan = paymentPlans?.find((p) => p.tier === plan?.tier && p.itemCount === plan?.itemCount + 1)
  const priceIncrease = (nextPlan?.price - plan?.price) / 100 || 30

  return (
    <>
      <Separator />
      <Box p={2}>
        <EmptyBagItemContainer>
          <Flex pt="84px" flexDirection="column" alignItems="center">
            <Flex flexWrap="nowrap" flexDirection="column" alignItems="center">
              <TouchableOpacity>
                <Sans size="2" color="black100" textAlign="center">
                  {`Want a ${nextItem} item?`}
                </Sans>
                <Sans size="2" color="black50" textAlign="center" style={{ textDecorationLine: "underline" }}>
                  {`Add a slot for $${priceIncrease}`}
                </Sans>
              </TouchableOpacity>
            </Flex>
          </Flex>
        </EmptyBagItemContainer>
      </Box>
    </>
  )
}

const EmptyBagItemContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
  height: 270;
`
