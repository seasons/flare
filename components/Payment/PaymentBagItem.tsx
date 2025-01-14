import { Box, Button, Flex, Sans, Spacer } from "components"
import { color } from "helpers"
import { get, head } from "lodash"
import React, { useState } from "react"
import styled from "styled-components"

import { Picture, PRODUCT_ASPECT_RATIO } from "@seasons/eclipse"

interface PaymentBagItemProps {
  index: number
  bagItem: any
  hideRemove?: boolean
  removeFromBag: (options: any) => void
}

export const PaymentBagItem: React.FC<PaymentBagItemProps> = ({ index, bagItem, hideRemove, removeFromBag }) => {
  const [isRemoving, setIsRemoving] = useState(false)
  const product = get(bagItem, "productVariant.product")
  if (!product) {
    return null
  }

  const imageURL = product?.images?.[0]?.url || ""

  return (
    <Box>
      <BagItemContainer>
        <Flex flexDirection="row" alignItems="flex-end">
          <Box px={2} py={3}>
            <Sans size="3">{`${index + 1}.`}</Sans>
            <Sans size="3">{product?.brand?.name}</Sans>
            <Sans size="3" color="black50">
              {product.name}
            </Sans>
            <Spacer mt={4} />
            {!hideRemove && (
              <Button
                size="small"
                variant="secondaryOutline"
                loading={isRemoving}
                onClick={() => {
                  setIsRemoving(true)
                  removeFromBag({
                    variables: {
                      id: bagItem?.productVariant?.id,
                      saved: false,
                    },
                  })
                }}
              >
                Remove
              </Button>
            )}
          </Box>
        </Flex>
        <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
          {!!imageURL && (
            <Box style={{ height: 216, width: 216 / PRODUCT_ASPECT_RATIO }}>
              <Picture src={imageURL} />
            </Box>
          )}
        </Flex>
      </BagItemContainer>
    </Box>
  )
}

const BagItemContainer = styled(Box)`
  height: 216px;
  overflow: hidden;
  flex-direction: row;
  background-color: ${color("white100")};
  border: 1px solid ${color("black10")};
  border-radius: 8px;
  display: flex;
`
