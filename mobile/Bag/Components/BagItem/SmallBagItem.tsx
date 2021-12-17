import { PRODUCT_ASPECT_RATIO } from "@seasons/eclipse"
import { Box, Flex, Link, Picture } from "components"
import gql from "graphql-tag"
import React from "react"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"
import { BagItemCTAs, BagItemCTAsFragment_BagItem } from "./BagItemCTAs"
import { BagItemProductMetaData, BagItemProductMetaDataFragment_BagItem } from "./BagItemProductMetaData"

const SMALL_BAG_ITEM_HEIGHT = 148

export const BagItemFragment_BagItem = gql`
  fragment BagItemFragment_BagItem on BagItem {
    id
    productVariant {
      id
      product {
        id
        slug
        name
        images {
          id
          url
        }
      }
    }
    ...BagItemProductMetaDataFragment_BagItem
    ...BagItemCTAsFragment_BagItem
  }
  ${BagItemProductMetaDataFragment_BagItem}
  ${BagItemCTAsFragment_BagItem}
`

export const SmallBagItem: React.FC<{ sectionStatus: any; bagItem: any; showBuyPrice?: boolean }> = ({
  bagItem,
  sectionStatus,
  showBuyPrice,
}) => {
  const variant = bagItem?.productVariant
  const product = variant?.product
  const imageUrl = product?.images?.[0]?.url || ""

  return (
    <Link href="/product/[Product]" as={`/product/${product.slug}`}>
      <Wrapper>
        {!!imageUrl && (
          <Box
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              height: SMALL_BAG_ITEM_HEIGHT,
              width: SMALL_BAG_ITEM_HEIGHT / PRODUCT_ASPECT_RATIO,
            }}
          >
            <Picture src={imageResize(imageUrl, "small")} />
          </Box>
        )}
        <Flex alignItems="flex-end" flexDirection="column" justifyContent="space-between" px={2} flex={1}>
          <BagItemProductMetaData variant={variant} showBuyPrice={showBuyPrice} />
          <BagItemCTAs bagItem={bagItem} sectionStatus={sectionStatus} size="small" />
        </Flex>
      </Wrapper>
    </Link>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  flex-direction: row;
  display: flex;
  position: relative;
`
