import { Box, Flex, Sans } from "components"
import { get, head } from "lodash"
import React from "react"
import { Image, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"

const PRODUCT_ASPECT_RATIO = 1.3

interface ReservationItemProps {
  productVariant: any
  index?: number
  navigation?: any
}

export const ReservationItem: React.FC<ReservationItemProps> = ({ productVariant, index, navigation }) => {
  const tracking = useTracking()
  const product = productVariant?.product

  const imageURL = product?.images?.[0]?.url

  return (
    <Box key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ProductTapped,
            actionType: Schema.ActionTypes.Tap,
            productSlug: product.slug,
            productId: product.id,
          })
          navigation?.navigate("Product", { id: product.id, slug: product.slug })
        }}
      >
        <ReservationItemContainer>
          <Flex flexDirection="row">
            <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
              <Box>
                <Sans size="3">{index + 1}</Sans>
                <Sans size="3">{product.brand.name}</Sans>
                <Sans size="3" color="black50">
                  {product.name}
                </Sans>
                {!!productVariant?.displayShort && (
                  <Sans size="3" color="black50">
                    Size {productVariant.displayShort}
                  </Sans>
                )}
              </Box>
            </Flex>
            <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
              {!!imageURL && (
                <Image
                  style={{ height: 170 * PRODUCT_ASPECT_RATIO, width: 170 }}
                  resizeMode="contain"
                  source={{ uri: imageURL }}
                />
              )}
            </Flex>
          </Flex>
        </ReservationItemContainer>
      </TouchableWithoutFeedback>
    </Box>
  )
}

const ReservationItemContainer = styled(Box)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  height: 210px;
`
