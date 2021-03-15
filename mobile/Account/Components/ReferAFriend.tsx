import { Flex, Sans } from "components"
import { ChevronIcon } from "components/Icons"
import React from "react"
import { TouchableOpacity } from "react-native"

export const ReferAFriend = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
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
