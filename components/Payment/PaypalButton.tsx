import React, { useEffect } from "react"

export const PaypalButton = ({ plan }) => {
  useEffect(() => {
    const el = document.getElementById("paypal-button-container")

    if (plan && el.childNodes.length === 0) {
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
        .render("#paypal-button-container")
    }
  }, [plan])

  return (
    <>
      <div id="paypal-button-container"></div>
    </>
  )
}
