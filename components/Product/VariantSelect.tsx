import { Box, Button, Flex, Sans } from "components"
import { color } from "helpers/color"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import { Schema, useTracking } from "utils/analytics"
import styled from "styled-components"

export const sizeToName = (size) => {
  switch (size) {
    case "XS":
      return "X-Small"
    case "S":
      return "Small"
    case "M":
      return "Medium"
    case "L":
      return "Large"
    case "XL":
      return "X-Large"
  }
}

export const VariantSelect = ({ setSelectedVariant, selectedVariant, onSizeSelected, product, variantInStock }) => {
  const variants = product?.variants
  const tracking = useTracking()

  console.log("selectedVariant?.id", selectedVariant?.id)

  return (
    <Flex width="100%" justifyContent="flex-start" flexWrap="wrap" flexDirection="row">
      {variants?.map((size, i) => {
        const isSelected = selectedVariant?.id === size.id

        return (
          <Flex key={i} px={0.5} flex={3} pb={1}>
            <Button
              disabled={size.reservable === 0}
              boxShadow={isSelected}
              block
              variant={isSelected ? "primaryBlack" : "secondaryOutline"}
              onClick={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.ProductVariantSelected,
                  actionType: Schema.ActionTypes.Tap,
                  size: size?.displayShort,
                  variantID: size?.id,
                })
                setSelectedVariant(size)
                onSizeSelected(size)
              }}
            >
              {size.displayLong}
            </Button>
          </Flex>
        )
      })}
    </Flex>
  )
}
