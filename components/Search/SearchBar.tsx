import React from "react"
import { Configure, Index } from "react-instantsearch-dom"
import styled from "styled-components"
import { color as colorHelper } from "helpers/color"

import { Autocomplete } from "./Autocomplete"
import { SearchProvider } from "./SearchProvider"
import { GLOBAL_TRANSITION } from "lib/theme"

interface SearchBarProps {
  handleSearch?: () => void
  color?: string
  breakPoint?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ breakPoint, handleSearch, color = colorHelper("black100") }) => {
  const isLarge = breakPoint === "large"

  return (
    <SearchWrapper color={color} isLarge={isLarge}>
      <SearchProvider>
        <Configure hitsPerPage={3} />
        <Autocomplete />
        <Index indexName="product_staging" />
        <Index indexName="brand_staging" />
      </SearchProvider>
    </SearchWrapper>
  )
}

const SearchWrapper = styled.div<{ color: string; isLarge: boolean }>`
  width: ${(p) => (p.isLarge ? "300px" : "210px")};
  input {
    width: ${(p) => (p.isLarge ? "300px" : "210px")};
    height: 40px;
    background-color: ${colorHelper("black04")};
    border-radius: 8px;
    color: ${(p) => p.color};
    padding-left: 16px;
    padding-right: 16px;
    transition: color ${GLOBAL_TRANSITION};
    border: none !important;

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${(p) => p.color};
      opacity: 1; /* Firefox */
      font-size: 14px;
      transition: color ${GLOBAL_TRANSITION};
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      font-size: 14px;
      color: ${(p) => p.color};
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      font-size: 14px;
      color: ${(p) => p.color};
    }
  }
`
