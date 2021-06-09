import { Sans, Spacer, Box, Flex } from "components"
import { Checkbox } from "components/Checkbox"
import styled from "styled-components"
import { SizeFilterParams } from "pages/browse/[Filter]"
import { color } from "helpers/color"

interface Props {
  setParams: (params: SizeFilterParams) => void
  params: SizeFilterParams
}

const POSITION_TOP = 59

export const FixedFilters: React.FC<Props> = ({ setParams, params }) => {
  const availableOnly = params?.availableOnly
  const forSaleOnly = params?.forSaleOnly
  return (
    <>
      <Spacer mb={46} />
      <FixedWrapper pt={1} pb={2} px={2}>
        <FlexWrapper>
          <FlexWrapper
            onClick={() => {
              setParams({ ...params, availableOnly: !availableOnly })
            }}
          >
            <Checkbox isActive={availableOnly} size="small" />
            <Spacer ml={1} />
            <Sans size="2">Available now</Sans>
          </FlexWrapper>
          <Spacer mr={4} />
          <FlexWrapper
            onClick={() => {
              setParams({ ...params, forSaleOnly: !forSaleOnly })
            }}
          >
            <Checkbox isActive={forSaleOnly} size="small" />
            <Spacer ml={1} />
            <Sans size="2">For sale</Sans>
          </FlexWrapper>
        </FlexWrapper>
      </FixedWrapper>
    </>
  )
}

const FlexWrapper = styled(Flex)`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const FixedWrapper = styled(Box)`
  position: fixed;
  top: ${POSITION_TOP}px;
  left: 0;
  width: 100%;
  z-index: 3000;
  background-color: ${color("white100")};
`
