import { ButtonProps } from "components/Button/Button.shared"
import { color } from "helpers/color"
import { formatPrice } from "helpers/formatPrice"
import React from "react"
import styled from "styled-components"

import { Box, Button, Flex, Sans, Separator } from "@seasons/eclipse"

interface ReservationBottomBarProps {
  lineItems: any[]
  onReserve: () => void
  disabled: boolean
  buttonProps?: Omit<ButtonProps, "children">
}

export const ReservationBottomBar: React.FC<ReservationBottomBarProps> = ({
  lineItems,
  onReserve,
  buttonProps,
  disabled,
}) => {
  if (lineItems?.length === 0) {
    return null
  }

  const totalLineItems = lineItems?.filter((l) => l.recordType === "Total")
  const totalLineItem = totalLineItems?.[totalLineItems.length - 1]
  const total = totalLineItem?.price || 0

  return (
    <>
      <Separator />
      <Box height={80} pt={2} px={2} style={{ backgroundColor: color("white100") }}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Sans size="3" color="black50">
              Estimated total
            </Sans>
            <Flex flexDirection="row" alignItems="center">
              <Sans size="6">{formatPrice(total)}</Sans>
            </Flex>
          </Box>

          <Box>
            <Button {...buttonProps} variant="primaryBlack" onClick={onReserve} disabled={disabled}>
              Confirm order
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

const Wrapper = styled(Flex)`
  background: white;
  position: absolute;
  bottom: 0;
  z-index: 100;
  right: 0;
  left: 0;
`
