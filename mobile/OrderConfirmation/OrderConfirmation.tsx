import React from "react"
import { OrderConfirmation as OrderConfirmationBase } from "@seasons/eclipse"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { getDrawerWidth } from "components/Drawer/Drawer"
import { useRouter } from "next/router"

type Props = {
  order: any
  customer: any
}

export const OrderConfirmation: React.FC<Props> = ({ order, customer }) => {
  const { closeDrawer } = useDrawerContext()
  const router = useRouter()

  const handleDonePressed = () => {
    closeDrawer()
  }
  const handleOrderItemPressed = (product) => {
    router.push(`/product/${product.slug}`)
  }

  return (
    <OrderConfirmationBase
      order={order}
      customer={customer}
      windowWidth={getDrawerWidth()}
      onOrderItemPressed={handleOrderItemPressed}
      onDonePressed={handleDonePressed}
    />
  )
}
