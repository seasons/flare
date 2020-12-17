import React, { useContext } from "react"

import { AuthContextProps } from "./AuthProvider"

export const useAuthContext = () => useContext(AuthContext)

const AuthContext = React.createContext<AuthContextProps>({
  signIn: (session: string) => null,
  signOut: () => null,
  resetStore: () => null,
  toggleLoginModal: (toggle: boolean) => null,
  userSession: null,
  authState: { authInitializing: true, isSignedIn: false, userSession: null },
  loginModalOpen: false,
  updateUserSession: ({ cust, user }: { cust?: any; user?: any }) => null,
})

export default AuthContext
