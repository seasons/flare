import { Box, Flex, Sans, Spacer } from "components"
import { color } from "helpers/color"
import React, { useState } from "react"
import { Dimensions, TouchableOpacity, ViewStyle } from "react-native"
import styled from "styled-components"

type Item = { label: string; value: string }

interface MultiSelectionTableProps {
  disabled?: boolean
  items: Item[]
  onTap?: (item: Item, index: number) => void
  selectedItemIndices: number[]
  style?: ViewStyle
}

const windowWidth = Dimensions.get("window").width - 32

export const MultiSelectionTable: React.FC<MultiSelectionTableProps> = ({
  disabled = false,
  items,
  onTap,
  selectedItemIndices,
}) => {
  const [width, setWidth] = useState(windowWidth)

  const itemHeight = 60
  const itemCornerRadius = 4
  const minimumInterItemSpacing = 8

  const data = items.map((item, index) => ({
    isSelected: selectedItemIndices.includes(index),
    item,
  }))

  console.log("Size data", data)

  const renderItem = ({ isSelected, item }: { isSelected: boolean; item: Item }, index: number) => {
    return (
      <TouchableOpacity disabled={disabled} onPress={() => onTap?.(item, index)} key={index}>
        <Flex height={itemHeight + interItemSpacing} width={itemHeight} mr={1} justifyContent="center">
          <Flex
            justifyContent="center"
            height={itemHeight + "px"}
            width={itemHeight + "px"}
            style={{
              backgroundColor: color(isSelected ? "black04" : "white100"),
              borderColor: color(isSelected ? "black100" : "black10"),
              borderStyle: "solid",
              borderRadius: itemCornerRadius,
              borderWidth: 1,
              ...(isSelected
                ? {
                    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.2)",
                  }
                : {}),
            }}
          >
            <Sans
              size="3"
              color="black100"
              style={{
                textAlign: "center",
                lineHeight: itemHeight + "px",
              }}
            >
              {item.label}
            </Sans>
          </Flex>
        </Flex>
      </TouchableOpacity>
    )
  }

  const itemsPerRow = Math.floor((width - itemHeight) / (itemHeight + minimumInterItemSpacing)) + 1
  const interItemSpacing = (width - itemsPerRow * itemHeight) / (itemsPerRow - 1)
  const numRows = Math.ceil(items.length / itemsPerRow)
  // @ts-ignore
  const numArray = [...Array(numRows).keys()]

  return (
    <Box>
      {numArray.map((
        row // map each row index to a Flex box
      ) => (
        <Flex key={row.toString()} style={{ flexWrap: "wrap" }}>
          {data.slice(row * itemsPerRow, (row + 1) * itemsPerRow).flatMap((datum, index, array) => {
            const dataIndex = index + itemsPerRow * row
            const view = renderItem(datum, dataIndex) // render each item
            return view
          })}
        </Flex>
      ))}
    </Box>
  )
}

const Container = styled(Box)``
