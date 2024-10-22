import React, { useEffect, useRef } from "react"
import styled from "styled-components"

import { Box, Flex, Sans, Spacer } from "components"
import { color } from "../../helpers"
import { Col } from "../Grid"
import { Display } from "../Typography"

export const FAQCard: React.FC<{
  step: any
  index: number
  setMinHeight: (height: number) => void
  minHeight: number
}> = ({ step, index, setMinHeight, minHeight }) => {
  const container = useRef(null)

  let timeout
  let timeout2

  const updateHeight = () => {
    clearTimeout(timeout)
    clearTimeout(timeout2)
    timeout = setTimeout(() => {
      setMinHeight(150)
      const containerHeight = container?.current?.clientHeight
      if (containerHeight > minHeight) {
        setMinHeight(containerHeight)
      }
    }, 140)
    timeout2 = setTimeout(() => {
      const containerHeight = container?.current?.clientHeight
      if (containerHeight > minHeight) {
        setMinHeight(containerHeight)
      }
    }, 400)
  }

  useEffect(() => {
    updateHeight()
    if (window) {
      window.addEventListener("resize", updateHeight)
      return () => window.removeEventListener("resize", updateHeight)
    }
  }, [])

  return (
    <Col md="4" xs="12" px={1}>
      <Flex mb={5} flexDirection="column">
        <Sans size="9" color="black15">{`0${index + 1}`}</Sans>
        <Spacer mb={1} />
        <Box ref={container}>
          <Display size="4" style={{ maxWidth: "90%" }}>
            {step.title}
          </Display>
          <Spacer mb={1} />
          <Sans size="4" color="black50" style={{ maxWidth: "90%" }} dangerouslySetInnerHTML={{ __html: step.text }} />
        </Box>
      </Flex>
    </Col>
  )
}
