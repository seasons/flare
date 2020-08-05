import React, { useRef, useEffect } from "react"
import { Col } from "../Grid"
import { Sans, Box, Spacer, Flex } from ".."
import styled from "styled-components"
import { color } from "../../helpers"

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
      return window.removeEventListener("resize", updateHeight)
    }
  }, [])

  return (
    <Col md="4" xs="12">
      <Flex mb={5} flexDirection="column" px={[2, 4]}>
        <Sans size="11" color="black15">{`0${index + 1}`}</Sans>
        <Spacer mb={1} />
        <Box ref={container}>
          <Sans size="4" style={{ maxWidth: "90%" }}>
            {step.title}
          </Sans>
          <Spacer mb={1} />
          <InjectedSans
            size="4"
            color="black50"
            style={{ maxWidth: "90%" }}
            dangerouslySetInnerHTML={{ __html: step.text }}
          />
        </Box>
      </Flex>
    </Col>
  )
}

const InjectedSans = styled(Sans)`
  a {
    text-decoration: underline;
    color: ${color("black100")};
  }
`
