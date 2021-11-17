import { PRODUCT_ASPECT_RATIO } from "@seasons/eclipse"
import { Box, Flex, Link, Picture } from "components"
import { color } from "helpers"
import React from "react"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"
import { BagItemCTAs } from "./BagItemCTAs"
import { BagItemProductMetaData } from "./BagItemProductMetaData"

const LARGE_BAG_ITEM_HEIGHT = 214

export const LargeBagItem = ({ bagItem, sectionStatus }) => {
  const variant = bagItem?.productVariant
  const product = variant?.product
  const imageUrl = product?.images?.[0]?.url || ""

  const shadowStyles = {
    shadowColor: "black",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: 1,
  }

  return (
    <Link href="/product/[Product]" as={`/product/${product.slug}`}>
      <Box style={shadowStyles}>
        <Wrapper>
          {!!imageUrl && (
            <Box
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                height: LARGE_BAG_ITEM_HEIGHT,
                width: LARGE_BAG_ITEM_HEIGHT / PRODUCT_ASPECT_RATIO,
              }}
            >
              <Picture src={imageResize(imageUrl, "small")} />
            </Box>
          )}
          <Flex alignItems="flex-end" flexDirection="column" justifyContent="space-between" px={2} flex={1} py={2}>
            <BagItemProductMetaData variant={variant} />
            <BagItemCTAs bagItem={bagItem} sectionStatus={sectionStatus} size="large" />
          </Flex>
        </Wrapper>
      </Box>
    </Link>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  flex-direction: row;
  position: relative;
  background-color: ${color("white100")};
  border-radius: 8;
  overflow: hidden;
  display: flex;
`
