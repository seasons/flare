import { color } from "../../helpers"
import styled from "styled-components"
import { Button } from "./Button"
import { Flex, Spacer, Sans, ExternalLink } from "../"
import { AppleSVG } from "../SVGs"

export const GetTheAppButton = () => {
  return (
    <GetAppWrapper>
      <ExternalLink href="https://testflight.apple.com/join/fpXqUY0v">
        <Button>
          <Flex flexDirection="row" alignContent="center">
            <AppleSVG width="17px" height="20px" />
            <Spacer mr={1} />
            <Sans size="3">Get the app</Sans>
          </Flex>
        </Button>
      </ExternalLink>
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
