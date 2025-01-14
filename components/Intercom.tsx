import { useAuthContext } from "lib/auth/AuthContext"
import Head from "next/head"
import { useEffect } from "react"

export const Intercom = () => {
  const { authState, userSession } = useAuthContext()
  useEffect(() => {
    if (authState.authInitializing || typeof window === "undefined") {
      return
    }
    const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID

    if (authState.isSignedIn && !!userSession) {
      const { firstName, lastName, email } = userSession?.user

      ;(window as any).Intercom?.("update", {
        name: `${firstName} ${lastName}`,
        app_id: APP_ID,
        email: email,
        user_id: email,
        created_at: 1234567890,
        hide_default_launcher: false,
      })
    } else {
      ;(window as any).Intercom?.("update", {
        app_id: APP_ID,
        hide_default_launcher: false,
      })
    }
    return () => {
      ;(window as any).Intercom?.("update", {
        app_id: APP_ID,
        hide_default_launcher: true,
      })
    }
  }, [userSession, authState.authInitializing])
  return <></>
}
