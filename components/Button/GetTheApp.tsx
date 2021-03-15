import styled from "styled-components"

import { Flex, Sans, Spacer, Box } from "components"
import { color } from "../../helpers"
import { AppleSVG } from "../SVGs"
import { Button } from "./Button"
import { Schema, useTracking } from "utils/analytics"

interface Props {
  block?: boolean
}

export const GetTheAppButton: React.FC<Props> = ({ block }) => {
  const tracking = useTracking()
  return (
    <GetAppWrapper block={block}>
      <Button
        variant="primaryWhite"
        width={block ? "100%" : "auto"}
        onClick={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.GetTheIOSAppTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          window.open("https://szns.co/app", "_blank")
        }}
      >
        <Flex width="100%" justifyContent="center" flexDirection="row" alignContent="center">
          <Box top="2px" style={{ position: "relative" }}>
            <AppleSVG width="17px" height="20px" />
          </Box>
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
        fill: ${color("white100")};
      }
    }
  }

  @media screen and (max-width: 767px) {
    &:hover {
      svg {
        .apple-fill {
          fill: ${color("black100")};
        }
      }
    }
  }
`
