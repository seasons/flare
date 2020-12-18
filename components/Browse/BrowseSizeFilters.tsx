import { Sans, Spacer, Flex, Separator, Box } from "../../components"
import { color } from "../../helpers"
import styled from "styled-components"
import React from "react"
import { X } from "components/SVGs"
import Link from "next/link"

interface Props {
  available?: boolean
  currentBottoms: string[]
  currentTops: string[]
  setCurrentBottoms: (param: string[]) => void
  setCurrentTops: (param: string[]) => void
  setAvailableOnly: (param: boolean) => void
}

const SizeButton = ({ size, items, setParam }) => {
  console.log("items", items)
  const itemArray = items || []
  let isActive = items?.includes(size)
  return (
    <SizeButtonWrapper
      isActive={isActive}
      onClick={() => {
        const newParams = isActive ? itemArray.filter((i) => i !== size) : [size, ...itemArray]
        setParam(newParams)
      }}
    >
      <Sans size="3" my="2" color={isActive ? color("white100") : color("black100")}>
        {size}
      </Sans>
    </SizeButtonWrapper>
  )
}

export const BrowseSizeFilters: React.FC<Props> = ({
  currentBottoms,
  currentTops,
  available,
  setCurrentBottoms,
  setCurrentTops,
  setAvailableOnly,
}) => {
  const topChoices = ["XS", "S", "M", "L", "XL", "XXL"]
  const bottomChoices = ["28", "29", "30", "31", "32", "33", "34", "35", "36", "37"]

  return (
    <Box style={{ maxWidth: "148px" }}>
      <Sans size="3">Filter by</Sans>
      <Box mr="2px">
        <Separator />
      </Box>
      <Spacer mb={[0, 2]} />
      <Flex mb={2} alignItems="center" flexDirection="row">
        <CheckBox mr={1} isActive={available} onClick={() => setAvailableOnly(!available)}>
          <X />
        </CheckBox>
        <Sans size="3">Available now</Sans>
      </Flex>
      <Sans size="3">Tops</Sans>
      <SizeButtonContainer>
        {topChoices.map((size) => {
          return <SizeButton key={size} size={size} items={currentTops} setParam={setCurrentTops} />
        })}
      </SizeButtonContainer>
      <Spacer mb={2} />
      <Sans size="3">Bottoms</Sans>
      <SizeButtonContainer>
        {bottomChoices.map((size) => {
          return <SizeButton key={size} size={size} items={currentBottoms} setParam={setCurrentBottoms} />
        })}
      </SizeButtonContainer>
    </Box>
  )
}

const CheckBox = styled(Box)<{ isActive: boolean }>`
  height: 24px;
  width: 24px;
  border: 1px solid ${(p) => (p.isActive ? color("black100") : color("black25"))};
  background-color: ${(p) => (p.isActive ? color("black100") : color("white100"))};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 1px solid ${color("black100")};
    background-color: ${color("black100")};
  }
`

const SizeButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  left: -2px;
  position: relative;
`

const SizeButtonWrapper = styled.div<{ isActive: boolean }>`
  border: 1px solid ${(p) => (p.isActive ? color("black100") : color("black25"))};
  background-color: ${(p) => (p.isActive ? color("black100") : color("white100"))};
  height: 33px;
  width: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${color("black100")};
    background-color: ${color("black100")};
    p {
      color: ${color("white100")} !important;
    }
  }
`
