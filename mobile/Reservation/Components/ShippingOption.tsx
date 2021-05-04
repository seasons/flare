import { Box, Flex, Sans, Spacer } from "components"
import { color } from "helpers"
import { CheckCircledIcon } from "components/Icons"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"

export const ShippingOption = ({ option, index, shippingOptionIndex, setShippingOptionIndex }) => {
  const method = option?.shippingMethod
  let price
  if (option?.externalCost === 0) {
    price = "Free"
  } else {
    price = "$" + option?.externalCost / 100
  }
  const selected = index === shippingOptionIndex

  return (
    <TouchableWithoutFeedback onPress={() => setShippingOptionIndex(index)}>
      <Container>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center" py={2}>
          <Sans size="3" color="black100">
            {method?.displayText}
          </Sans>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Sans size="3" color="black100">
              {price}
            </Sans>
            <Spacer mr={1} />
            {selected ? <CheckCircledIcon width={24} height={24} /> : <EmptyCircle />}
          </Flex>
        </Flex>
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled(Box)`
  cursor: pointer;
`

const EmptyCircle = styled(Box)`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  border: solid 1px ${color("black10")};
`
