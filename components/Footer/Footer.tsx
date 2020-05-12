import { Sans, Box, Flex, Spacer } from "../"
import { color } from "../../helpers"
import { Link } from "../Link"
import styled from "styled-components"

export const Footer = () => {
  return (
    <Wrapper>
      <Flex
        px={2}
        pb={[1, 0]}
        style={{ borderTop: `1px solid ${color("black10")}`, width: "100%" }}
        justifyContent={["flex-start", "center"]}
      >
        <Flex
          flexDirection={["column", "row"]}
          py={2}
          px={0.5}
          style={{ maxWidth: "1200px", flex: 1 }}
          justifyContent={["flex-start", "space-between"]}
        >
          <Link href="/terms-of-service">
            <Sans size="4" color={color("black50")} pt="0.5" pr="3">
              Terms of Service
            </Sans>
          </Link>
          <Spacer mb={[1, 0]} mr={[0, 2]} />
          <Link href="/privacy-policy">
            <Sans size="4" color={color("black50")} pt="0.5" pr="3">
              Privacy Policy
            </Sans>
          </Link>
          <Spacer mb={[1, 0]} />
          <Box ml={[0, "auto"]}>
            <Sans size="4" color={color("black50")} pt="0.5">
              (c) 2020 Seasons. All Rights Reserved.
            </Sans>
          </Box>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`
