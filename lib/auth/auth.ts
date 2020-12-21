import { apolloClient } from "lib/apollo"

import { gql } from "@apollo/client"
import { CustomerStatus } from "mobile/Account/Lists"

export interface UserSession {
  token: string
  refreshToken: string
  customer?: {
    status: CustomerStatus
    admissions?: {
      id: string
      authorizationWindowClosesAt: string
      authorizationsCount: number
    }
  }
  user?: {
    firstName: string
    lastName: string
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
    const userSession = getUserSession()

    if (userSession) {
      const response = await apolloClient.mutate({
        mutation: GET_REFRESH_TOKEN,
        variables: {
          refreshToken: userSession.refreshToken,
        },
      })

      const newSession = {
        ...userSession,
        token: response.data.refreshToken,
      }

      if (typeof window !== "undefined") {
        localStorage?.setItem("userSession", JSON.stringify(newSession))
      }
      resolve(response.data.refreshToken)
    }
  })
}

export const getAccessTokenFromSession = () => {
  const userSession = getUserSession()
  const accessToken = userSession ? userSession.token : ""
  return accessToken
}

export const userSessionToIdentifyPayload = (session) => {
  const cust = session?.customer
  const traits = {
    ...session?.user,
    ...session?.customer?.user,
    status: cust?.status,
    admissable: cust?.admissions?.admissable,
    authorizations: cust?.admissions?.authorizationsCount,
    state: cust?.detail?.shippingAddress?.state,
    bagItems: cust?.bagItems?.length,
    customerID: cust?.id,
  }
  return traits
}
