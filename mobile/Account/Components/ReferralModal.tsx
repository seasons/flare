import { Box, Flex, Sans, Spacer } from "components"
import { CloseXIcon } from "components/Icons/CloseXIcon"
import { useModalContext } from "components/Modal/ModalContext"
import React from "react"
import styled from "styled-components"

export const ReferralModal: React.FC<{ referralLink: string }> = ({ referralLink }) => {
  const { toggleModal } = useModalContext()

  const onCopy = () => {
    navigator?.clipboard?.writeText(referralLink)
  }

  return (
    <Wrapper px={1}>
      <Flex flexDirection="row" justifyContent="flex-end">
        <Box onClick={() => toggleModal(false, null)} p={1} style={{ cursor: "pointer" }}>
          <CloseXIcon variant="light" />
        </Box>
      </Flex>
      <Box>
        <Sans size="8">Your referral code</Sans>
        <Sans size="3" color="black50">
          Copy the below link and send it to your friends
        </Sans>
        <Spacer mb={4} />
        <Flex flexDirection="row" alignItems="center" width="100%" justifyContent="space-between">
          <Sans size="6">{referralLink}</Sans>
          <Sans size="3" style={{ textDecoration: "underline", cursor: "pointer" }} onClick={onCopy}>
            copy to clipboard
          </Sans>
        </Flex>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  height: 250px;
  width: 450px;
  max-width: calc(100vw - 16px);
`
