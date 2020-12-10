import { getUserSession, UserSession } from "lib/auth/auth"
import React, { useEffect, useImperativeHandle } from "react"

import { identify, reset } from "../../utils/analytics"
import { userSessionToIdentifyPayload } from "./auth"
import AuthContext from "./AuthContext"

export interface AuthProviderProps {
  apolloClient: any
  children?: any
}

export interface AuthContextProps {
  signIn: (session: any) => Promise<void>
  signOut: () => Promise<void>
  toggleLoginModal: (toggle: boolean) => void
  resetStore: () => void
  authState: { authInitializing: boolean; isSignedIn: boolean; userSession: UserSession }
  userSession: UserSession
  loginModalOpen: boolean
}

export interface AuthProviderRef {
  authContext: () => AuthContextProps
}

export const AuthProvider = React.forwardRef<AuthProviderRef, AuthProviderProps>(({ apolloClient, children }, ref) => {
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userSession: processSession(action.userSession),
            isSignedIn: !!action.token,
            authInitializing: false,
          }
        case "SIGN_IN":
          return {
            ...prevState,
            isSignedIn: true,
            userSession: processSession(action.userSession),
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignedIn: false,
            userSession: null,
          }
        case "TOGGLE_LOGIN_MODAL":
          return {
            ...prevState,
            loginModalOpen: action.toggle,
          }
      }
    },
    {
      authInitializing: true,
      isSignedIn: false,
      loginModalOpen: false,
      userSession: null,
    }
  )

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userSession = await getUserSession()
        if (userSession && userSession.token) {
          const user = userSession?.user
          if (user) {
            identify(user.id, userSessionToIdentifyPayload(userSession))
          }
          dispatch({ type: "RESTORE_TOKEN", token: userSession.token, userSession })
        } else {
          dispatch({ type: "RESTORE_TOKEN", token: null, userSession: null })
        }
      } catch (e) {
        console.log("Restoring token failed: ", e)
      }
    }

    bootstrapAsync()
  }, [])

  // Forward authContext to any parents holding a ref to this AuthProvider.
  useImperativeHandle(ref, () => ({
    authContext: () => authContext,
  }))

  const authContext = {
    signIn: async (session) => {
      dispatch({ type: "SIGN_IN", token: session.token, userSession: session })
      localStorage.setItem("userSession", JSON.stringify(processSession(session)))
      const user = session?.customer?.user
      if (user) {
        identify(user.id, userSessionToIdentifyPayload(session))
      }
      apolloClient.stop()
      apolloClient.resetStore()
    },
    signOut: async () => {
      const keysToClear = ["userSession", "allAccessEnabled", "utm", "paymentProcessed"]
      for (const key of keysToClear) {
        localStorage.removeItem(key)
      }
      reset()
      dispatch({ type: "SIGN_OUT" })
      apolloClient.stop()
      apolloClient.resetStore()
    },
    toggleLoginModal: (toggle: boolean) => {
      dispatch({ type: "TOGGLE_LOGIN_MODAL", toggle })
    },
    resetStore: () => {
      apolloClient.stop()
      apolloClient.resetStore()
    },
    authState,
    userSession: authState.userSession,
    loginModalOpen: authState.loginModalOpen,
  }

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
})

const processSession = (session) => ({ ...session, user: session?.customer?.user || session?.user })
