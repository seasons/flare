import { Button, Display, Sans, Spacer, Text } from "components"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"
import React, { useState } from "react"

import { useMutation } from "@apollo/client"
import { Box, colors, Fade, Slide, styled } from "@material-ui/core"
import { Link } from "components/Link"

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
  open?: boolean
  onSuccess?: () => void
}
export const LoginView: React.FunctionComponent<LoginViewProps> = (props) => {
  const { open } = props
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuthContext()
  const [login] = useMutation(LOG_IN, {
    onError: (err) => {
      console.error(err)

      if (err.message.includes("invalid_grant")) {
        setError("Wrong email or password")
      }
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
    <Fade in={open}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Container>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
              <Box mx={2} my={3}>
                <Form onSubmit={handleSubmit}>
                  <Box my={2} mb={3}>
                    <Display size="7">Log In</Display>
                    <Sans size="3" color="black50">
                      Don't have an account?{" "}
                      <Link href="/signup">
                        <span style={{ textDecoration: "underline", cursor: "pointer" }}>Sign up</span>
                      </Link>
                    </Sans>
                  </Box>
                  <div>
                    <Field component={TextField} label="Email address" name="email" autoFocus fullWidth />
                    <Spacer mt={2} />
                    <Field component={TextField} label="Password" name="password" type="password" fullWidth />
                  </div>
                  <Spacer mt={6} />
                  <Button type="submit" variant="primaryBlack" block style={{ width: "100%" }}>
                    Log in
                  </Button>
                  {error && (
                    <Box my={1}>
                      <Text color={colors.red[500]}>{error}</Text>
                    </Box>
                  )}
                  <Box mt={3}>
                    <Sans size="4" color="black50">
                      Forgot your password?
                    </Sans>
                  </Box>
                </Form>
              </Box>
            )}
          />
        </Container>
      </Slide>
    </Fade>
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
  marginTop: "-200px",
  marginLeft: "-200px",
  border: "1px solid #000",
})
