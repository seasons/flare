import { isValidEmail } from "App/helpers/regex"
import { useAuthContext } from "App/Navigation/AuthContext"
import { Box, Flex, Sans, Spacer, TextInput } from "components"
import { Button } from "components/Button"
import gql from "graphql-tag"
import { color } from "helpers"
import React, { useState } from "react"

import { useMutation } from "@apollo/client"

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        firstName
        lastName
        beamsToken
        roles
      }
      token
      refreshToken
      expiresIn
    }
  }
`

interface LogInProps {
  onAuth: (credentials, profile) => void
  navigation: any
}

export const LogIn: React.FC<LogInProps> = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isMutating, setIsMutating] = useState(false)
  const [emailComplete, setEmailComplete] = useState(false)
  const { signIn } = useAuthContext()

  const [login] = useMutation(LOG_IN, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops! Try again!",
        note: "Your email or password may be incorrect. Not a member? Apply for the waitlist.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const onEmailChange = (val) => {
    setEmail(val)
    setEmailComplete(isValidEmail(val))
  }

  const handleLogin = async () => {
    if (!isMutating) {
      setIsMutating(true)
      const result = await login({
        variables: {
          email,
          password,
        },
      })
      if (result?.data) {
        const {
          data: { login: userSession },
        } = result
        signIn(userSession)

        localStorage.setItem("userSession", JSON.stringify(userSession))
      }
    }
  }

  const handleResetPassword = () => {
    props.navigation.navigate("ResetPasswordModal", { screen: "FiltersModal" })
  }

  const disabled = !(emailComplete && password.length)

  return (
    <Box>
      <Flex style={{ flex: 1 }}>
        <Spacer mb={3} />
        <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <Box p={2} mt={5}>
            <Sans color={color("black100")} size="3">
              Welcome
            </Sans>
            <Spacer mb={3} />
            <TextInput
              headerText="Email"
              variant="light"
              inputKey="email"
              onChangeText={(_, val) => onEmailChange(val)}
            />
            <Spacer mb={2} />
            <TextInput
              secureTextEntry
              headerText="Password"
              variant="light"
              inputKey="password"
              onChangeText={(_, val) => setPassword(val)}
            />
            <Spacer mb={4} />
            <Button loading={isMutating} block onPress={handleLogin} disabled={disabled} variant="primaryBlack">
              Sign in
            </Button>
            <Spacer mb={3} />
            <Flex flexDirection="row" justifyContent="center">
              <Sans size="2" color="black50">
                Forget password?
              </Sans>{" "}
              <Sans style={{ textDecorationLine: "underline" }} size="2" color={color("black50")}>
                Reset
              </Sans>
            </Flex>
          </Box>
          <Box p={4} pb={5}>
            <Sans size="2" color="black50">
              Sign in using the same email and password you used for the waitlist.
            </Sans>

            <Spacer mb={2} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
