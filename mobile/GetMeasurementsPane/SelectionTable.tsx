import { Flex, Sans } from "components"
import { color } from "helpers/color"
import React from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import styled from "styled-components"

export type Item = { label: string; value: string }

export interface Props {
  disabled?: boolean
  items: Item[]
  onTap?: (item: Item, index: number) => void
  selectedItemIndices: number[]
  style?: ViewStyle
  itemHeight?: number
  itemWidth?: number
}

export const SelectionTable: React.FC<Props> = ({
  disabled = false,
  items,
  onTap,
  selectedItemIndices,
  itemHeight = 48,
  itemWidth = 60,
}) => {
  const itemCornerRadius = 4

  const data = items.map((item, index) => ({
    isSelected: selectedItemIndices.includes(index),
    item,
  }))

  const renderItem = ({ isSelected, item }: { isSelected: boolean; item: Item }, index: number) => {
    return (
      <TouchableOpacity disabled={disabled} onPress={() => onTap?.(item, index)} key={index}>
        <Flex height={itemHeight} width={itemWidth} mr={1} justifyContent="center">
          <Flex
            justifyContent="center"
            height={itemHeight + "px"}
            width={itemWidth + "px"}
            style={{
              backgroundColor: color(isSelected ? "black100" : "white100"),
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
              color={isSelected ? "white100" : "black100"}
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

  return <Container itemWidth={itemWidth}>{data.map((datum, index) => renderItem(datum, index))}</Container>
}

const Container = styled.div<Pick<Props, "itemWidth">>`
  display: grid;
  gap: 7px 7px;
  grid-template-columns: repeat(auto-fit, ${({ itemWidth }) => `${itemWidth}px`});
`
