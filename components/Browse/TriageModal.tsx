import { Modal, Fade, styled as MuiStyled } from "@material-ui/core"
import React from "react"
import { Box, Spacer, Sans, Flex, Button } from "components"
import { Schema, useTracking } from "utils/analytics"
import { AppleSVG, InstagramSVG } from "components/SVGs"
import styled from "styled-components"
import { color } from "helpers"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { imageResize } from "utils/imageResize"
import { CloseXIcon } from "components/Icons/CloseXIcon"
import { DisordSVG } from "components/SVGs/DiscordSVG"

export const TriageModal: React.FC<{ onClose: () => void; show: boolean; type: "approved" | "waitlisted" }> = ({
  onClose,
  show,
  type,
}) => {
  const { openDrawer } = useDrawerContext()
  const tracking = useTracking()
  let headerText
  let subText
  let breakText
  let imageURL

  const isApprovedView = type === "approved"

  const welcomeImage = require("../../public/images/signup/WelcomeImage.jpg")
  const waitlistImage = require("../../public/images/signup/WaitlistImage.jpg")

  if (isApprovedView) {
    headerText = "Welcome to Seasons"
    subText =
      "Your membership is now active and you’re ready to start reserving. Here are some helpful links to get started:"
    breakText = "Join the conversation"
    imageURL = welcomeImage
  } else {
    headerText = "You’re on the waitlist"
    subText =
      "We’re not accepting new members at the moment. If more spots open, you’ll be the first to know. Until then:"
    breakText = "Have a question?"
    imageURL = waitlistImage
  }

  return (
    <Modal open={show} onClose={onClose}>
      <Fade in={show}>
        <Container>
          {!!imageURL && <ImageContainer url={imageResize(imageURL, "large")} />}
          <Flex p={5} pt={7} style={{ flex: 1, flexDirection: "column", position: "relative", maxWidth: "480px" }}>
            <CloseWrapper>
              <Box onClick={onClose}>
                <CloseXIcon variant="light" />
              </Box>
            </CloseWrapper>
            <Spacer pb={4} />
            <Sans size="8">{headerText}</Sans>
            <Spacer mb={1} />
            <Sans size="4" color="black50">
              {subText}
            </Sans>
            <Spacer mb={5} />
            <Flex flexDirection="row" justifyContent="space-between">
              <Button
                width="196px"
                variant="secondaryOutline"
                onClick={() => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.InstagramButtonTapped,
                    actionType: Schema.ActionTypes.Tap,
                  })
                  window.open("https://www.instagram.com/seasons.ny/", "_blank")
                }}
              >
                <Flex width="100%" justifyContent="center" flexDirection="row" alignItems="center">
                  <Box top="2px" style={{ position: "relative" }}>
                    <InstagramSVG width="24px" height="30px" />
                  </Box>
                  <Spacer mr={1} />
                  <Sans size="4" style={{ position: "relative", top: -2 }}>
                    Instagram
                  </Sans>
                </Flex>
              </Button>
              <Button
                variant="secondaryOutline"
                width="196px"
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
            </Flex>
            <Spacer mb={3} />
            <Flex flexDirection="row" alignItems="center">
              <SeparatorLine mr={2} />
              <Sans size="4" style={{ flexShrink: 0 }}>
                {breakText}
              </Sans>
              <SeparatorLine ml={2} />
            </Flex>
            <Spacer mb={3} />
            {isApprovedView ? (
              <Button
                block
                variant="secondaryOutline"
                onClick={() => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.InstagramButtonTapped,
                    actionType: Schema.ActionTypes.Tap,
                  })
                  window.open("https://discord.gg/Ck3utJPnyS", "_blank")
                }}
              >
                <Flex width="100%" justifyContent="center" flexDirection="row" alignContent="center">
                  <Box top="2px" style={{ position: "relative" }}>
                    <DisordSVG width="24px" height="18px" />
                  </Box>
                  <Spacer mr={1} />
                  <Sans size="4">Discord</Sans>
                </Flex>
              </Button>
            ) : (
              <Button
                block
                variant="secondaryOutline"
                onClick={() => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.InstagramButtonTapped,
                    actionType: Schema.ActionTypes.Tap,
                  })
                  window.open("mailto:membership@seasons.nyc?subject=Support", "_blank")
                }}
              >
                Contact us
              </Button>
            )}
            <Spacer mb={3} />
            <Sans size="4" style={{ width: "100%", textAlign: "center" }}>
              Have a question?{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => openDrawer("faq")}>
                Visit our FAQ
              </span>
            </Sans>
          </Flex>
        </Container>
      </Fade>
    </Modal>
  )
}

const CloseWrapper = styled(Box)`
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 100;
  cursor: pointer;
`

const ImageContainer = styled(Box)<{ url?: string }>`
  width: 480px;
  display: flex;
  flex: 1;
  background: url(${(p) => p.url}) no-repeat center center;
  background-size: cover;
`

const SeparatorLine = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${color("black10")};
`

const Container = MuiStyled(Box)({
  background: "white",
  margin: "0 auto",
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  borderRadius: "8px",
  overflow: "hidden",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
})
