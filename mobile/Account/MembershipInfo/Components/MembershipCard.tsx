import { Box, Flex, Sans } from "components"
import { SeasonsLogoIcon } from "components/Icons/SeasonsLogoIcon"
import { color } from "helpers/color"
import React from "react"
import styled from "styled-components"

export interface MembershipCardProps {
  memberName: string
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ memberName }) => {
  return (
    <Card p={3}>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <Flex flexDirection="row" justifyContent="flex-end">
          <SeasonsLogoIcon width="56px" height="56px" fill={color("white100")} />
        </Flex>
        <Box>
          <Sans color="black50" size="4">
            Membership card
          </Sans>
          <Box height={20}>
            <Sans color="white100" size="4">
              {memberName}
            </Sans>
          </Box>
        </Box>
      </Flex>
    </Card>
  )
}

const Card = styled(Box)`
  background-color: ${color("black100")};
  height: 200px;
  max-width: 345px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  shadow-color: ${color("black100")};
  shadow-opacity: 0.1;
  shadow-radius: 12;
`
