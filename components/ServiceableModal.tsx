import { Box, Display, Sans } from "components"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { setTimeout } from "timers"
import { Schema, useTracking } from "utils/analytics"

import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { Slide, TextField } from "@material-ui/core"

import { Button } from "./Button"

const Container = styled(Box)`
  border: 1px solid #000;
  background: white;
  width: 391px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
`

const CloseButton = styled(Box)`
  border: 1px solid #000;
  border-top-width: 0px;
  border-right-width: 0px;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  line-height: 40px;
  background: white;
`

const ZIPCODE_SERVICED = gql`
  query ZipcodeServiced($zipCode: String!) {
    zipcodeServiced(zipcode: $zipCode)
  }
`

const CREATE_INTERESTED_USER = gql`
  mutation CreateInterestedUser($email: String!, $zipCode: String!) {
    createInterestedUser(email: $email, zipcode: $zipCode) {
      id
      email
      zipcode
    }
  }
`

type Step = "zipcode" | "email-success" | "email-failure" | "done"

export const ServiceableModal = () => {
  const tracking = useTracking()
  const [step, setStep] = useState<Step>("zipcode")
  const [zipCode, setZipCode] = useState("")
  const [email, setEmail] = useState("")
  const [zipcodeServiced, { data, loading: zipcodeLoading, called }] = useLazyQuery(ZIPCODE_SERVICED)
  const [createInterestedUser] = useMutation(CREATE_INTERESTED_USER)
  const [didShowModal, setDidShowModal] = useState(true)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const wasShown = localStorage.getItem("zipcode-modal") === "true"
    setDidShowModal(wasShown)
    setTimeout(() => {
      setShow(!wasShown)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!called || zipcodeLoading) {
      return
    }
    if (data?.zipcodeServiced) {
      setStep("email-success")
    } else {
      setStep("email-failure")
    }
  }, [zipcodeLoading])

  const ContentForStep = (step) => {
    switch (step) {
      case "zipcode":
        return (
          <>
            <Box pr={2}>
              <Display size="4">Enter your ZIP code below to see if we’re in your city.</Display>
            </Box>
            <Box py={3}>
              <TextField
                value={zipCode}
                placeholder="ZIP Code"
                onChange={(e) => {
                  const value = e.target.value
                  setZipCode(value)
                }}
                fullWidth
              />
            </Box>
            <Box pt={3} width="100%">
              <Button
                variant="primaryWhite"
                onClick={() => {
                  zipcodeServiced({
                    variables: { zipCode },
                  })
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.ServiceableModalZipCodeButtonClicked,
                    actionType: Schema.ActionTypes.Tap,
                    zipCode,
                  })
                }}
                width="100%"
              >
                Submit
              </Button>
            </Box>
          </>
        )
      case "email-failure":
      case "email-success":
        const copy =
          step === "email-success"
            ? "Yes! We’re in your city. Enter your email to secure your place in line"
            : "Look’s like we’re not in your city yet. Sign up to get notified we’re in your area."
        return (
          <>
            <Display size="4">{copy}</Display>
            <Box py={3}>
              <TextField
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  const value = e.target.value
                  setEmail(value)
                }}
                fullWidth
              />
            </Box>
            <Box py={3}>
              <Button
                variant="primaryWhite"
                onClick={async () => {
                  const res = await createInterestedUser({
                    variables: { email, zipCode },
                  })

                  localStorage.setItem("zipcode-modal", "true")
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.ServiceableModalEmailButtonClicked,
                    actionType: Schema.ActionTypes.Tap,
                    email,
                    zipCode,
                  })
                  setStep("done")
                }}
                width="100%"
              >
                Notify me
              </Button>
            </Box>
            <Box pb={1}>
              <Sans size="3" color="black50">
                You may unsubscribe from updates at any time. To find out more, please visit our Privacy Policy.
              </Sans>
            </Box>
          </>
        )
      case "done":
        return (
          <>
            <Display size="4">Great. Will keep you updated</Display>
            <Box py={3}>
              <Button
                variant="primaryWhite"
                onClick={() => {
                  setShow(false)
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.ServiceableModalDoneButtonClicked,
                    actionType: Schema.ActionTypes.Tap,
                    email,
                    zipCode,
                  })
                }}
                width="100%"
              >
                Got it
              </Button>
            </Box>
          </>
        )
    }
  }

  if (didShowModal) {
    return null
  }

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Container p={4}>
        <CloseButton
          onClick={() => {
            setShow(false)
            tracking.trackEvent({
              actionName: Schema.ActionNames.ServiceableModalCloseButtonClicked,
              actionType: Schema.ActionTypes.Tap,
              email,
              zipCode,
            })
          }}
        >
          X
        </CloseButton>
        <Box>{ContentForStep(step)}</Box>
      </Container>
    </Slide>
  )
}
