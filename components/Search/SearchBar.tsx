import { Flex } from "components"
import React from "react"
import { Configure, Index } from "react-instantsearch-dom"
import styled from "styled-components"
import { color as colorHelper } from "helpers/color"

import { Autocomplete } from "./Autocomplete"
import { SearchProvider } from "./SearchProvider"

interface SearchBarProps {
  handleSearch?: () => void
  color: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ handleSearch, color = colorHelper("black100") }) => {
  return (
    <SearchWrapper color={color}>
      <SearchProvider>
        <Configure hitsPerPage={3} />
        <Autocomplete />
        <Index indexName="product_staging" />
        <Index indexName="brand_staging" />
      </SearchProvider>
    </SearchWrapper>
  )
}

const SearchWrapper = styled.div<{ color: string }>`
  input {
    height: 48px;
    background-color: transparent;
    border: 1px solid ${(p) => p.color};
    border-radius: 8px;
    color: ${(p) => p.color};
    padding-left: 16px;
    padding-right: 16px;

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${(p) => p.color};
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${(p) => p.color};
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${(p) => p.color};
    }
  }
`
