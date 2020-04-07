import React from "react"
import { Flex, Sans, Spacer, Box } from "../../../components"
import styled from "styled-components"
import { color, space } from "../../../helpers"
import { Link } from "../../../components/Link"

type MembershipType = "essential" | "allAccess"

export const MembershipCard: React.FC<{ type: MembershipType }> = ({ type }) => {
  let planInfo = null

  if (type === "essential") {
    planInfo = {
      planName: "Essential",
      price: "155",
      whatsIncluded: [
        "3 items for the month",
        "Over 50 curated brands",
        "Free returns & dry cleaning",
        "Pause or cancel anytime.",
      ],
    }
  } else if (type === "allAccess") {
    planInfo = {
      planName: "All Access",
      price: "195",
      whatsIncluded: [
        "3 pieces at a time",
        "Unlimited swaps",
        "Over 50 curated brands",
        "Free returns & dry cleaning",
        "Pause or cancel anytime.",
      ],
    }
  }
  return (
    <Container membershipType={type}>
      <Border>
        <Flex justifyContent="center" py="2" style={{ borderBottom: `1px solid ${color("black100")}` }}>
          <Sans size="5" style={{ textTransform: "uppercase" }}>
            {planInfo.planName}
          </Sans>
        </Flex>
        <Flex>
          <Flex
            style={{ flex: 2, borderRight: `1px solid ${color("black100")}`, minHeight: "300px" }}
            alignItems="center"
            justifyContent="center"
          >
            <Flex py={2} flexDirection="column" alignItems="center" justifyContent="center">
              {planInfo?.whatsIncluded.map((text, index) => {
                return (
                  <Sans key={index} size="3" style={{ textAlign: "center" }}>
                    {text}
                  </Sans>
                )
              })}
            </Flex>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="column">
            <Flex flexDirection="column" style={{ flex: 1 }} alignItems="center" justifyContent="center">
              <Box>
                <Sans size="5" style={{ display: "inline" }}>
                  ${" "}
                </Sans>
                <Sans size="8" style={{ display: "inline" }}>
                  {planInfo.price}
                </Sans>
              </Box>
              <Sans size="4" color="black50">
                / month
              </Sans>
            </Flex>
            <Link href="http://signup.seasons.nyc/">
              <SelectButton justifyContent="center" py="2">
                <Sans size="5">Select</Sans>
              </SelectButton>
            </Link>
          </Flex>
        </Flex>
      </Border>
    </Container>
  )
}

const Container = styled("div")<{ membershipType: MembershipType }>`
  width: 100%;
  padding-right: ${(p) => (p.membershipType === "essential" ? space(1) : 0)}px;
  padding-left: ${(p) => (p.membershipType === "essential" ? 0 : space(1))}px;
`

const Border = styled("div")`
  width: 100%;
  border: 1px solid ${color("black100")};
`

const SelectButton = styled(Flex)`
  border-top: 1px solid ${color("black100")};
  width: 100%;
  &:hover {
    background-color: ${color("black15")};
  }
`
