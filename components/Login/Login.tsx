import { Button, Display, Sans, Spacer, Text } from "components"
import { Link } from "components/Link"
import { PAYMENT_PLANS } from "components/SignUp/ChoosePlanStep"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"
import { ResetPassword } from "mobile/LogIn/ResetPassword"
import { HOME_QUERY } from "queries/homeQueries"
import React, { useState } from "react"
import { SET_IMPACT_ID } from "queries/customerQueries"

import { useMutation } from "@apollo/client"
import { Box, colors, Fade, Slide, styled } from "@material-ui/core"

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      customer {
        id
        status
        detail {
          id
          shippingAddress {
            id
            state
          }
        }
        bagItems {
          id
        }
        admissions {
          id
          admissable
          authorizationsCount
          authorizationWindowClosesAt
          allAccessEnabled
        }
        user {
          id
          email
          firstName
          lastName
          createdAt
        }
      }
      token
      refreshToken
      expiresIn
    }
  }
`

export interface LoginViewProps {
  open?: boolean
}
export const LoginView: React.FunctionComponent<LoginViewProps> = (props) => {
  const { open } = props
  const { toggleLoginModal, signIn } = useAuthContext()
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [login] = useMutation(LOG_IN, {
    onError: (err) => {
      console.error(err)

      if (err.message.includes("invalid_grant")) {
        setError("Wrong email or password")
      }
    },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: HOME_QUERY }, { query: PAYMENT_PLANS }],
  })

  const [setImpactId] = useMutation(SET_IMPACT_ID)
  const handleSubmit = async ({ email, password }) => {
    const result = await login({
      variables: {
        email: email?.trim(),
        password,
      },
    })
    if (result?.data) {
      const {
        data: { login: userSession },
      } = result

      await signIn(userSession)
      const impactId = localStorage?.getItem("impactId")
      if (!!impactId) {
        setImpactId({
          variables: {
            impactId,
          },
        })
      }

      toggleLoginModal(false)
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
          {showResetPassword ? (
            <ResetPassword setShowResetPassword={setShowResetPassword} />
          ) : (
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
                    <Box mt={3} onClick={() => setShowResetPassword(true)}>
                      <Sans size="3" color="black100" style={{ textDecoration: "underline", cursor: "pointer" }}>
                        Forgot your password?
                      </Sans>
                    </Box>
                  </Form>
                </Box>
              )}
            />
          )}
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
