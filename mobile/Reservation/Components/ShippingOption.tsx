import { Box, Flex, Sans, Spacer } from "components"
import { CheckCircledIcon } from "components/Icons"
import { color } from "helpers"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"

export const ShippingOption = ({ option, index, onSelect, selected }) => {
  const method = option?.shippingMethod

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <Container>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center" py={2}>
          <Sans size="3" color="black100">
            {method?.displayText}
          </Sans>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
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
