import { ProductBuyCTA as ProductBuyCTABase } from "@seasons/eclipse"
import React from "react"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { CREATE_DRAFT_ORDER_MUTATION } from "queries/orderQueries"
import { useMutation } from "@apollo/client"
import { useAuthContext } from "lib/auth/AuthContext"

type Props = Omit<
  JSX.LibraryManagedAttributes<typeof ProductBuyCTABase, React.ComponentProps<typeof ProductBuyCTABase>>,
  "onBuyNew" | "onBuyUsed" | "buyButtonMutating"
>

export enum OrderType {
  BUY_USED = "Used",
  BUY_NEW = "New",
}

export const ProductBuyCTA = (props: Props) => {
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const [buyButtonMutating, setBuyButtonMutating] = React.useState(false)
  const [createDraftOrder] = useMutation(CREATE_DRAFT_ORDER_MUTATION, {
    onCompleted: (res) => {
      setBuyButtonMutating(false)
      if (res?.createDraftedOrder) {
        openDrawer("reviewOrder", { order: res.createDraftedOrder })
      }
    },
    onError: (error) => {
      console.log("error createDraftOrder ", error)
      setBuyButtonMutating(false)
    },
  })

  const handleCreateDraftOrder = (orderType: "Used" | "New") => {
    if (Boolean(authState?.userSession)) {
      return createDraftOrder({
        variables: {
          input: {
            productVariantID: props.selectedVariant?.id,
            orderType,
          },
        },
      })
    } else {
      showPopUp({
        title: "Sign up to buy this item",
        note: "You need to sign in or create an account before you can order items",
        buttonText: "Got it",
        onClose: () => {
          setBuyButtonMutating(false)
          hidePopUp()
        },
      })
    }
  }

  return (
    <ProductBuyCTABase
      {...props}
      buyButtonMutating={buyButtonMutating}
      onBuyNew={() => {
        setBuyButtonMutating(true)
        handleCreateDraftOrder(OrderType.BUY_NEW)
      }}
      onBuyUsed={() => {
        setBuyButtonMutating(true)
        handleCreateDraftOrder(OrderType.BUY_USED)
      }}
    />
  )
}
