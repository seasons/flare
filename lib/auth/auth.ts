import { Auth0Client } from "@auth0/auth0-spa-js"

const auth0 = new Auth0Client({
  domain: 'seasons.auth0.com',
  client_id: 'zSCYlUB8NNZi9vlxjAQQr2u3Y58jDZKV',
  redirect_uri: '<MY_CALLBACK_URL>',
  cacheLocation: 'localstorage'
});

export interface UserSession {
  token: string
  refreshToken: string
  user?: {
    email: string
    id: string
  }
}

export const getUserSession: () => Promise<UserSession | null> = async () => {
  const data = localStorage.getItem("userSession")

  try {
    const userSession = JSON.parse(data)
    return userSession
  } catch (e) {}

  return {}
}

export const getAccessTokenFromSession = async () => {
  const userSession = await getUserSession()
  const accessToken = userSession ? userSession.token : ""
  return accessToken
}

export const getAccessTokenOrRefresh = async () => {
  return new Promise(async (resolve, reject) => {
    const userSession = await getUserSession()

    if (userSession) {
      const accessToken = userSession.token

      return auth0.auth
        .userInfo({
          token: accessToken,
        })
        .then(() => {
          resolve(accessToken)
        })
        .catch(async (e) => {
          console.log(e)

          try {
            const newUserSession = await getNewToken()
            resolve(newUserSession)
          } catch (e) {
            console.log(e)
          }
        })
    }
  })
}

export const getNewToken = async () => {
  const session = await getUserSession()
  const { refreshToken } = session

  const newToken = await auth0.auth.refreshToken({
    refreshToken,
  })

  const newUserSession = {
    token: newToken.accessToken,
    refreshToken,
  }
  localStorage.setItem("userSession", JSON.stringify(newUserSession))
  return newUserSession
}
