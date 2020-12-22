import { apolloClient } from "lib/apollo"

import { gql } from "@apollo/client"

declare var Chargebee: {
  init: (opts: any) => void
  openCheckout: (opts: any) => void
}

export function initChargebee() {
  Chargebee.init({
    site: process.env.NEXT_PUBLIC_GATSBY_CHARGEBEE_SITE || "seasons-test",
  })
  //   const checkChargebee = setInterval(() => {
  //     if (typeof Chargebee !== "undefined") {
  //       Chargebee.init({
  //         site: process.env.NEXT_PUBLIC_GATSBY_CHARGEBEE_SITE || "seasons-test",
  //       })
  //       clearInterval(checkChargebee)
  //     }
  //   }, 500)
}

const GET_CHARGEBEE_CHECKOUT = gql`
  query GetChargebeeCheckout($planID: String!, $email: String, $couponID: String) {
    chargebeeCheckout(planID: $planID, email: $email, couponID: $couponID) {
      id
      type
      url
      state
      embed
      created_at
      expires_at
    }
  }
`

const GET_GIFT_CHARGEBEE_CHECKOUT = gql`
  query GetChargebeeCheckout($planID: String!) {
    chargebeeGiftCheckout(planID: $planID) {
      id
      type
      url
      state
      embed
      created_at
      expires_at
    }
  }
`

export function getChargebeeCheckout(planID: string, email: string, gift: boolean = false): Promise<boolean | void> {
  let coupon
  try {
    const couponData = localStorage?.getItem("coupon")
    coupon = JSON.parse(couponData)
  } catch (e) {
    // Fail silently
  }
  // Set up the mutation
  return new Promise((resolve, reject) => {
    apolloClient
      .query({
        query: gift ? GET_GIFT_CHARGEBEE_CHECKOUT : GET_CHARGEBEE_CHECKOUT,
        variables: {
          planID,
          email,
          couponID: coupon?.id,
        },
      })
      .then((resp) => {
        if (gift) {
          resolve(resp.data.chargebeeGiftCheckout)
        } else {
          resolve(resp.data.chargebeeCheckout)
        }
      })
      .catch((error) => {
        // if they already subscribed, provide specific error message
        if (error.message.includes("already has a subscription")) {
          reject("Already subscribed. Please contact support@seasons.nyc to update your subscription")
        } else {
          reject("Something went wrong. Please try again later")
        }
      })
  })
}

export function executeChargebeeCheckout({
  planID,
  email,
  onError,
  onSuccess,
  isGift = false,
}: {
  planID: string
  email: string
  onError?: Function
  onSuccess?: Function
  isGift?: boolean
}) {
  // @ts-ignore
  const chargebee = Chargebee.getInstance()
  chargebee.openCheckout({
    hostedPage: async () => {
      return await getChargebeeCheckout(planID, email, isGift)
    },
    error: (error) => {
      console.error(error)
      onError?.(error)
    },
    success: (hostedPageId) => {
      onSuccess?.(hostedPageId)
    },
  })
}
