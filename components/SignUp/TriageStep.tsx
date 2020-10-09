import gql from "graphql-tag"
import React, { useEffect, useState } from "react"

import { useMutation } from "@apollo/react-hooks"

import { TriageProgressScreen } from "./TriageProgressScreen"

const TRIAGE = gql`
  mutation triage {
    triageCustomer
  }
`

interface TriagePaneProps {
  check: boolean
  onTriageComplete: (userAdmitted: boolean) => void
}

enum CheckStatus {
  Waiting,
  AwaitingRetry,
  Checking,
  Checked,
}

export const TriageStep: React.FC<TriagePaneProps> = ({ check, onTriageComplete }) => {
  const [checkStatus, setCheckStatus] = useState(CheckStatus.Waiting)
  const [status, setStatus] = useState(null)

  const errorPopUpData = {
    title: "Oops! Try again!",
    note: "There was an error communicating with our server. Please try again.",
    buttonText: "Retry",
    onClose: () => {
      //   hidePopUp()
      setCheckStatus(CheckStatus.AwaitingRetry)
    },
  }

  const [triage] = useMutation(TRIAGE, {
    onCompleted: () => {
      // Allow FlatList to transition before hiding spinner
      setCheckStatus(CheckStatus.Checked)
    },
    onError: (err) => {
      //   Sentry.captureException(err)
      console.log("Error TriagePane.tsx:", err)
      //   showPopUp(errorPopUpData)
    },
  })

  useEffect(() => {
    if ((checkStatus === CheckStatus.Waiting && check) || (checkStatus === CheckStatus.AwaitingRetry && check)) {
      const runTriage = async () => {
        await triageCustomer()
      }
      runTriage()
    }
  }, [check, checkStatus])

  const triageCustomer = async () => {
    if (checkStatus === CheckStatus.Checking) {
      return
    }

    setCheckStatus(CheckStatus.Checking)

    const result = await triage()
    setStatus(result?.data?.triageCustomer)
  }

  return (
    <>
      {(checkStatus === CheckStatus.Checking || checkStatus === CheckStatus.Checked) && (
        <TriageProgressScreen
          start={check}
          done={() => {
            switch (status) {
              case "Authorized":
                onTriageComplete(false)
                break
              case "Waitlisted":
                onTriageComplete(true)
                break
              default:
                onTriageComplete(true)
                break
            }
          }}
        />
      )}
    </>
  )
}
