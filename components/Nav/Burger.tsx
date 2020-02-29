import React from "react"
import styled from "styled-components"

export const Burger = props => {
  return (
    <Container {...props}>
      <Icon viewBox="0 0 129 129">
        <path d="M91.4 33.5H37.6c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1h53.9c2.3 0 4.1-1.8 4.1-4.1-.1-2.3-1.9-4.1-4.2-4.1zM91.4 87.4H37.6c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1h53.9c2.3 0 4.1-1.8 4.1-4.1-.1-2.3-1.9-4.1-4.2-4.1zM91.4 60.4H37.6c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1h53.9c2.3 0 4.1-1.8 4.1-4.1-.1-2.3-1.9-4.1-4.2-4.1z"></path>
      </Icon>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
`

const Icon = styled.svg`
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-right: 20px;
  margin-left: 10px;
`
