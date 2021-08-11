import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import { color } from "helpers/color"
import { find } from "lodash"
import React, { useEffect } from "react"
import { TouchableOpacity } from "react-native"
import { Schema, useTracking } from "utils/analytics"
import { Popover, Radio } from "@material-ui/core"
import styled from "styled-components"
import { SansSize } from "lib/theme"
import { ChevronIcon } from "components/Icons"

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
    const manufacturerSize = size?.manufacturerSizes?.[0]
    const manufacturerSizeDisplay =
      manufacturerSize?.display && manufacturerSize?.type && manufacturerSize?.display !== size.displayShort
        ? `${manufacturerSize?.type} ${manufacturerSize?.display}`
        : ""

    return (
      <Box key={size.id || i}>
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
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap" mr={2}>
            <Flex flexDirection="row" alignItems="center">
              <Radio checked={!!selectedVariant.id && selectedVariant.id === size.id} />
              <Spacer mr={1} />
              <Sans color={size?.reservable > 0 ? color("black100") : color("black50")} size="4">
                {size.displayLong}
              </Sans>
            </Flex>
            <Spacer mr={5} />
            <Sans color="black50" size="3">
              {size?.reservable > 0 ? manufacturerSizeDisplay : "Unavailable"}
            </Sans>
          </Flex>
        </TouchableOpacity>
        {i + 1 !== variants.length && <Separator color={color("black10")} />}
      </Box>
    )
  })

  return <Box>{rows}</Box>
}

const getElementWidth = (el: HTMLElement) => (el ? el.clientWidth : "auto")

export const VariantSelect = ({ setSelectedVariant, selectedVariant, onSizeSelected, product, variantInStock }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [popoverWidth, setPopoverWidth] = React.useState(getElementWidth(anchorEl))
  const variants = product?.variants

  React.useEffect(() => {
    let listener: EventListenerOrEventListenerObject
    if (typeof window !== undefined) {
      listener = () => {
        requestAnimationFrame(() => {
          setPopoverWidth(getElementWidth(anchorEl))
        })
      }
      window.addEventListener("resize", listener)
    }
    return () => {
      if (listener) {
        window.removeEventListener("resize", listener)
      }
      listener = null
    }
  }, [])

  useEffect(() => {
    if (variants?.length > 0 && !selectedVariant?.id) {
      const firstAvailableSize =
        find(variants, (size) => size.isInBag) || find(variants, (size) => size.reservable > 0) || variants?.[0]
      setSelectedVariant(firstAvailableSize)
    }
  }, [variants, setSelectedVariant])

  const handleClick = (event) => {
    const anchorEl = event.currentTarget
    setPopoverWidth(getElementWidth(anchorEl))
    setAnchorEl(anchorEl)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <>
      <Button variant="primaryWhite" onClick={handleClick} aria-describedby={id} block>
        <Flex width="100%" justifyContent="center" flexDirection="row" alignItems="center" flexWrap="nowrap">
          <Flex style={{ position: "relative" }} flexDirection="row" alignItems="center">
            {!variantInStock && <Strikethrough size="4" className="hover-white-background" />}
            <Sans size="4">{selectedVariant?.displayLong}</Sans>
          </Flex>
          <Flex ml={1} className="hover-white-path__svg">
            <ChevronIcon rotateDeg="90deg" color={color("black100")} scale={0.7} />
          </Flex>
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
        PaperProps={{
          elevation: 0,
          style: {
            border: "1px solid #000",
            marginTop: "5px",
            width: popoverWidth,
            boxSizing: "content-box",
          },
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

const Strikethrough = styled.div<{ size: SansSize }>`
  background-color: ${color("black100")};
  height: 2px;
  width: 100%;
  position: absolute;
  top: ${(p) => (p.size === "2" ? 7 : 12)}px;
  left: 0;
`
