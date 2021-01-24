import React from "react"
import styled from "styled-components"

import { Box, Sans, Spacer } from "@seasons/eclipse"

import { BackArrow } from "../SVGs/BackArrow"
import HeaderText from "./HeaderText"

const BackButton = ({ onClick }) => {
  return (
    <BackButtonContainer onClick={onClick}>
      <BackArrow />
    </BackButtonContainer>
  )
}

interface FormHeaderProps {
  headerText: string
  headerDescription?: string
  headerLabel?: string
  showBackButton?: boolean
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  headerText,
  headerDescription,
  headerLabel,
  showBackButton,
}) => {
  return (
    <Box px={[2, 2, 2, 5, 5]}>
      {showBackButton && <BackButton onClick={previous} />}
      <Spacer mb={[5, 0]} />
      {headerLabel && (
        <>
          <Sans color="black50" size="4">
            {headerLabel}
          </Sans>
          <Spacer mb={2} />
        </>
      )}
      <Box>
        <HeaderText>{headerText}</HeaderText>
        <Spacer mb={1} />
        {!!headerDescription ? (
          <StyledDetailText size="4" color="black50">
            {headerDescription}
          </StyledDetailText>
        ) : null}
      </Box>
      <Spacer height={[5, 40]} />
    </Box>
  )
}

const BackButtonContainer = styled.div`
  color: white;
  background: #e8e8e8;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  position: absolute;
  top: 6px;
  left: 6px;
  @media (min-width: 350px) {
    top: 12px;
    left: 12px;
  }
  @media (min-width: 450px) {
    top: 48px;
    left: 48px;
    width: 64px;
    height: 64px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledDetailText = styled(Sans)`
  position: relative;
  max-width: 150%;
`
