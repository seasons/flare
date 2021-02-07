import { color } from "helpers"
import { useRouter } from "next/router"
import React, { useState } from "react"
import AutoSuggest from "react-autosuggest"
import { connectAutoComplete, Highlight } from "react-instantsearch-dom"
import styled from "styled-components"

import theme from "./Autocomplete.module.css"

const CustomHighlight = styled(Highlight)`
  .ais-Highlight-highlighted {
    background-color: ${color("black10")};
    text-decoration: none;
  }
`

export const Autocomplete = connectAutoComplete(({ hits, refine }) => {
  const router = useRouter()
  const query = router.query?.q as string

  const [value, setValue] = useState(query || "")

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const inputProps = {
    placeholder: "Search...",
    onChange: onChange,
    value,
  }

  return (
    <AutoSuggest
      theme={theme}
      suggestions={hits}
      multiSection={true}
      onSuggestionsFetchRequested={({ value }) => refine(value)}
      onSuggestionsClearRequested={() => refine()}
      onSuggestionSelected={(e, suggestion) => {
        console.log(suggestion)
        router.push(`/search?q=${suggestion.suggestionValue}`)
      }}
      getSuggestionValue={(hit) => hit.name}
      renderSuggestion={(hit) => <CustomHighlight attribute="name" hit={hit} tagName="mark" />}
      inputProps={inputProps}
      renderSectionTitle={(section) => {
        if (section.index.includes("product")) {
          return "Products"
        } else if (section.index.includes("brand")) {
          return "Brands"
        }
      }}
      getSectionSuggestions={(section) => section.hits}
    />
  )
})
