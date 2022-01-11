import React from "react"
import { useMutation, ApolloError } from "@apollo/client"
import { ReviewOrder as ReviewOrderBase } from "@seasons/eclipse"
import { GET_BAG } from "queries/bagQueries"
import { SUBMIT_ORDER } from "queries/orderQueries"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { getDrawerWidth } from "components/Drawer/Drawer"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useRouter } from "next/router"
import { Schema, useTracking } from "utils/analytics"

type Props = {
  order: any
}

export const ReviewOrder: React.FC<Props> = ({ order }) => {
  const { closeDrawer, openDrawer } = useDrawerContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const router = useRouter()
  const tracking = useTracking()
  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    awaitRefetchQueries: true,
  })

  const handleBackPressed = () => {
    closeDrawer()
  }
  const handleOrderItemPressed = (product) => {
    router.push(`/product/${product.slug}`)
  }

  const handleOrderSubmitted = async ({ order, customer }) => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.PlaceOrderTapped,
      actionType: Schema.ActionTypes.Tap,
    })

    if (customer.status === "Active") {
      const result = await submitOrder({
        variables: {
          input: {
            orderID: order.id,
          },
        },
      })

      if (result.errors) {
        handleError((result.errors as any) as readonly ApolloError[])
      } else {
        openDrawer("orderConfirmation", { order, customer })
      }
    } else {
      openDrawer("guestPayment", { order, customer })
    }
  }

  const handleError = (error) => {
    console.error(error)
    showPopUp({
      title: "Oops! Try again!",
      note: "There was an issue purchasing this item. Please retry or contact us.",
      buttonText: "Close",
      onClose: () => {
        hidePopUp()
      },
    })
  }

  const handleNavigateToBrand = (href: string) => {
    router.push(href)
  }

  return (
    <ReviewOrderBase
      onBackPressed={handleBackPressed}
      onOrderItemPressed={handleOrderItemPressed}
      onOrderSubmitted={handleOrderSubmitted}
      order={order}
      windowWidth={getDrawerWidth()}
      onNavigateToBrand={handleNavigateToBrand}
    />
  )
}
