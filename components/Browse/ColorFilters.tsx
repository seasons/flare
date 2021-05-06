import { Flex, Sans, Spacer } from "components"
import { SizeFilterParams } from "pages/browse/[Filter]"
import React from "react"
import styled from "styled-components"
import { color as themeColor } from "../../helpers"

interface Props {
  setParams: (params: SizeFilterParams) => void
  params: SizeFilterParams
}

export const ColorFilters: React.FC<Props> = ({ setParams, params }) => {
  const colors = [
    { name: "white", hex: "#fff" },
    { name: "brown", hex: "#964B00" },
    { name: "grey", hex: "#808080" },
    { name: "green", hex: "#22a82d" },
    { name: "black", hex: "#000000" },
    { name: "purple", hex: "#4f36a7" },
    { name: "pink", hex: "#df2397" },
    { name: "orange", hex: "#ff9409" },
    { name: "red", hex: "#e71212" },
    { name: "blue", hex: "#1d2cff" },
    { name: "yellow", hex: "#ffd900" },
  ]

  return (
    <>
      <Sans size="3">Colors</Sans>
      <Spacer mb={[0, 2]} />
      <Flex width="100%" flexWrap="wrap">
        {colors.map((color, index) => {
          let isActive = params?.currentColors?.includes(color.name)
          const currentColors = params?.currentColors ?? []

          return (
            <ColorButton
              isActive={isActive}
              activeColor={color.hex}
              key={index}
              className={`color-button-${color.name}`}
              onClick={() => {
                const newColors: string[] = isActive
                  ? params?.currentColors?.filter((i) => i !== color.name)
                  : [color.name, ...currentColors]
                setParams({ ...params, currentColors: newColors })
              }}
            >
              <Sans size="3" my="2" color={isActive ? themeColor("white100") : themeColor("black100")}>
                {color.name}
              </Sans>
            </ColorButton>
          )
        })}
      </Flex>
    </>
  )
}

const ColorButton = styled.div<{ isActive: boolean; activeColor: string }>`
  border: 1px solid ${(p) => (p.isActive ? themeColor("black100") : themeColor("black10"))};
  background-color: ${(p) => (p.isActive ? p.activeColor : themeColor("white100"))};
  height: 33px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${themeColor("black100")};
    background-color: ${(p) => p.activeColor};

    p {
      color: ${themeColor("white100")} !important;
    }
  }

  &.color-button-white:hover {
    p {
      color: ${themeColor("black100")} !important;
    }
  }
`
