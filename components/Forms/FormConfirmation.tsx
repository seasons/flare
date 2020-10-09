import styled from "styled-components"

import { Box, ExternalLink, Flex, Sans, Spacer } from "../"
import { color } from "../../helpers"
import { Button } from "../Button/Button"
import { GetTheAppButton } from "../Button/GetTheApp"
import { InstagramSVG } from "../SVGs"
import { FormFooter } from "./FormsTemplate"
import HeaderText from "./HeaderText"

interface FormConfirmationProps {
  icon?: JSX.Element
  headerText: string
  bodyText: string
}

export const FormConfirmation: React.FC<FormConfirmationProps> = ({ icon, headerText, bodyText }) => {
  const footerText = (
    <>
      {"Have a question about Seasons or your application? Contact us at "}
      <ExternalLink href="mailto:membership@seasons.nyc?subject=Hello">membership@seasons.nyc</ExternalLink>
      {"."}
    </>
  )
  return (
    <>
      <Wrapper px={[2, 2, 2, 5, 5]}>
        {icon}
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
                <Box pt="3px">
                  <InstagramSVG />
                </Box>
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
