import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { MaxWidth } from "./MaxWidth"

export interface SnackBarProps {
  Message: React.ReactElement
  timeoutMS?: number
  show: boolean
  onClose: () => void
}
export const SnackBar: React.FC<SnackBarProps> = ({ Message, show, onClose }) => {
  return (
    <SnackBarContainer>
      <MaxWidth>
        <StyledDiv show={show}>
          <CloseWrapper onClick={onClose}>
            <span>X</span>
          </CloseWrapper>
          {Message}
        </StyledDiv>
      </MaxWidth>
    </SnackBarContainer>
  )
}

const StyledDiv = styled.div<{ show: boolean }>`
  height: ${(props) => (props.show ? "48px" : "0px")};
  color: white;
  width: 100%;
  position: relative;
  background-color: #303030;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ProximaNova-Medium, sans-serif;
  font-size: 14px;
  opacity: ${(props) => (props.show ? 1.0 : 0.0)};
  transition: all 0.4s ease-in-out;
  p {
    margin: 0;
  }
`

const CloseWrapper = styled.div`
  position: absolute;
  right: 6px;
  top: 4px;
  color: white;
  cursor: pointer;
  padding: 10px;
`

const SnackBarContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 58px;
  left: 0;
  z-index: 2;
  width: 100%;
`
