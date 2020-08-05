import { Sans, Box, Flex, Spacer } from "../"
import { color } from "../../helpers"
import { Link } from "../Link"
import styled from "styled-components"

export const Footer: React.FC<{ footerBottomPadding?: string | string[] }> = ({ footerBottomPadding }) => {
  return (
    <Wrapper pb={footerBottomPadding ?? 0}>
      <Flex px={[2, 4]} py={[1, 0]} style={{ width: "100%" }} justifyContent={["flex-start", "flex-start", "center"]}>
        <Flex
          flexDirection={["column", "column", "row"]}
          py={2}
          width="100%"
          style={{ flex: 1 }}
          justifyContent={["flex-start", "flex-start", "space-between"]}
        >
          <Link href="/terms-of-service">
            <Sans size={["2", "3"]} color={color("black50")} pt="0.5" pr="3">
              Terms of Service
            </Sans>
          </Link>
          <Spacer mb={[1, 2, 0]} mr={[0, 3]} />
          <Link href="/privacy-policy">
            <Sans size={["2", "3"]} color={color("black50")} pt="0.5" pr="3">
              Privacy Policy
            </Sans>
          </Link>
          <Spacer mb={[1, 2, 0]} />
          <Box ml={[0, 0, "auto"]}>
            <Flex flexDirection={["column", "column", "row"]}>
              <a href="https://www.instagram.com/seasons.ny/" target="_blank" style={{ textDecoration: "none" }}>
                <Sans size={["2", "3"]} color={color("black50")} pt="0.5" pr="3">
                  Instagram
                </Sans>
              </a>
              <Spacer mb={[1, 2, 0]} mr={[0, 3]} />
              <Link href="/about">
                <Sans size={["2", "3"]} color={color("black50")} pt="0.5" pr="3">
                  About
                </Sans>
              </Link>
              <Spacer mb={[1, 2, 0]} mr={[0, 3]} />
              <Sans size={["2", "3"]} color={color("black50")} pt="0.5">
                © 2020 Seasons. All Rights Reserved.
              </Sans>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: relative;
  width: 100%;
  background-color: ${color("white100")};
`
