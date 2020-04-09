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
    }
  }, [])

  return (
    <Col md="4" xs="12" px={["2", "0"]}>
      <Flex
        mt={2}
        flexDirection="column"
        style={{ backgroundColor: color("black04"), borderRadius: "8px", minHeight: minHeight + 175 + "px" }}
        p={3}
        m={0.5}
      >
        <Sans size="5" color="black50">{`0${index + 1}.`}</Sans>
        <Spacer mb={8} />
        <Box ref={container}>
          <Sans size="5" style={{ maxWidth: "90%" }}>
            {step.title}
          </Sans>
          <Spacer mb={1} />
          <InjectedSans
            size="3"
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
