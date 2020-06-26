import { Layout, Flex, Box, Spacer, MaxWidth, SnackBar, Sans } from "../../components"
import { CreateAccountForm, createAccountValidationSchema } from "../../components/Forms/CreateAccountForm"
import { Wizard } from "../../components/Forms/Wizard"
import { Step } from "../../components/Forms/Step"
import gql from "graphql-tag"
import withData from "../../lib/apollo"
import { useMutation } from "@apollo/react-hooks"
import { useState } from "react"

const SIGN_UP_USER = gql`
  mutation SignupUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $zipCode: String!
    $details: CustomerDetailCreateInput!
  ) {
    signup(
      email: $email
      zipCode: $zipCode
      password: $password
      firstName: $firstName
      lastName: $lastName
      details: $details
    ) {
      token
      user {
        id
      }
    }
  }
`

const SignUpPage = withData(() => {
  const [signUpUser] = useMutation(SIGN_UP_USER)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    tel: "",
    password: "",
    zipCode: "",
    device: "",
    dob: "",
  }

  const closeSnackBar = () => {
    setShowSnackBar(false)
  }

  const SnackBarMessage = (
    <Sans size="3">
      Something went wrong creating your account, please{" "}
      <a style={{ color: "inherit" }} href="mailto:membership@seasons.nyc?subject=Help">
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>contact us.</span>
      </a>
    </Sans>
  )

  return (
    <Layout fixedNav hideFooter>
      <MaxWidth>
        <SnackBar Message={SnackBarMessage} show={showSnackBar} onClose={closeSnackBar} />
        <Box style={{ height: "100%" }}>
          <Flex flexDirection="column">
            <Spacer mt={100} />
            <Flex flexDirection="row" width="100%" justifyContent="center">
              <Wizard
                initialValues={initialValues}
                onComplete={async (values, actions) => {
                  try {
                    const response = await signUpUser({
                      variables: {
                        email: values.email,
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        zipCode: values.zipCode,
                        details: {
                          phoneNumber: values.tel,
                          birthday: values.dob,
                          phoneOS: values.device,
                        },
                      },
                    })
                    if (response) {
                      actions.setSubmitting(false)
                      localStorage.setItem("email", values.email)
                      localStorage.setItem("token", response.data.signup.token)
                    }
                  } catch (error) {
                    if (JSON.stringify(error).includes("email already in db")) {
                      actions.setFieldError("email", "User with that email already exists")
                    } else {
                      console.log("error", error)
                      setShowSnackBar(true)
                    }
                    actions.setSubmitting(false)
                  }
                }}
              >
                <Step validationSchema={createAccountValidationSchema}>
                  {(context) => <CreateAccountForm context={context} />}
                </Step>
              </Wizard>
            </Flex>
            <Spacer mb={8} />
          </Flex>
        </Box>
      </MaxWidth>
    </Layout>
  )
})

export default SignUpPage
