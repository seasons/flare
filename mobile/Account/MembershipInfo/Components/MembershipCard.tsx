import { Box, Flex, Sans, Spacer } from "components"
import { SeasonsLogoIcon } from "components/Icons/SeasonsLogoIcon"
import { color } from "helpers/color"
import React from "react"
import { Text } from "react-native"
import styled from "styled-components"

export interface MembershipCardProps {
  memberName: string
  planTier: string
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ memberName, planTier }) => {
  let backgroundColor
  let planTierColor
  let planName
  switch (planTier) {
    case "Essential":
      backgroundColor = color("white100")
      planTierColor = color("black100")
      planName = "Monthly"
      break
  }

  if (!memberName || !planTier || !backgroundColor || !planTierColor) {
    return null
  }

  return (
    <Card backgroundColor={backgroundColor}>
      <Box px={3}>
        <Spacer mt={3} />
        <Flex flexDirection="column" justifyContent="space-between" pt={3}>
          <SeasonsLogoIcon width="35px" height="35px" fill={color("black100")}/>
          <Spacer mt={"104px"} />
          <Flex flexDirection="row" justifyContent="space-between">
            <Text style={{ letterSpacing: 2 }}>
              <Sans color={planTierColor} size="4">
                {planName}
              </Sans>
            </Text>
            <Sans color={color("black50")} size="4">
              {memberName}
            </Sans>
          </Flex>
        </Flex>
        <Spacer mt={3} />
      </Box>
    </Card>
  )
}

const Card = styled(Box)`
  background-color: ${(props: any) => props.backgroundColor};
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  shadow-color: ${color("black100")};
  shadow-opacity: 0.1;
  shadow-radius: 12;
`
