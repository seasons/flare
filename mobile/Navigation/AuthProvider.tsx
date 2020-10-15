import { getUserSession } from "lib/auth/auth"
import { PopUp } from "mobile/Navigation/PopUp"
import { PopUpProvider } from "mobile/Navigation/PopUp/PopUpProvider"
import React, { useEffect, useImperativeHandle } from "react"

import AuthContext from "./AuthContext"

let analytics: any

export interface AuthProviderProps {
  currentScreen: any
  apolloClient: any
}

export interface AuthProviderRef {
  authContext: () => {
    signIn: (session: any) => Promise<void>
    signOut: () => Promise<void>
    resetStore: () => void
    authState: any
    userSession: any
  }
}

export const AuthProvider = React.forwardRef<AuthProviderRef, AuthProviderProps>(
  ({ apolloClient }, ref) => {
    const [authState, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case "RESTORE_TOKEN":
            return {
              ...prevState,
              userSession: action.token,
              isSignedIn: !!action.token,
              authInitializing: false,
            }
          case "SIGN_IN":
            return {
              ...prevState,
              isSignedIn: true,
              userSession: action.token,
            }
          case "SIGN_OUT":
            return {
              ...prevState,
              isSignedIn: false,
              userSession: null,
            }
        }
      },
      {
        authInitializing: true,
        isSignedIn: false,
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
              analytics.identify(user.id, user)
            }
            dispatch({ type: "RESTORE_TOKEN", token: userSession.token })
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
        dispatch({ type: "SIGN_IN", token: session.token })
        const user = session?.user
        if (user) {
          analytics.identify(user.id, user)
        }
        apolloClient.resetStore()
      },
      signOut: async () => {
        localStorage.removeItem("userSession")
        localStorage.removeItem("beamsData")
        analytics.reset()
        dispatch({ type: "SIGN_OUT" })
        apolloClient.resetStore()
      },
      resetStore: () => {
        apolloClient.resetStore()
      },
      authState,
      userSession: authState.userSession,

    }

    return (
      <AuthContext.Provider value={authContext}>
          <PopUpProvider>
            
            <PopUp />
          </PopUpProvider>
      </AuthContext.Provider>
    )
  }
)
