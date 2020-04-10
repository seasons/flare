import React from "react"
import styled from "styled-components"
import { Box } from "../Box"
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
  width: 21px;
  height: 3px;
  border-radius: 10px;
  background-color: ${color("black100")};
`

const Icon = styled.svg`
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-right: 16px;
  margin-left: 10px;
`
