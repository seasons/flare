import { Display, Flex, Media, Separator, Spacer } from "components"
import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { color } from "../../helpers"
import { Col, Grid, Row } from "../Grid"
import { useAuthContext } from "lib/auth/AuthContext"
import styled from "styled-components"

const CREATE_INTERESTED_USER = gql`
  mutation CreatedInterestedUser($email: String!) {
    createInterestedUser(email: $email) {
      id
      email
    }
  }
`

const Content = ({ type, validateEmail, emailValid, userCreated, onSubmit, email, setEmail, setEmailValid }) => {
  const isDesktop = type === "desktop"

  return (
    <Grid>
      <Row px={[2, 2, 2, 2, 2]}>
        <Col xs="12" md="6">
          <Flex pr={isDesktop ? 12 : 0}>
            <Display size="9" color="white100">
              {userCreated
                ? "You’re signed up. We’ll keep you updated on upcoming releases, restocks, & the latest news."
                : "Get updates about stuff you probably want to know about (new releases, restocks, etc.)"}
            </Display>
          </Flex>
        </Col>
        <Col xs="12" md="6">
          {!isDesktop && <Spacer mb={3} />}
          <Flex
            alignItems={isDesktop ? "center" : "flex-start"}
            flexDirection={isDesktop ? "row" : "column"}
            flexWrap="nowrap"
            justifyContent="space-between"
          >
            <StyledTextField
              key={type}
              value={email}
              onChange={(e) => {
                const value = e.target.value
                setEmail(value)
                setEmailValid(validateEmail(value))
              }}
              placeholder="Enter your email"
            />
            {!isDesktop && (
              <>
                <Separator color={email.length === 0 ? color("black50") : color("white100")} />
                <Spacer mb={2} />
              </>
            )}
            <SubmitButton onClick={() => onSubmit()}>
              <Display size="9" color={emailValid ? color("white100") : color("black50")}>
                Submit
              </Display>
            </SubmitButton>
          </Flex>
          {isDesktop && <Separator color={email.length === 0 ? color("black50") : color("white100")} />}
        </Col>
      </Row>
      <Spacer mb={["80px", "80px", "112px", "112px", "112px"]} />
    </Grid>
  )
}

export const EmailCollection = () => {
  const { authState } = useAuthContext()
  const [userCreated, setUserCreated] = useState(false)
  const [email, setEmail] = useState("")
  const [emailValid, setEmailValid] = useState(false)
  const [createInterestedUser] = useMutation(CREATE_INTERESTED_USER, {
    onCompleted: () => {
      setUserCreated(true)
      setEmailValid(false)
      setEmail("")
    },
    onError: (error) => {
      console.log("error", error)
    },
  })

  const onSubmit = async () => {
    if (emailValid) {
      await createInterestedUser({
        variables: { email: email.toLowerCase() },
      })
    }
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  if (authState?.isSignedIn) {
    return null
  }

  return (
    <>
      <Media greaterThan="md">
        <Content
          type="desktop"
          validateEmail={validateEmail}
          emailValid={emailValid}
          userCreated={userCreated}
          onSubmit={onSubmit}
          email={email}
          setEmail={setEmail}
          setEmailValid={setEmailValid}
        />
      </Media>
      <Media lessThan="lg">
        <Content
          type="mobile"
          validateEmail={validateEmail}
          emailValid={emailValid}
          userCreated={userCreated}
          onSubmit={onSubmit}
          email={email}
          setEmail={setEmail}
          setEmailValid={setEmailValid}
        />
      </Media>
    </>
  )
}

const SubmitButton = styled("button")`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

const StyledTextField = styled("input")`
  color: ${color("white100")};
  font-family: "NBAkademieProRegular";
  font-size: 32px;
  background-color: transparent;
  border: none;
  width: 100%;
  padding-right: 16px;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: ${color("black50")};
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: ${color("black50")};
  }
  &:-ms-input-placeholder {
    /* IE 10+ */
    color: ${color("black50")};
  }
  &:-moz-placeholder {
    /* Firefox 18- */
    color: ${color("black50")};
  }
`
