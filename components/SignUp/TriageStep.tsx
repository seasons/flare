import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { TriageProgressScreen } from "./TriageProgressScreen"
import { PAYMENT_PLANS } from "./ChoosePlanStep"
import { identify } from "utils/analytics/track"
import { useAuthContext } from "lib/auth/AuthContext"
import { HOME_QUERY_WEB } from "@seasons/eclipse"

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
  const { userSession } = useAuthContext()

  const endTriage = (authorized: boolean) =>
    setTimeout(() => {
      onTriageComplete(authorized)
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

      endTriage(newStatus === "Waitlisted")
    },
    onError: (err) => {
      endTriage(true)
    },
    refetchQueries: [{ query: HOME_QUERY_WEB }, { query: PAYMENT_PLANS }],
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
    await triage()
  }

  return (
    <>
      {(checkStatus === CheckStatus.Checking || checkStatus === CheckStatus.Checked) && (
        <TriageProgressScreen start={check} />
      )}
    </>
  )
}
