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
      text: "Between $100 - $200",
      value: [100, 200],
    },
    {
      text: "Over $200",
      value: [200, 1000000],
    },
  ]

  const renderOption = (option, i) => {
    return (
      <Box my={1}>
        <Flex
          onClick={() => {
            setParams({ ...params, priceRange: option.value })
            selectedOptions[i] = !selectedOptions[i]
            setSelectedOptions(selectedOptions)
          }}
        >
          <Checkbox isActive={selectedOptions[i]} size="default" />
          <Spacer ml={1} />
          <Sans size="2">{option.text}</Sans>
        </Flex>
      </Box>
    )
  }

  return <Box>{options.map((option, i) => renderOption(option, i))}</Box>
}
