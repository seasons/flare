import { Box, Flex, Sans } from "components"
import { color } from "helpers/color"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"

import { Popover } from "@material-ui/core"

import Item from "./Item"

export interface BoxPickerProps {
  currentItem?: Item
  height?: number | string
  inputKey?: string
  onChange: (value: Item, inputKey?: string) => void
  title: string
  items: Item[]
  width?: number | string
}

export const BoxPicker: React.FC<BoxPickerProps> = ({
  currentItem,
  height = 48,
  inputKey,
  onChange,
  title,
  items,
  width,
}) => {
  const [showPopUp, setShowPopUp] = useState(false)
  const currentItemIndex = currentItem ? items.findIndex((item) => item.value === currentItem.value) || 0 : 0
  const [spinnerIndex, setSpinnerIndex] = useState(currentItemIndex)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box>
      <TouchableOpacity onPress={handleClick}>
        <Box
          height={height}
          width={width}
          style={{ borderColor: color("black10"), borderWidth: 1, flex: width ? 0 : 1, padding: 12, borderRadius: 4 }}
        >
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center" style={{ flex: 1 }}>
            <Sans size="1">{currentItem?.label || "Select"}</Sans>
            <DownChevronIcon scale={1.2} color="black50" />
          </Flex>
        </Box>
      </TouchableOpacity>

      <Popover
        id={id}
        open={showPopUp}
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
        <Picker selectedValue={spinnerIndex} onValueChange={(_, itemIndex) => setSpinnerIndex(itemIndex)}>
          {items.map((item, index) => (
            <Picker.Item key={item.value} label={item.label} value={index} />
          ))}
        </Picker>
      </Popover>
    </Box>
  )
}
