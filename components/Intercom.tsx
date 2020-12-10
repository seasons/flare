import { useAuthContext } from "lib/auth/AuthContext"
import Head from "next/head"
import { useEffect } from "react"

export const Intercom = () => {
  const { userSession } = useAuthContext()
  useEffect(() => {
    if (typeof window !== "undefined" && !!userSession) {
      const { firstName, lastName, email } = userSession?.user
      const APP_ID = "dtqi42qh"

      ;(window as any).intercomSettings = {
        app_id: APP_ID,
        name: `${firstName} ${lastName}`,
        email: email,
      }
      ;(window as any).Intercom?.("boot", {
        app_id: APP_ID,
        email: email,
        user_id: email,
        created_at: 1234567890,
      })
    }
  }, [userSession])
  return (
    <>
      <Head>
        <script type="text/javascript" src="/js/intercom.js"></script>
      </Head>
    </>
  )
}
