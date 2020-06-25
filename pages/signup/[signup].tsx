import { Layout, Flex, Box, Spacer, MaxWidth } from "../../components"
import { CreateAccountForm, createAccountValidationSchema } from "../../components/Forms/CreateAccountForm"
import { Wizard } from "../../components/Forms/Wizard"
import { Step } from "../../components/Forms/Step"
import gql from "graphql-tag"
import withData from "../../lib/apollo"
import { useMutation } from "@apollo/react-hooks"

const SIGN_UP_USER = gql`
  mutation SignupUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $details: CustomerDetailCreateInput!
  ) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName, details: $details) {
      token
      user {
        id
      }
    }
  }
`

const SignUpPage = withData(() => {
  const [signUpUser] = useMutation(SIGN_UP_USER)

  return (
    <Layout fixedNav hideFooter>
      <MaxWidth>
        <Box style={{ height: "100%" }}>
          <Flex flexDirection="column">
            <Spacer mt={100} />
            <Flex flexDirection="row" width="100%" justifyContent="center">
              <Wizard>
                <Step
                  validationSchema={createAccountValidationSchema}
                  onSubmit={async (values, actions) => {
                    console.log("values", values)
                    if (!values) {
                      return
                    }
                    const resp = await signUpUser({
                      variables: {
                        email: values.email,
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        details: {
                          phoneNumber: values.tel,
                        },
                      },
                    })
                    console.log("resp!!!", resp)
                    if (resp) {
                      actions.setSubmitting(false)
                      localStorage.setItem("email", values.email)
                      localStorage.setItem("token", resp.data.signup.token)
                      //@ts-ignore
                      window.analytics.identify(data.signup.user.id)
                    } else {
                      const error = ""
                      if (JSON.stringify(error).includes("email already in db")) {
                        actions.setFieldError("email", "User with that email already exists")
                      } else {
                        // showGlobalErrorCallback("Something went wrong. Please try again later.")
                      }
                      return { didError: true }
                    }
                  }}
                >
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
