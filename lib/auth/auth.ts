export interface UserSession {
  token: string
  refreshToken: string
  user?: {
    email: string
    id: string
  }
}

export const getUserSession: () => UserSession | null = () => {
  const data = localStorage.getItem("userSession")

  try {
    const userSession = JSON.parse(data)
    return userSession
  } catch (e) {}

  return {}
}

export const getAccessTokenFromSession = () => {
  const userSession = getUserSession()
  const accessToken = userSession ? userSession.token : ""
  return accessToken
}