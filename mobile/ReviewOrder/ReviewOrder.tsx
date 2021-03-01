import React from "react"
import { ReviewOrder as ReviewOrderBase } from "@seasons/eclipse"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { getDrawerWidth } from "components/Drawer/Drawer"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useRouter } from "next/router"

type Props = {
  order: any
}

export const ReviewOrder: React.FC<Props> = ({ order }) => {
  const { closeDrawer, openDrawer } = useDrawerContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const router = useRouter()

  const handleBackPressed = () => {
    closeDrawer()
  }
  const handleOrderItemPressed = (product) => {
    router.push(`/product/${product.slug}`)
  }
  const handleOrderSubmitted = ({ order, customer }) => {
    openDrawer("orderConfirmation", { order, customer })
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

  return (
    <ReviewOrderBase
      onBackPressed={handleBackPressed}
      onOrderItemPressed={handleOrderItemPressed}
      onOrderSubmitted={handleOrderSubmitted}
      onError={handleError}
      order={order}
      windowWidth={getDrawerWidth()}
    />
  )
}
