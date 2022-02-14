import { Box, Button, Flex, Media, Sans, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { CloseXIcon } from "components/Icons/CloseXIcon"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"
import { imageResize } from "utils/imageResize"

import { Fade, Modal, styled as MuiStyled } from "@material-ui/core"

export const ClosingModal: React.FC<{ onClose: () => void; show: boolean }> = ({ onClose, show }) => {
  const router = useRouter()
  const tracking = useTracking()
  const headerText = "Closing time"
  const subText = (
    <>
      {`On March 11th, 2022, Seasons will be closing up shop. In the meantime, rental will no longer be supported and all items will be marked down for sale (excluding select brands). All sales are final.`}
      <br />
      <br />
      {`Thank you to everyone that made Seasons what it was and participating in this crazy experiment. It was really special to watch. ❤️`}
    </>
  )
  const breakText = "With love, Seasons"
  const imageURL = require("../../public/images/homepage/ClosingImage.jpg")

  const Content = ({ type }) => {
    const isDesktop = type === "desktop"

    return (
      <Flex flexDirection="row">
        {!!imageURL && isDesktop && <ImageContainer url={imageResize(imageURL, "large")} />}
        <Flex
          p={isDesktop ? 5 : 3}
          pt={7}
          style={{
            flex: 1,
            flexDirection: "column",
            position: "relative",
            width: isDesktop ? "480px" : "calc(100vw - 16px)",
            maxWidth: isDesktop ? "480px" : "calc(100vw - 16px)",
          }}
        >
          <CloseWrapper isDesktop={isDesktop}>
            <Box onClick={onClose}>
              <CloseXIcon variant="light" />
            </Box>
          </CloseWrapper>
          <Spacer pb={4} />
          <Sans size="8">{headerText}</Sans>
          <Spacer mb={3} />
          <Sans size="4" color="black50">
            {subText}
          </Sans>
          <Spacer mb={2} />
          <Sans size="4" color="black50">
            {breakText}
          </Sans>
          <Spacer mb={5} />
          <Flex flexDirection={isDesktop ? "row" : "column"} justifyContent="space-between">
            <Button
              variant="secondaryOutline"
              block
              onClick={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.GetTheIOSAppTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                router.push("/browse")
              }}
            >
              Shop the sale
            </Button>
          </Flex>

          <Spacer mb={3} />
          <Sans size="4" textAlign="center">
            Have a question or want to say hi?{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => window.open("mailto:membership@seasons.nyc?subject=Hi", "_blank")}
            >
              Email us
            </span>
          </Sans>
        </Flex>
      </Flex>
    )
  }

  return (
    <Modal open={show} onClose={onClose}>
      <Fade in={show}>
        <Container>
          <Media greaterThan="md">
            <Content type="desktop" />
          </Media>
          <Media lessThan="lg">
            <Content type="mobile" />
          </Media>
        </Container>
      </Fade>
    </Modal>
  )
}

const CloseWrapper = styled(Box)<{ isDesktop: boolean }>`
  position: absolute;
  top: 40px;
  right: ${(p) => (p.isDesktop ? "40px" : "34px")};
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
