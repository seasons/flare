import { Flex, Sans } from "components"
import { ChevronIcon } from "components/Icons"
import React from "react"
import { TouchableOpacity } from "react-native"

export const ReferAFriend = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between" px={2} py={4}>
        <Flex flexDirection="column" flexWrap="nowrap">
          <Sans size="4" color="black100">
            Refer a friend & earn
          </Sans>
          <Sans size="4" color="black50">
            You have a new invite. Get your link
          </Sans>
        </Flex>
        <ChevronIcon />
      </Flex>
    </TouchableOpacity>
  )
}
