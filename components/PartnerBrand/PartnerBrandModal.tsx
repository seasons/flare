import { Picture } from "components/Picture"
import { Check } from "components/SVGs/Check"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Modal } from "@material-ui/core"
import { Box, Button, Flex, Sans, Spacer } from "@seasons/eclipse"

interface PartnerBrandModalProps {
  brandName?: string
  imageURL?: string
  open?: boolean
  onClose?: () => void
}

export const PartnerBrandModal: React.FC<PartnerBrandModalProps> = (props) => {
  const [isOpen, setOpen] = useState(false)
  const { brandName, imageURL, open, onClose } = props
  const descriptionLines = [
    "Free shipping, returns & dry cleaning.",
    "Purchase items you love directly from the app.",
    "No commitment. Pause or cancel anytime.",
  ]

  const Content = () => (
    <Container>
      <Flex flexDirection="row">
        <Flex style={{ width: "450px", height: "100%" }}>
          <Picture src={imageURL || ""} />
        </Flex>
        <Flex flex={1} py={4} px={3}>
          <CloseButton
            onClick={() => {
              setOpen(false)
            }}
          >
            X
          </CloseButton>
          <Box mb={2} mt={6}>
            <Sans size="7">
              Seasons + <Underline>{brandName}</Underline>
            </Sans>
          </Box>
          <Box mb={3}>
            <Sans size="4" color="black50">
              As a member, try on styles at home for 30-days for as low as $65 per month. Get started below.
            </Sans>
          </Box>
          <Flex flexDirection="column">
            {descriptionLines.map((line) => {
              return (
                <Flex flexDirection="row" alignItems="center" key={line} width="100%" pb={2}>
                  <Check />
                  <Spacer mr={2} />
                  <Sans color="black50" size="4">
                    {line}
                  </Sans>
                </Flex>
              )
            })}
          </Flex>
          <Box mt={2}>
            <Button size="medium" block>
              Create an Account
            </Button>
          </Box>
          <Box>
            <Button size="medium" variant="noOutline" block>
              Learn more
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )

  useEffect(() => {
    if (typeof open === "boolean") {
      setOpen(open)
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
    onClose?.()
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Content />
    </Modal>
  )
}

const Underline = styled.a`
  text-decoration: underline;
`

const Container = styled(Box)`
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  background: white;
  width: 870px;
  height: 450px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -225px;
  margin-left: -435px;
`

const CloseButton = styled(Box)`
  border: 1px solid #000;
  border-top-width: 0px;
  border-right-width: 0px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  line-height: 40px;
  background: white;
`
