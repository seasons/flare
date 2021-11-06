import { Box, Flex, Sans, Spacer } from "components"
import { ThinChevron } from "components/SVGs/ThinChevron"
import { color } from "helpers"
import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"

enum OrderBy {
  computedRentalPrice_ASC = "computedRentalPrice_ASC",
  computedRentalPrice_DESC = "computedRentalPrice_DESC",
  publishedAt_DESC = "publishedAt_DESC",
}

export const PRODUCT_SORTS = [
  { display: "New Arrivals", value: OrderBy.publishedAt_DESC },
  { display: "Price per month: High to low", value: OrderBy.computedRentalPrice_DESC },
  { display: "Price per month: Low to high", value: OrderBy.computedRentalPrice_ASC },
]

export const SortDropDown: React.FC<{ orderBy: OrderBy; onClickOrderBy: (value: OrderBy) => void }> = ({
  orderBy,
  onClickOrderBy,
}) => {
  const wrapperRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = (event) => {
    if (wrapperRef?.current && isOpen && !wrapperRef?.current?.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside, true)
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  })

  const currentOrderDisplay = PRODUCT_SORTS.find((sort) => sort.value === orderBy)

  if (!currentOrderDisplay) {
    return null
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Flex
        onClick={() => setIsOpen(!isOpen)}
        flexDirection="row"
        alignItems="center"
        flexWrap="nowrap"
        style={{ cursor: "pointer" }}
      >
        <Sans size="3">
          Sort by <span style={{ textDecoration: "underline" }}>{currentOrderDisplay.display}</span>
        </Sans>
        <Spacer pr={2} />
        <Flex width={14} alignItems="center">
          <ThinChevron width={7} color={color("black100")} rotateDeg={isOpen ? "-90deg" : "90deg"} />
        </Flex>
      </Flex>
      <DropDown px={2} pt={2} isOpen={isOpen}>
        {PRODUCT_SORTS.map((sortOption) => {
          const selected = sortOption.value === orderBy

          if (selected) {
            return null
          }

          return (
            <Box
              pb={2}
              onClick={() => {
                onClickOrderBy(sortOption.value)
                setIsOpen(false)
              }}
            >
              <StyledSans size="3" textAlign="right">
                {sortOption.display}
              </StyledSans>
            </Box>
          )
        })}
      </DropDown>
    </Wrapper>
  )
}

const StyledSans = styled(Sans)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Wrapper = styled(Flex)`
  position: relative;
`

const DropDown = styled(Box)<{ isOpen: boolean }>`
  position: absolute;
  top: 18px;
  right: 0;
  width: 210px;
  background-color: ${color("white100")};
  display: ${(p) => (p.isOpen ? "block" : "none")};
  z-index: 20;
`
