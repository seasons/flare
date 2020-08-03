import { Sans, Box, Flex, Spacer, MaxWidth } from "../"
import { color } from "../../helpers"
import { Link } from "../Link"
import styled from "styled-components"

export const Footer = () => {
  return (
    <Wrapper>
      <Flex px={2} py={[1, 0]} style={{ width: "100%" }} justifyContent={["flex-start", "center"]}>
        <Flex
          flexDirection={["column", "row"]}
          py={2}
          width="100%"
          style={{ flex: 1 }}
          justifyContent={["flex-start", "space-between"]}
        >
          <Link href="/terms-of-service">
            <Sans size={["2", "4"]} color={color("black50")} pt="0.5" pr="3">
              Terms of Service
            </Sans>
          </Link>
          <Spacer mb={[1, 0]} mr={[0, 2]} />
          <Link href="/privacy-policy">
            <Sans size={["2", "4"]} color={color("black50")} pt="0.5" pr="3">
              Privacy Policy
            </Sans>
          </Link>
          <Spacer mb={[1, 0]} />
          <Box ml={[0, "auto"]}>
            <Sans size={["2", "4"]} color={color("black50")} pt="0.5">
              (c) 2020 Seasons. All Rights Reserved.
            </Sans>
          </Box>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: ${color("white100")};
`
