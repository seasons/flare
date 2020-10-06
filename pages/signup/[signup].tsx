import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import { Flex, Layout, MaxWidth, Sans, SnackBar } from "../../components"
import { FormConfirmation } from "../../components/Forms/FormConfirmation"
import { Step } from "../../components/Forms/Step"
import { Wizard } from "../../components/Forms/Wizard"
import { ChoosePlanStep } from "../../components/SignUp/ChoosePlanStep"
import { CreateAccountStep } from "../../components/SignUp/CreateAccountStep"
import { MeasurementsStep } from "../../components/SignUp/MeasurementsStep"
import { TriageStep } from "../../components/SignUp/TriageStep"
import { CheckWithBackground } from "../../components/SVGs"
import withData from "../../lib/apollo"
import { Schema, screenTrack, useTracking } from "../../utils/analytics"

type ConfirmTextOptions = "accountQueued" | "accountAccepted"

const SignUpPage = screenTrack(() => ({
  page: Schema.PageNames.SignUpPage,
  path: "/signup",
}))(
  withData(() => {
    const tracking = useTracking()
    const router = useRouter()
    const { session_id } = router.query
    const [steps, setSteps] = useState([])

    const [showSnackBar, setShowSnackBar] = useState(false)
    const [startTriage, setStartTriage] = useState(true)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [confirmText, setConfirmText] = useState<ConfirmTextOptions>("accountAccepted")
    const [isWaitlisted, setIsWaitlisted] = useState(false)

    useEffect(() => {
      const noAccountSteps = [
        <CreateAccountStep onFailure={() => setShowSnackBar(true)} />,
        <MeasurementsStep onFailure={() => setShowSnackBar(true)} />,
      ]

      const triageStep = [
        <Step>
          {({ wizard, form }) => (
            <TriageStep
              check={startTriage}
              onTriageComplete={(isWaitlisted) => {
                setIsWaitlisted(isWaitlisted)
                localStorage.setItem("isWaitlisted", String(isWaitlisted))
                wizard.next()
              }}
            />
          )}
        </Step>,
      ]

      const userHasAccount = !!localStorage.getItem("email")
      const userIsConfirmed = localStorage.getItem("isWaitlisted") === "false"
      const paymentProcessed = !!session_id

      const steps = paymentProcessed
        ? [
            <Step>
              {({ wizard }) => {
                const data = confirmData[confirmText]
                return <FormConfirmation {...data} />
              }}
            </Step>,
          ]
        : [
            // ...(userHasAccount ? [] : noAccountSteps),
            // ...(userIsConfirmed ? [] : triageStep),
            <Step>
              {({ wizard }) => {
                const data = confirmData[confirmText]
                return isWaitlisted ? (
                  <FormConfirmation {...data} />
                ) : (
                  <ChoosePlanStep
                    onPlanSelected={async (plan) => {
                      setSelectedPlan(plan)

                      wizard.next()
                    }}
                  />
                )
              }}
            </Step>,
          ]
      setSteps(steps)
    }, [])

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

    const confirmData = {
      waitlisted: {
        icon: <CheckWithBackground backgroundColor={"#000"} />,
        headerText: "You're Waitlisted",
        bodyText: "We’ll let you know when your account is ready and you’re able to choose your plan.",
      },
      accountAccepted: {
        icon: <CheckWithBackground />,
        headerText: "You’ve successfully created your account.",
        bodyText:
          "Download the Seasons iOS app on TestFlight to finish creating your profile, see your account status and get notified when you’re ready to choose your plan. In the meantime, follow us on Instagram for updates.",
      },
    }

    const closeSnackBar = () => {
      setShowSnackBar(false)
    }

    const hasSteps = steps.length > 0

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
            {hasSteps && <Wizard initialValues={initialValues}>{steps}</Wizard>}
          </Flex>
        </MaxWidth>
      </Layout>
    )
  })
)

export default SignUpPage
