import styled from "styled-components"

import { Flex, Sans, Spacer } from "../"
import { color } from "../../helpers"
import { themeProps } from "../../lib/theme"
import { AppleSVG } from "../SVGs"
import { Button } from "./Button"

interface Props {
  block?: boolean
}

export const GetTheAppButton: React.FC<Props> = ({ block }) => {
  return (
    <GetAppWrapper block={block}>
      <Button width={block ? "100%" : "auto"} onClick={() => window.open("https://szns.co/app", "_blank")}>
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
        fill: ${color("black100")};
      }
    }
  }

  @media screen and (max-width: 767px) {
    &:hover {
      svg {
        .apple-fill {
          fill: ${color("white100")};
        }
      }
    }
  }
`
