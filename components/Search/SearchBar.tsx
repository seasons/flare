import React from "react"
import { Configure, Index } from "react-instantsearch-dom"

import { Box } from "@material-ui/core"

import { Autocomplete } from "./Autocomplete"
import { SearchProvider } from "./SearchProvider"

interface SearchBarProps {
  handleSearch?: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return (
    <Box display="flex" flexDirection="row">
      <SearchProvider>
        <Configure hitsPerPage={3} />
        <Autocomplete />
        <Index indexName="product_staging" />
        <Index indexName="brand_staging" />
      </SearchProvider>
    </Box>
  )
}
