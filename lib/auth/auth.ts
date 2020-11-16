export interface UserSession {
  token: string
  refreshToken: string
  user?: {
    email: string
    id: string
  }
}

export const getUserSession: () => UserSession | null = () => {
  let data
  if (typeof window !== "undefined") {
    data = localStorage?.getItem("userSession")
  }

  try {
    if (data) {
      const userSession = JSON.parse(data)
      return userSession
    } else {
      return null
    }
  } catch (e) {}

  return {}
}

export const getAccessTokenFromSession = () => {
  const userSession = getUserSession()
  const accessToken = userSession ? userSession.token : ""
  return accessToken
}
