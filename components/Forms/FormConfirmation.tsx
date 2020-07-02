import { Sans, Box, Spacer, Flex, ExternalLink } from "../"
import { Button } from "../Button/Button"
import { InstagramSVG, CheckSVG } from "../SVGs"
import { FormFooter } from "./FormsTemplate"
import HeaderText from "./HeaderText"
import styled from "styled-components"
import { color } from "../../helpers"
import { GetTheAppButton } from "../Button/GetTheApp"

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
          <GetTheAppButton />
          <Spacer mr={1} />
          <IGWrapper>
            <Button
              variant="primaryWhite"
              onClick={() => window.open("https://www.instagram.com/seasons.ny/", "_blank")}
            >
              <Flex flexDirection="row" alignContent="center">
                <InstagramSVG />
                <Spacer mr={1} />
                <Sans size="4">Follow us</Sans>
              </Flex>
            </Button>
          </IGWrapper>
        </Flex>
      </Wrapper>
      <FormFooter footerText={footerText} disabled={false} />
    </>
  )
}

const Wrapper = styled(Box)`
  transform: translateY(-50%);
  top: 50%;
  position: absolute;
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
