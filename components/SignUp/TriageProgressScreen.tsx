import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Box, Flex, Sans } from "components"
import { color } from "../../helpers"

interface TriageProgressScreenProps {
  done?: () => void
  start: boolean
}

const TriageProgressFooter = styled(Box)`
  position: absolute;
  bottom: 30px;
  left: 10px;
  right: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const Dots = styled.span`
  display: inline-block;
  text-align: left;
  padding-left: 2px;
  width: 30px;
`

export const TriageProgressScreen: React.FC<TriageProgressScreenProps> = ({ start, done }) => {
  const steps = ["Verifying account", "Checking sizes", "Confirming availability"]
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsComplete, setStepsComplete] = useState(false)
  const [threeDots, setThreeDots] = useState(".")

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setCurrentStep((currentStep) => {
          if (currentStep === steps.length - 1) {
            clearInterval(interval)
            setStepsComplete(true)
            return currentStep
          } else {
            return currentStep + 1
          }
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [start])

  useEffect(() => {
    const interval = setInterval(() => {
      setThreeDots((threeDots) => (threeDots.length === 3 ? "." : threeDots + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (stepsComplete) {
      done?.()
    }
  }, [stepsComplete])

  return (
    <Flex flexDirection="row" alignItems="center" alignContent="center" height="100%" width="100%">
      <Flex flexDirection="column" alignItems="center" alignContent="center" mx="auto">
        <Box mt={5} mb={1}>
          <Sans size="9" textAlign="center">
            {steps[currentStep]}
            <Dots>{threeDots}</Dots>
          </Sans>
        </Box>
        <Box>
          <Sans size="3" textAlign="center" color={color("black50")}>
            Give us a few seconds while we process your account and confirm membership availability
          </Sans>
        </Box>
      </Flex>
      <TriageProgressFooter px={3}></TriageProgressFooter>
    </Flex>
  )
}
