import { CheckWithBackground } from "components/SVGs"
import Link from "next/link"
import styled from "styled-components"

import { Box, ExternalLink, Flex, Sans, Spacer } from "../"
import { Button } from "../Button/Button"
import { GetTheAppButton } from "../Button/GetTheApp"
import { FormFooter } from "./FormFooter"
import HeaderText from "./HeaderText"

interface FormConfirmationProps {
  status: "waitlisted" | "accountAccepted"
}

export const FormConfirmation: React.FC<FormConfirmationProps> = ({ status }) => {
  let icon
  let headerText
  let bodyText

  if (status === "waitlisted") {
    icon = <CheckWithBackground backgroundColor={"#000"} />
    headerText = "You're Waitlisted"
    bodyText = "We’ll let you know when your account is ready and you’re able to choose your plan."
  } else {
    icon = <CheckWithBackground />
    headerText = "Welcome to Seasons"
    bodyText = "Your membership is active and you’re ready to start reserving. Tap below to start browsing."
  }

  const footerText = (
    <>
      {"Have a question about Seasons or your application? Contact us at "}
      <ExternalLink href="mailto:membership@seasons.nyc?subject=Hello">membership@seasons.nyc</ExternalLink>
      {"."}
    </>
  )
  return (
    <>
      <Wrapper px={[2, 2, 2, 5, 5]} style={{ width: "100%" }}>
        {icon}
        <Spacer mb={3} />
        <HeaderText>{headerText}</HeaderText>
        <Spacer mb={1} />
        <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
          {bodyText}
        </Sans>
        <Spacer mb={3} />
        <Flex flexDirection="row">
          <Link href="/browse">
            <Button variant="primaryBlack">
              <Flex flexDirection="row" alignContent="center">
                <Sans size="4">Start Browsing</Sans>
              </Flex>
            </Button>
          </Link>
          <Spacer mr={1} />
          <GetTheAppButton />
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
