import { Box, Flex, Sans, Spacer } from "components"
import { Checkbox } from "components/Checkbox"
import React, { useState } from "react"

export const PriceFilters = ({ setParams, params }) => {
  const [selectedOptions, setSelectedOptions] = useState([])

  const options = [
    {
      text: "Under $100",
      value: [0, 100],
    },
    {
      text: "$100 - $250",
      value: [100, 250],
    },
    {
      text: "$250 - $500",
      value: [200, 500],
    },
    {
      text: "Over $500",
      value: [500, 100000000],
    },
  ]

  const renderOption = (option, i) => {
    return (
      <>
        <Box my={1}>
          <Flex
            onClick={() => {
              setParams({ ...params, priceRange: option.value })
              selectedOptions[i] = !selectedOptions[i]
              setSelectedOptions(selectedOptions)
            }}
            alignItems="center"
          >
            <Checkbox isActive={selectedOptions[i]} size="default" />
            <Spacer ml={1} />
            <Sans size="3">{option.text}</Sans>
          </Flex>
        </Box>
      </>
    )
  }

  return (
    <Box>
      <Sans size="3">Purchase price</Sans>
      {options.map((option, i) => renderOption(option, i))}
    </Box>
  )
}
