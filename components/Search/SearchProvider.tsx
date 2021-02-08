import algoliasearch from "algoliasearch/lite"
import React from "react"
import { InstantSearch } from "react-instantsearch-dom"

export const searchClient = algoliasearch(process.env.ALGOLIA_ACCOUNT_ID!, process.env.ALGOLIA_KEY!)

interface SearchProviderProps {}

export const SearchProvider: React.FC<SearchProviderProps> = (props) => {
  const { children } = props

  return (
    <InstantSearch indexName="product_staging" searchClient={searchClient}>
      {children}
    </InstantSearch>
  )
}
