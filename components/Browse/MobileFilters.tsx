import NextLink from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { color } from "../../helpers/color"
import { Sans } from "../Typography"
import { BoxProps, Box } from "../Box"
import { useState } from "react"
import { useSpring, animated } from "react-spring"
import { Spacer } from ".."

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
          active={categoriesOpen}
          onClick={() => {
            toggleCategoriesOpen(!categoriesOpen)
            toggleBrandsOpen(false)
          }}
        >
          Categories
        </Button>
        <Button
          style={{ borderLeft: `1px solid ${color("black10")}` }}
          active={brandsOpen}
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
          pt={60}
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
          pt={60}
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
  display: flex;
  height: 44px;
  position: fixed;
  background-color: ${color("white100")};
  width: 100%;
  z-index: 3;
  border-bottom: 1px solid ${color("black10")};
`

const Button = styled.div<{ active: boolean }>`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  color: ${(p) => (p.active ? color("white100") : color("black100"))};
  background-color: ${(p) => (p.active ? color("black85") : color("white100"))};
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
