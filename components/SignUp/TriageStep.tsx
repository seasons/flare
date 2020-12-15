import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { TriageProgressScreen } from "./TriageProgressScreen"
import { HOME_QUERY } from "queries/homeQueries"
import { PAYMENT_PLANS } from "./ChoosePlanStep"
import { identify } from "utils/analytics/track"
import { useAuthContext } from "lib/auth/AuthContext"

const TRIAGE = gql`
  mutation triage {
    triageCustomer
  }
`

interface TriagePaneProps {
  check: boolean
  onTriageComplete: (userAdmitted: boolean) => void
  onStartTriage: () => void
}

enum CheckStatus {
  Waiting,
  AwaitingRetry,
  Checking,
  Checked,
}

export const TriageStep: React.FC<TriagePaneProps> = ({ check, onTriageComplete, onStartTriage }) => {
  const [checkStatus, setCheckStatus] = useState(CheckStatus.Waiting)
  const [status, setStatus] = useState(null)
  const { userSession } = useAuthContext()

  const endTriage = () =>
    setTimeout(() => {
      callTriageComplete()
    }, 6000)

  const [triage] = useMutation(TRIAGE, {
    onCompleted: (result) => {
      // Allow FlatList to transition before hiding spinner
      setCheckStatus(CheckStatus.Checked)

      const newStatus = result?.triageCustomer
      identify(userSession?.user?.id, {
        status: newStatus,
        authorizations: newStatus === "Authorized" ? 1 : 0,
        admissable: newStatus === "Authorized" ? true : false,
      })

      endTriage()
    },
    onError: (err) => {
      console.log("Error TriagePane.tsx:", err)

      endTriage()
    },
    refetchQueries: [{ query: HOME_QUERY }, { query: PAYMENT_PLANS }],
    awaitRefetchQueries: true,
  })

  useEffect(() => {
    if ((checkStatus === CheckStatus.Waiting && check) || (checkStatus === CheckStatus.AwaitingRetry && check)) {
      const runTriage = async () => {
        onStartTriage()
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

  const callTriageComplete = () => {
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
  }

  return (
    <>
      {(checkStatus === CheckStatus.Checking || checkStatus === CheckStatus.Checked) && (
        <TriageProgressScreen start={check} />
      )}
    </>
  )
}
