import { Button, Sans, Spacer, Text } from "components"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"
import React, { useState } from "react"

import { useMutation } from "@apollo/client"
import { Box, colors, styled } from "@material-ui/core"

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        firstName
        lastName
      }
      token
      refreshToken
      expiresIn
    }
  }
`

export interface LoginViewProps {
  props?: any
  onSuccess?: () => void
}
export const LoginView: React.FunctionComponent<LoginViewProps> = props => {
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuthContext()
  const [login] = useMutation(LOG_IN, {
    onError: err => {
      console.error(err)
      setError(err.message)
    },
  })

  const handleSubmit = async ({ email, password }) => {
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
      props.onSuccess?.()
    }
  }

  const initialValues = {
    email: "",
    password: "",
  }

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <Box mx={5} my={6} pb={3}>
            <Form onSubmit={handleSubmit}>
              <Box my={2}>
                <Sans size="5">Log In</Sans>
                <Sans size="3">Don't have an account?</Sans>
              </Box>
              <div>
                <Field component={TextField} label="Email address" name="email" autoFocus fullWidth />
                <Spacer mt={1} />
                <Field component={TextField} label="Password" name="password" type="password" fullWidth />
              </div>
              <Spacer mt={4} />
              <Button type="submit" variant="primaryBlack" block>
                Log in
              </Button>
              {error && (
                <Box my={1}>
                  <Text color={colors.red[500]}>{error}</Text>
                </Box>
              )}
            </Form>
          </Box>
        )}
      />
    </Container>
  )
}

const Container = styled(Box)({
  width: "400px",
  background: "white",
  padding: "10px",
  margin: "0 auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  border: "1px solid #000"
})
