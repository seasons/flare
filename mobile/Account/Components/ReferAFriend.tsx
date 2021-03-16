import { Box, Flex, Sans } from "components"
import { ChevronIcon } from "components/Icons"
import { useModalContext } from "components/Modal/ModalContext"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"
import { ReferralModal } from "./ReferralModal"

export const ReferAFriend: React.FC<{ referralLink: string }> = ({ referralLink }) => {
  const { toggleModal } = useModalContext()

  const onPress = () => {
    return toggleModal(true, <ReferralModal referralLink={referralLink} />)
  }

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
