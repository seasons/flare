import { apolloClient } from "lib/apollo"

import { gql } from "@apollo/client"

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

export const getNewToken = async () => {
  const GET_REFRESH_TOKEN = gql`
    mutation GetRefreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken)
    }
  `

  return new Promise(async (resolve, reject) => {
    const userSession = await getUserSession()

    if (userSession) {
      const refreshToken = userSession.refreshToken

      const response = await apolloClient.mutate({
        mutation: GET_REFRESH_TOKEN,
        variables: {
          refreshToken,
        },
      })

      resolve(response.data.refreshToken)
    }
  })
}

export const getAccessTokenFromSession = () => {
  const userSession = getUserSession()
  const accessToken = userSession ? userSession.token : ""
  return accessToken
}
