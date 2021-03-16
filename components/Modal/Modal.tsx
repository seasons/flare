import React from "react"
import { Modal as MaterialUIModal, Fade, Slide } from "@material-ui/core"
import { useModalContext } from "./ModalContext"
import styled from "styled-components"
import { Box } from "components"

export const Modal = () => {
  const { modalState, toggleModal } = useModalContext()
  const { show, children } = modalState

  if (!children) {
    return null
  }

  return (
    <MaterialUIModal open={show} onClose={() => toggleModal(false, null)}>
      <Fade in={show}>
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
          <OuterContainer>
            <Container>{children}</Container>
          </OuterContainer>
        </Slide>
      </Fade>
    </MaterialUIModal>
  )
}

const OuterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`

const Container = styled(Box)({
  background: "white",
  padding: "10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid #000",
})
