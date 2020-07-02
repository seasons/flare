import { color } from "../../helpers"
import styled from "styled-components"
import { Button } from "./Button"
import { Flex, Spacer, Sans } from "../"
import { AppleSVG } from "../SVGs"

export const GetTheAppButton = () => {
  return (
    <GetAppWrapper>
      <Button onClick={() => window.open("https://testflight.apple.com/join/fpXqUY0v", "_blank")}>
        <Flex flexDirection="row" alignContent="center">
          <AppleSVG width="17px" height="20px" />
          <Spacer mr={1} />
          <Sans size="4">Get the app</Sans>
        </Flex>
      </Button>
    </GetAppWrapper>
  )
}

const GetAppWrapper = styled("div")`
  &:hover {
    svg {
      .apple-fill {
        fill: ${color("black100")} !important;
      }
    }
  }
`
