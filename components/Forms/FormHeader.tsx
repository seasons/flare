import React from "react"
import styled from "styled-components"

import { Box, Sans, Spacer } from "@seasons/eclipse"

import HeaderText from "./HeaderText"

interface FormHeaderProps {
  headerText: string
  headerDescription?: string
  headerLabel?: string
}

export const FormHeader: React.FC<FormHeaderProps> = ({ headerText, headerDescription, headerLabel }) => {
  return (
    <Box px={[2, 2, 2, 5, 5]}>
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

const StyledDetailText = styled(Sans)`
  position: relative;
  max-width: 150%;
`
