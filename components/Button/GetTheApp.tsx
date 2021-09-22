import styled from "styled-components"
import { Flex, Sans, Spacer, Box } from "components"
import { color } from "../../helpers"
import { AppleSVG } from "../SVGs"
import { Button } from "./Button"
import { Schema, useTracking } from "utils/analytics"
import { ButtonSize, ButtonVariant } from "./Button.shared"
import { GLOBAL_TRANSITION } from "lib/theme"

interface Props {
  block?: boolean
  width?: string
  variant?: ButtonVariant
  size?: ButtonSize
}

export const GetTheAppButton: React.FC<Props> = ({ block, width, variant, size = "medium" }) => {
  const tracking = useTracking()
  let _width
  if (width) {
    _width = width
  } else if (block) {
    _width = "100%"
  } else {
    _width = "auto"
  }

  const getSizeFontSize = () => {
    switch (size) {
      case "small":
        return 3
      case "medium-x":
        return 3
      case "medium":
        return 4
      case "large":
        return 4
    }
  }

  return (
    <GetAppWrapper block={block}>
      <Button
        variant={variant ? variant : "primaryWhite"}
        width={_width}
        size={size}
        onClick={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.GetTheIOSAppTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          window.open("https://szns.co/app", "_blank")
        }}
      >
        <Flex width="100%" justifyContent="center" flexDirection="row" alignItems="center">
          <Box top="1px" style={{ position: "relative" }}>
            <AppleSVG width="14px" height="16px" />
          </Box>
          <Spacer mr={1} />
          <Sans size={getSizeFontSize()}>Get the app</Sans>
        </Flex>
      </Button>
    </GetAppWrapper>
  )
}

const GetAppWrapper = styled("div")<{ block: boolean }>`
  width: ${(p) => (p.block ? "100%" : "auto")};
  svg {
    path {
      transition: fill ${GLOBAL_TRANSITION};
    }
  }
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
