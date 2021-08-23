import styled from "styled-components"
import { Flex, Sans, Spacer, Box } from "components"
import { color } from "../../helpers"
import { AppleSVG } from "../SVGs"
import { Button } from "./Button"
import { Schema, useTracking } from "utils/analytics"
import { ButtonVariant } from "./Button.shared"

interface Props {
  block?: boolean
  width?: string
  variant?: ButtonVariant
}

export const GetTheAppButton: React.FC<Props> = ({ block, width, variant }) => {
  const tracking = useTracking()
  let _width
  if (width) {
    _width = width
  } else if (block) {
    _width = "100%"
  } else {
    _width = "auto"
  }
  return (
    <GetAppWrapper block={block}>
      <Button
        variant={variant ? variant : "primaryWhite"}
        width={_width}
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
