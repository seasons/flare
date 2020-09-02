import React from "react"
import { Flex, Sans, Spacer, Box } from "../"
import styled from "styled-components"
import { color } from "../../helpers"
import { Link } from "../Link"

type MembershipType = "essential" | "allAccess"

export const MembershipCard: React.FC<{ type: MembershipType; maxWidth?: string }> = ({ type, maxWidth }) => {
  let planInfo = null

  if (type === "essential") {
    planInfo = {
      planName: "Essential",
      price: "125",
      boldText: "1 Swap",
      subText: "3 items per month",
      text: "A monthly wardrobe refresh to make weekends more exciting.",
    }
  } else if (type === "allAccess") {
    planInfo = {
      planName: "All Access",
      price: "175",
      boldText: "Unlimited Swaps",
      subText: "3 items at a time",
      text: "Experience that new-clothes feeling every week.",
    }
  }

  return (
    <Container>
      <Border>
        <Flex>
          <Flex
            style={{ flex: 2, borderRight: `1px solid ${color("black15")}`, minHeight: "480px" }}
            alignItems="center"
            justifyContent="center"
          >
            <Flex style={{ height: "100%" }} p={[3, 5]} flexDirection="column" justifyContent="space-between">
              <Sans size="6">{planInfo.planName}</Sans>
              <Box>
                <Sans size="6">{planInfo.boldText}</Sans>
                <Sans size="4" color="black50">
                  {planInfo.subText}
                </Sans>
                <Spacer mb={3} />
                <Sans size="4" color="black50" style={{ maxWidth: maxWidth ?? "auto" }}>
                  {planInfo.text}
                </Sans>
              </Box>
            </Flex>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="column">
            <Flex flexDirection="column" style={{ flex: 1 }} alignItems="center" justifyContent="center">
              <Box>
                <Sans size="11">${planInfo.price}</Sans>
              </Box>
              <Sans size="4" color="black50">
                per \ month
              </Sans>
            </Flex>
            <SelectButton justifyContent="center" py="4">
              <Link href="/signup">
                <Sans size="4" style={{ textDecoration: "underline" }}>
                  Sign up
                </Sans>
              </Link>
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
  border-top: 1px solid ${color("black15")};
  width: 100%;
`
