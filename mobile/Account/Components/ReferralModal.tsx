import { Box, Flex, Sans, Spacer } from "components"
import { CloseXIcon } from "components/Icons/CloseXIcon"
import { useModalContext } from "components/Modal/ModalContext"
import React from "react"
import styled from "styled-components"
import { ReferralData } from "./ReferAFriend"

export const ReferralModal: React.FC<{ referralLink: string; referralData: ReferralData }> = ({
  referralLink,
  referralData,
}) => {
  const { toggleModal } = useModalContext()

  const onCopy = () => {
    navigator?.clipboard?.writeText(referralLink)
  }

  const title = referralData?.title
  const caption = referralData?.caption

  return (
    <Wrapper px={1}>
      <Flex flexDirection="row" justifyContent="flex-end">
        <Box onClick={() => toggleModal(false, null)} p={1} style={{ cursor: "pointer" }}>
          <CloseXIcon variant="light" />
        </Box>
      </Flex>
      <Box pt={3} pb={8}>
        <Sans size="8">{title}</Sans>
        <Sans size="3" color="black50">
          {caption}
        </Sans>
        <Spacer mb={4} />
        <Flex flexDirection="row" alignItems="center" width="100%" justifyContent="space-between">
          <Sans size="6">{referralLink}</Sans>
          <Sans size="3" underline pointer onClick={onCopy}>
            Copy link
          </Sans>
        </Flex>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  width: 450px;
  max-width: calc(100vw - 16px);
`
