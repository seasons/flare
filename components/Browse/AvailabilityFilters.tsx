import { Box } from "components/Box"
import { Checkbox } from "components/Checkbox"
import { Spacer } from "components/Spacer"
import { Sans } from "components/Typography"
import { color } from "helpers"
import React from "react"
import styled from "styled-components"

export const AvailabilityFilters = ({ setParams, params, breakpoint }) => {
  const isMobile = breakpoint === "mobile"
  const { available, forSaleOnly } = params

  const Content = () => (
    <>
      <FlexWrapper mb={isMobile ? 0 : 2}>
        <Checkbox
          onClick={() => {
            setParams({ ...params, available: !available })
          }}
          isActive={available}
        />
        <Spacer ml={1} />
        <Sans size="3">Available now</Sans>
      </FlexWrapper>
      <Spacer mb={isMobile ? 0 : 2} pr={isMobile ? 2 : 0} />
      <FlexWrapper mb={isMobile ? 0 : 5}>
        <Checkbox
          onClick={() => {
            setParams({ ...params, forSaleOnly: !forSaleOnly })
          }}
          isActive={forSaleOnly}
        />
        <Spacer ml={1} />
        <Sans size="3">For sale</Sans>
      </FlexWrapper>
    </>
  )

  return (
    <>
      {isMobile ? (
        <>
          <Spacer mb={46} />
          <FixedWrapper pt={1} pb={2} px={2}>
            <FlexWrapper>
              <Content />
            </FlexWrapper>
          </FixedWrapper>
        </>
      ) : (
        <Box style={{ maxWidth: "148px" }}>
          <Sans size="3">Filter by</Sans>
          <Spacer mb={[0, 2]} />
          <Content />
        </Box>
      )}
    </>
  )
}

const FlexWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const FixedWrapper = styled(Box)`
  position: fixed;
  top: 58px;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: ${color("white100")};
`
