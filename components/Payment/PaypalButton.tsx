import React, { useEffect } from "react"
import FadeIn from "react-fade-in"
import styled from "styled-components"
import { gql } from "@apollo/client"

export const PayPalFragment_PaymentPlan = gql`
  fragment PayPalFragment_PaymentPlan on PaymentPlan {
    id
    estimate
  }
`

export const PaypalButton = ({ plan }) => {
  useEffect(() => {
    const el = document.getElementsByClassName("paypal-button-container")?.[0]
    if (plan && el?.childNodes?.length === 0) {
      ;(window as any).paypal
        ?.Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "horizontal",
            label: "paypal",
            height: 40,
          },
          createOrder: function (data, actions) {
            // This function sets up the details of the transaction, including the amount and line item details.
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: plan.estimate?.total / 100,
                  },
                },
              ],
            })
          },
          onApprove: function (data, actions) {
            console.log(data)
          },
        })
        .render(".paypal-button-container")
    }
  }, [plan])

  return <Container className="paypal-button-container"></Container>
}

const Container = styled(FadeIn)`
  width: 176px;
  height: 45px;
`
