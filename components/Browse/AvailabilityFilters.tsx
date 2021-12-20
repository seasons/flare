import { Box } from "components/Box"
import { Checkbox } from "components/Checkbox"
import { Spacer } from "components/Spacer"
import { Sans } from "components/Typography"
import React from "react"
import styled from "styled-components"

export const AvailabilityFilters = ({ setParams, params }) => {
  const { availableOnly, forSaleOnly } = params

  return (
    <Box>
      <Sans size="3">Filter by</Sans>
      <Spacer mb={[0, 2]} />
      <FlexWrapper mb={2}>
        <Checkbox
          onClick={() => {
            setParams({ ...params, availableOnly: !availableOnly })
          }}
          isActive={availableOnly}
        />
        <Spacer ml={1} />
        <Sans size="3">Available now</Sans>
      </FlexWrapper>
      <Spacer mb={[0, 2]} />
      <FlexWrapper mb={5}>
        <Checkbox
          onClick={() => {
            setParams({ ...params, forSaleOnly: !forSaleOnly })
          }}
          isActive={forSaleOnly}
        />
        <Spacer ml={1} />
        <Sans size="3">For sale</Sans>
      </FlexWrapper>
    </Box>
  )
}

const FlexWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: row;
`
