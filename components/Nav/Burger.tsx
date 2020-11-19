import React from "react"
import styled from "styled-components"
import { color } from "../../helpers"
import { Spacer } from "../Spacer"

export const Burger = (props) => {
  return (
    <Wrapper {...props}>
      <Line />
      <Spacer mb="3px" />
      <Line />
      <Spacer mb="3px" />
      <Line />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
`

const Line = styled.div`
  width: 24px;
  height: 2px;
  background-color: ${color("black100")};
`
