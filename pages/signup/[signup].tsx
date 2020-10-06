import { Layout, MaxWidth, SnackBar, Sans, Flex } from "../../components"
import { CreateAccountForm, createAccountValidationSchema } from "../../components/Forms/CreateAccountForm"
import { Wizard } from "../../components/Forms/Wizard"
import { Step } from "../../components/Forms/Step"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { FormConfirmation } from "../../components/Forms/FormConfirmation"
import { screenTrack, Schema, useTracking } from "../../utils/analytics"
import { DateTime } from "luxon"
import {
  CustomerMeasurementsForm,
  customerMeasurementsValidationSchema,
} from "../../components/Forms/CustomerMeasurementsForm"

type ConfirmTextOptions = "accountQueued" | "accountAccepted"

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

const ADD_MEASUREMENTS = gql`
  mutation addMeasurements(
    $height: Int
    $weight: CustomerDetailCreateweightInput
    $topSizes: CustomerDetailCreatetopSizesInput
    $waistSizes: CustomerDetailCreatewaistSizesInput
  ) {
    addCustomerDetails(
      details: { height: $height, weight: $weight, topSizes: $topSizes, waistSizes: $waistSizes }
      status: Waitlisted
      event: CompletedWaitlistForm
    ) {
      id
    }
  }
`

const SignUpPage = screenTrack(() => ({
  page: Schema.PageNames.SignUpPage,
  path: "/signup",
}))(() => {
  const tracking = useTracking()
  const [signUpUser] = useMutation(SIGN_UP_USER)
  const [addMeasurements] = useMutation(ADD_MEASUREMENTS)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [confirmText, setConfirmText] = useState<ConfirmTextOptions>("accountAccepted")
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    tel: "",
    confirmPassword: "",
    password: "",
    zipCode: "",
    device: "",
    weight: "",
    height: "",
    topSizes: [""],
    waistSizes: [""],
  }

  const confirmTextOptions = {
    accountQueued: {
      headerText: "You’re almost done!",
      bodyText:
        "Shortly, you’ll receive an email asking you to verify your account. Until then, download our iOS app to finish creating your profile, see your place in line and get notified when you’re ready to choose your plan.",
    },
    accountAccepted: {
      headerText: "You’ve successfully created your account.",
      bodyText:
        "Download the Seasons iOS app on TestFlight to finish creating your profile, see your account status and get notified when you’re ready to choose your plan. In the meantime, follow us on Instagram for updates.",
    },
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
        <Flex height="100%" width="100%" flexDirection="row" alignItems="center" justifyContent="center">
          <Wizard initialValues={initialValues}>
            <Step
              validationSchema={createAccountValidationSchema}
              onSubmit={async (values, actions) => {
                try {
                  const date = new Date(values.dob)
                  const dateToIso = DateTime.fromJSDate(date).toISO()
                  const firstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1)
                  const lastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1)
                  const response = await signUpUser({
                    variables: {
                      email: values.email,
                      password: values.password,
                      firstName,
                      lastName,
                      details: {
                        phoneNumber: values.tel,
                        birthday: dateToIso,
                        phoneOS: values.device,
                        shippingAddress: {
                          create: { zipCode: values.zipCode },
                        },
                      },
                    },
                  })
                  if (response) {
                    localStorage?.setItem("email", values.email)
                    localStorage?.setItem("token", response.data.signup.token)
                    actions.setSubmitting(false)
                    return true
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
              {(context) => <CreateAccountForm context={context} />}
            </Step>
            <Step
              validationSchema={customerMeasurementsValidationSchema}
              onSubmit={async (values, actions) => {
                const { height, weight, topSizes, waistSizes } = values
                const filteredWaistSizes = waistSizes.filter((i) => i !== "")
                const filteredTopSizes = topSizes.filter((i) => i !== "")
                try {
                  const response = await addMeasurements({
                    variables: {
                      height,
                      weight: { set: weight },
                      topSizes: { set: filteredTopSizes },
                      waistSizes: { set: filteredWaistSizes },
                    },
                  })
                  if (response) {
                    actions.setSubmitting(false)
                    return true
                  }
                } catch (error) {
                  console.log("error", error)
                  setShowSnackBar(true)

                  actions.setSubmitting(false)
                }
              }}
            >
              {(context) => <CustomerMeasurementsForm context={context} />}
            </Step>
            <Step>
              {() => (
                <FormConfirmation
                  headerText={confirmTextOptions[confirmText].headerText}
                  bodyText={confirmTextOptions[confirmText].bodyText}
                />
              )}
            </Step>
          </Wizard>
        </Flex>
      </MaxWidth>
    </Layout>
  )
})

export default SignUpPage
