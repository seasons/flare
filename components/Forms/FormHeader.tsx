import React from "react"
import styled from "styled-components"

import { Box, Sans, Spacer } from "@seasons/eclipse"

import HeaderText from "./HeaderText"

interface FormHeaderProps {
  headerText: string
  headerDescription?: string
  headerLabel?: string
  isDesktop: boolean
}

export const FormHeader: React.FC<FormHeaderProps> = ({ headerText, headerDescription, headerLabel, isDesktop }) => {
  return (
    <Box px={isDesktop ? 0 : 1}>
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
      <Spacer mb={5} />
    </Box>
  )
}

const StyledDetailText = styled(Sans)`
  position: relative;
  max-width: 150%;
`
