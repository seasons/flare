import { Box, Button, Flex, Sans } from "components"
import { color } from "helpers/color"
import { find } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { Schema, useTracking } from "utils/analytics"
import styled from "styled-components"
import { backgroundSize } from "styled-system"

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

export const VariantList = ({ setSelectedVariant, selectedVariant, onSizeSelected, product }) => {
  const variants = product?.variants
  const tracking = useTracking()
  const rows = variants.map((size, i) => {
    const SizeButton = styled(Box)`
      border-color: ${size.reservable > 0 ? color("black10") : color("black04")};
      ${() => {
        if (size.displayShort === selectedVariant.displayShort) {
          return `border: solid ${color("black100")};
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          `
        }  
      }};
      background-color:${size?.reservable > 0 ? color("white100") : color("black04")};
      padding: 10px;
      border-radius: 7px;
      border-style: solid;
      border-width: 1px;
    `
    const SizeButtonText = styled(Sans)`
          color: ${size?.reservable > 0 ? color("black100") : color("black50")};
    `
    return (
      <Box key={size.id || i} width="155px" pb={1} pr={1}>
        <TouchableOpacity
          onPress={() => {
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
          <SizeButton>
            <Flex justifyContent="center">
              <SizeButtonText size="4">{size.displayLong}</SizeButtonText>
            </Flex>
          </SizeButton>
        </TouchableOpacity>
      </Box>
    )
  })

  return (
    <Flex width="100%" justifyContent="flex-start" flexWrap="wrap" flexDirection="row" >
      {rows}
    </Flex>
  )
}

export const VariantSelect = ({ setSelectedVariant, selectedVariant, onSizeSelected, product, variantInStock }) => {
  const [select, setSelect] = useState(false)

  return (
    <>
      <VariantList
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        onSizeSelected={() => {
          onSizeSelected()
        }}
        product={product}
      />
    </>
  )
}
