import React from "react"
import { Flex, Sans, Spacer, Box } from "../../../components"
import styled from "styled-components"
import { color } from "../../../helpers"

type MembershipType = "essential" | "allAccess"

export const MembershipCard: React.FC<{ type: MembershipType }> = ({ type }) => {
  let planInfo = null

  if (type === "essential") {
    planInfo = {
      planName: "Essential",
      price: "155",
      boldText: "1 Swap",
      subText: "3 items per month",
      text: "A wardrobe refresh to make getting dressed more exciting.",
    }
  } else if (type === "allAccess") {
    planInfo = {
      planName: "All Access",
      price: "195",
      boldText: "Unlimited Swaps",
      subText: "3 items at a time",
      text: "Experience that new-clothes feeling every single week.",
    }
  }
  return (
    <Container px={0.5}>
      <Border>
        <Flex>
          <Flex
            style={{ flex: 2, borderRight: `1px solid ${color("black15")}`, minHeight: "430px" }}
            alignItems="center"
            justifyContent="center"
          >
            <Flex style={{ height: "100%" }} p={5} flexDirection="column" justifyContent="space-between">
              <Sans size="6">{planInfo.planName}</Sans>
              <Box>
                <Sans size="6">{planInfo.boldText}</Sans>
                <Sans size="3" color="black50">
                  {planInfo.subText}
                </Sans>
                <Spacer mb={3} />
                <Sans size="3" color="black50">
                  {planInfo.text}
                </Sans>
              </Box>
            </Flex>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="column">
            <Flex flexDirection="column" style={{ flex: 1 }} alignItems="center" justifyContent="center">
              <Box>
                <Sans size="10">${planInfo.price}</Sans>
              </Box>
              <Sans size="4" color="black50">
                per \ month
              </Sans>
            </Flex>
            <SelectButton justifyContent="center" py="2">
              <StyledAnchor href="http://signup.seasons.nyc/">
                <Sans size="5" style={{ textDecoration: "underline" }}>
                  Select
                </Sans>
              </StyledAnchor>
            </SelectButton>
          </Flex>
        </Flex>
      </Border>
    </Container>
  )
}

const StyledAnchor = styled("a")`
  color: inherit;
  &:hover,
  &:focus {
    background-color: transparent !important;
  }
`

const Container = styled(Box)`
  width: 100%;
`

const Border = styled("div")`
  width: 100%;
  border: 1px solid ${color("black15")};
`

const SelectButton = styled(Flex)`
  width: 100%;
`
