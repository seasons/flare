import { color } from "../../helpers"
import styled from "styled-components"
import { Button } from "./Button"
import { Flex, Spacer, Sans } from "../"
import { AppleSVG } from "../SVGs"

interface Props {
  block?: boolean
}

export const GetTheAppButton: React.FC<Props> = ({ block }) => {
  return (
    <GetAppWrapper block>
      <Button
        width={block ? "100%" : "auto"}
        onClick={() => window.open("https://testflight.apple.com/join/fpXqUY0v", "_blank")}
      >
        <Flex width="100%" justifyContent="center" flexDirection="row" alignContent="center">
          <AppleSVG width="17px" height="20px" />
          <Spacer mr={1} />
          <Sans size="4">Get the app</Sans>
        </Flex>
      </Button>
    </GetAppWrapper>
  )
}

const GetAppWrapper = styled("div")<{ block: boolean }>`
  width: ${(p) => (p.block ? "100%" : "auto")};
  &:hover {
    svg {
      .apple-fill {
        fill: ${color("black100")} !important;
      }
    }
  }
`
