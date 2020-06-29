import { Sans, Box, Spacer, Flex } from "../"
import { Button } from "../Button/Button"
import { AppleSVG, InstagramSVG, CheckSVG } from "../SVGs"
import { FormFooter } from "./FormsTemplate"
import HeaderText from "./HeaderText"
import ExternalLink from "../ExternalLink"
import styled from "styled-components"
import { color } from "../../helpers"

export const FormConfirmation: React.FC<{ headerText: string; bodyText: string }> = ({ headerText, bodyText }) => {
  const footerText = (
    <>
      {"Have a question about Seasons or your application? Contact us at "}
      <ExternalLink href="mailto:membership@seasons.nyc?subject=Hello">membership@seasons.nyc</ExternalLink>
      {"."}
    </>
  )
  return (
    <>
      <Wrapper px={2}>
        <CheckSVG />
        <Spacer mb={3} />
        <HeaderText>{headerText}</HeaderText>
        <Spacer mb={1} />
        <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
          {bodyText}
        </Sans>
        <Spacer mb={3} />
        <Flex flexDirection="row">
          <AppleWrapper>
            <ExternalLink href="https://testflight.apple.com/join/fpXqUY0v">
              <Button>
                <Flex flexDirection="row" alignContent="center">
                  <AppleSVG width="17px" height="20px" />
                  <Spacer mr={1} />
                  <Sans size="3">Get the app</Sans>
                </Flex>
              </Button>
            </ExternalLink>
          </AppleWrapper>
          <Spacer mr={1} />
          <IGWrapper>
            <ExternalLink href="https://www.instagram.com/seasons.ny">
              <Button variant="primaryWhite">
                <Flex flexDirection="row" alignContent="center">
                  <InstagramSVG />
                  <Spacer mr={1} />
                  <Sans size="3">Follow us</Sans>
                </Flex>
              </Button>
            </ExternalLink>
          </IGWrapper>
        </Flex>
      </Wrapper>
      <FormFooter handleSubmit={null} isSubmitting={null} footerText={footerText} disabled={false} />
    </>
  )
}

const Wrapper = styled(Box)`
  transform: translateY(-50%);
  top: 50%;
  position: absolute;
`

const AppleWrapper = styled("div")`
  &:hover {
    svg {
      .apple-fill {
        fill: ${color("black100")} !important;
      }
    }
  }
`

const IGWrapper = styled("div")`
  &:hover {
    svg {
      .ig-stroke {
        stroke: ${color("white100")} !important;
      }
      .ig-fill {
        fill: ${color("white100")} !important;
      }
    }
  }
`
