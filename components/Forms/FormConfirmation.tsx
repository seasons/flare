import { CheckWithBackground } from "components/SVGs"
import { space } from "helpers"
import Link from "next/link"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"

import { Box, ExternalLink, Flex, Picture, Sans, Spacer } from "components"
import { Button } from "../Button/Button"
import { GetTheAppButton } from "../Button/GetTheApp"
import { FormFooter } from "./FormFooter"
import HeaderText from "./HeaderText"

interface FormConfirmationProps {
  status: "waitlisted" | "accountAccepted" | "giftPurchased"
  showCTAs?: boolean
}

export const FormConfirmation: React.FC<FormConfirmationProps> = ({ status, showCTAs = true }) => {
  let icon
  let headerText
  let bodyText
  let imageURL

  if (status === "waitlisted") {
    imageURL = require("../../public/images/waitlisted/waitlistImage.png")
    icon = <CheckWithBackground backgroundColor={"#000"} />
    headerText = "You're Waitlisted"
    bodyText = "We’ll let you know when your account is ready and you’re able to choose your plan."
  } else if (status === "giftPurchased") {
    imageURL = require("../../public/images/gift.jpg")
    icon = <CheckWithBackground backgroundColor={"#000"} />
    headerText = "Your gift was sent!"
    bodyText = "We’ll send a receipt for your purchase to your email."
  } else {
    imageURL = require("../../public/images/welcome/WelcomeImage.png")
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
      <Flex flex={1} style={{ height: "100%" }} flexDirection="row" alignItems="center">
        {!!imageURL && <ImageContainer url={imageResize(imageURL, "large")} />}
        <Flex flexDirection="column" justifyContent="center" pl={3}>
          {icon}
          <Spacer mb={3} />
          <HeaderText>{headerText}</HeaderText>
          <Spacer mb={1} />
          <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
            {bodyText}
          </Sans>
          <Spacer mb={3} />
          {showCTAs && (
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
          )}
        </Flex>
      </Flex>
      <FormFooter footerText={footerText} disabled={false} />
    </>
  )
}

const ImageContainer = styled(Box)<{ url?: string }>`
  width: 560px;
  height: 100%;
  background: url(${(p) => p.url}) no-repeat center center;
  background-size: contain;
  margin-right: ${space(3)}px;
`
