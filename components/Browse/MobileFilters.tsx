import styled from "styled-components"
import { color } from "../../helpers/color"
import { themeProps } from "lib/theme"
import { Box, Button, Spacer } from "components"
import { useState } from "react"

const MENU_HEIGHT = 59

export const MobileFilters: React.FC<{
  BrandsListComponent: React.ReactNode
  CategoriesListComponent: React.ReactNode
}> = ({ BrandsListComponent, CategoriesListComponent }) => {
  const [categoriesOpen, toggleCategoriesOpen] = useState(false)
  const [brandsOpen, toggleBrandsOpen] = useState(false)

  return (
    <HeaderContainer>
      <ButtonWrapper>
        <Button
          ml={2}
          width={"100%"}
          block
          variant={categoriesOpen ? "primaryBlack" : "primaryWhite"}
          onClick={() => {
            toggleCategoriesOpen(!categoriesOpen)
            toggleBrandsOpen(false)
          }}
        >
          Categories
        </Button>
        <Spacer mr={1} />
        <Button
          mr={2}
          width={"100%"}
          block
          variant={brandsOpen ? "primaryBlack" : "primaryWhite"}
          onClick={() => {
            toggleBrandsOpen(!brandsOpen)
            toggleCategoriesOpen(false)
          }}
        >
          Designers
        </Button>
      </ButtonWrapper>
      {brandsOpen && (
        <ListWrapper
          p={2}
          onClick={() => {
            toggleBrandsOpen(false)
            toggleCategoriesOpen(false)
          }}
        >
          {BrandsListComponent}
        </ListWrapper>
      )}
      {categoriesOpen && (
        <ListWrapper
          p={2}
          onClick={() => {
            toggleBrandsOpen(false)
            toggleCategoriesOpen(false)
          }}
        >
          {CategoriesListComponent}
        </ListWrapper>
      )}
    </HeaderContainer>
  )
}

const ListWrapper = styled(Box)`
  position: absolute;
  z-index: 1;
  width: 100%;
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
`

const ButtonWrapper = styled.div`
  padding-bottom: ${themeProps.space[2]}px;
  display: flex;
  position: fixed;
  background-color: ${color("white100")};
  width: 100%;
  z-index: 3;
  bottom: 0;
  left: 0;
  align-items: stretch;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  )
`

const HeaderContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  z-index: 2;
  width: 100%;
  top: ${MENU_HEIGHT}px;
  left: 0;
  background: ${color("white100")};
`
