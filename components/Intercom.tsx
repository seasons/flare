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

      ;(window as any).intercomSettings = {
        app_id: APP_ID,
        name: `${firstName} ${lastName}`,
        email: email,
        vertical_padding: 80,
      }
      ;(window as any).Intercom?.("boot", {
        app_id: APP_ID,
        email: email,
        user_id: email,
        created_at: 1234567890,
      })
    } else {
      ;(window as any).intercomSettings = {
        app_id: APP_ID,
        vertical_padding: 80,
      }
      ;(window as any).Intercom?.("boot", {
        app_id: APP_ID,
      })
    }
  }, [userSession, authState.authInitializing])
  return (
    <>
      <Head>
        <script type="text/javascript" src="/js/intercom.js"></script>
      </Head>
    </>
  )
}
