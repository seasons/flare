import { Sans, Spacer, Flex, Box } from "../../components"
import { color } from "../../helpers"
import styled from "styled-components"
import React from "react"
import { SizeFilterParams } from "pages/browse/[Filter]"
import { Checkbox } from "components/Checkbox"

interface Props {
  setParams: (params: SizeFilterParams) => void
  params: SizeFilterParams
}

interface SizeButtonProps {
  size: string
  items: string[]
  setParams: (params: SizeFilterParams) => void
  params: SizeFilterParams
  type: "bottoms" | "tops"
}

const SizeButton: React.FC<SizeButtonProps> = ({ size, items, setParams, params, type }) => {
  const itemArray = items || []
  let isActive = items?.includes(size)
  return (
    <SizeButtonWrapper
      isActive={isActive}
      onClick={() => {
        const newParamsArray = isActive ? itemArray.filter((i) => i !== size) : [size, ...itemArray]
        if (type === "bottoms") {
          setParams({ ...params, currentBottoms: newParamsArray })
        } else {
          setParams({ ...params, currentTops: newParamsArray })
        }
      }}
    >
      <Sans size="3" my="2" color={isActive ? color("white100") : color("black100")}>
        {size}
      </Sans>
    </SizeButtonWrapper>
  )
}

export const BrowseSizeFilters: React.FC<Props> = ({ setParams, params }) => {
  const letterSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const waistSizes = ["28", "29", "30", "31", "32", "33", "34", "35", "36", "37"]

  const { currentTops, currentBottoms, availableOnly } = params

  return (
    <Box style={{ maxWidth: "148px" }}>
      <Sans size="3">Filter by</Sans>
      <Spacer mb={[0, 2]} />
      <Flex mb={2} alignItems="center" flexDirection="row">
        <Checkbox
          onClick={() => {
            setParams({ ...params, availableOnly: !availableOnly })
          }}
          isActive={availableOnly}
        />
        <Spacer ml={1} />
        <Sans size="3">Available now</Sans>
      </Flex>
      <Sans size="3">Tops</Sans>
      <SizeButtonContainer>
        {letterSizes.map((size) => {
          return (
            <SizeButton key={size} size={size} items={currentTops} params={params} setParams={setParams} type="tops" />
          )
        })}
      </SizeButtonContainer>
      <Spacer mb={2} />
      <Sans size="3">Bottoms</Sans>
      <SizeButtonContainer>
        {waistSizes.map((size) => {
          return (
            <SizeButton
              key={size}
              size={size}
              items={currentBottoms}
              params={params}
              setParams={setParams}
              type="bottoms"
            />
          )
        })}
      </SizeButtonContainer>
      <SizeButtonContainer>
        {letterSizes.map((size) => {
          return (
            <SizeButton
              key={size}
              size={size}
              items={currentBottoms}
              params={params}
              setParams={setParams}
              type="bottoms"
            />
          )
        })}
      </SizeButtonContainer>
    </Box>
  )
}

const SizeButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  left: -2px;
  position: relative;
`

const SizeButtonWrapper = styled.div<{ isActive: boolean }>`
  border: 1px solid ${(p) => (p.isActive ? color("black100") : color("black10"))};
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
