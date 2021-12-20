import { Box } from "components/Box"
import { color } from "../../helpers"
import styled from "styled-components"
import React from "react"
import { FilterParams } from "pages/browse/[Filter]"
import { Sans, Spacer } from "../../components"

interface Props {
  setParams: (params: FilterParams) => void
  params: FilterParams
}

interface SizeButtonProps {
  size: string
  items: string[]
  setParams: (params: FilterParams) => void
  params: FilterParams
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
          setParams({ ...params, bottoms: newParamsArray })
        } else {
          setParams({ ...params, tops: newParamsArray })
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

  const { tops, bottoms } = params

  return (
    <Box style={{ maxWidth: "148px" }}>
      <Sans size="3">Tops</Sans>
      <SizeButtonContainer>
        {letterSizes.map((size) => {
          return <SizeButton key={size} size={size} items={tops} params={params} setParams={setParams} type="tops" />
        })}
      </SizeButtonContainer>
      <Spacer mb={5} />
      <Sans size="3">Bottoms</Sans>
      <SizeButtonContainer>
        {[...letterSizes, ...waistSizes]
          .filter((i) => i !== "XXL")
          .map((size) => {
            return (
              <SizeButton key={size} size={size} items={bottoms} params={params} setParams={setParams} type="bottoms" />
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
  max-width: 148px;
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
