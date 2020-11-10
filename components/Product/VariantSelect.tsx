import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import { color } from "helpers/color"
import { find } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { Schema, useTracking } from "utils/analytics"

import { Popover, Radio } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

export interface Variant {
  sizeDisplay?: string
}

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

const sizeDataForVariants = (variants = [], type) => {
  if (type === "Top") {
    return variants?.map((variant) => {
      return { ...variant, sizeDisplay: sizeToName(variant?.internalSize?.display) }
    })
  } else if (type === "Bottom") {
    return variants?.map((variant) => {
      return { ...variant, sizeDisplay: variant?.internalSize?.bottom?.value }
    })
  }
}

export const VariantList = ({ setSelectedVariant, selectedVariant, onSizeSelected, product }) => {
  const variants = product?.variants
  const type = product?.type
  const [sizeData, setSizeData] = useState([])
  const tracking = useTracking()

  useEffect(() => {
    if (sizeData.length === 0) {
      updateSizeData()
    }
  }, [])

  const updateSizeData = () => {
    const variantData = sizeDataForVariants(variants, type)
    setSizeData(variantData)

    // Update size data
    if (variantData?.length && !selectedVariant) {
      const firstAvailableSize =
        find(variantData, (size) => size.isInBag) ||
        find(variantData, (size) => size.reservable > 0) ||
        variantData?.[0]
      setSelectedVariant(firstAvailableSize)
    }
  }

  const rows = sizeData.map((size, i) => {
    const manufacturerSize = (size?.manufacturerSizes?.length > 0 && size?.manufacturerSizes?.[0]?.display) || ""
    return (
      <Box key={size.id || i}>
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.ProductVariantSelected,
              actionType: Schema.ActionTypes.Tap,
              size: size?.internalSize?.display,
              variantID: size?.id,
            })
            setSelectedVariant(size)
            onSizeSelected(size)
          }}
        >
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap" mr={2}>
            <Flex flexDirection="row" alignItems="center">
              <Radio checked={!!selectedVariant.id && selectedVariant.id === size.id} />
              <Spacer mr={1} />
              {size?.sizeDisplay && (
                <Sans color={size?.reservable > 0 ? color("black100") : color("black50")} size="4">
                  {size.sizeDisplay}
                </Sans>
              )}
            </Flex>
            <Spacer mr={5} />
            <Sans color="black50" size="3">
              {size?.reservable > 0 ? manufacturerSize : "Unavailable"}
            </Sans>
          </Flex>
        </TouchableOpacity>
        <Separator color={color("black15")} />
      </Box>
    )
  })

  return <Box>{rows}</Box>
}

export const VariantSelect = ({ setSelectedVariant, selectedVariant, onSizeSelected, product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  const text =
    product?.type === "Top"
      ? sizeToName(selectedVariant?.internalSize?.display)
      : selectedVariant?.internalSize?.bottom?.value

  return (
    <>
      <Button variant="primaryWhite" onClick={handleClick} aria-describedby={id} block>
        <Flex width="100%" justifyContent="center" flexDirection="row" alignContent="center">
          <Sans size="4">{text}</Sans>
          <Box top="2px" style={{ position: "relative" }}>
            <ExpandMoreIcon />
          </Box>
        </Flex>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <VariantList
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          onSizeSelected={() => {
            handleClose()
            onSizeSelected()
          }}
          product={product}
        />
      </Popover>
    </>
  )
}
