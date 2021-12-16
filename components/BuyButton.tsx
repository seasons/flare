import { Button } from "components/Button"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useAuthContext } from "lib/auth/AuthContext"
import { GET_BAG } from "queries/bagQueries"
import { GET_PRODUCT, UPSERT_CART_ITEM } from "queries/productQueries"
import React, { useState } from "react"
import { Schema, useTracking } from "utils/analytics"
import { useMutation } from "@apollo/client"
import { ButtonSize } from "./Button/Button.shared"
import { useDrawerContext } from "./Drawer/DrawerContext"
import { BagView } from "mobile/Bag/Bag"

interface Props {
  disabled?: boolean
  selectedVariant: any
  data: any
  size?: ButtonSize
}

export const BuyButton: React.FC<Props> = ({ disabled, selectedVariant, data, size }) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const { openDrawer } = useDrawerContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { authState, toggleLoginModal } = useAuthContext()
  const isUserSignedIn = authState?.isSignedIn
  const product = data?.product
  const isInCart = selectedVariant?.isInCart
  const isBuyUsed = Boolean(selectedVariant?.price?.buyUsedEnabled && selectedVariant?.price?.buyUsedAdjustedPrice)

  const [upsertCartItem] = useMutation(UPSERT_CART_ITEM, {
    variables: {
      productVariantId: selectedVariant?.id,
      addToCart: !isInCart,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: { slug: product?.slug },
      },
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      openDrawer("bag", { initialTab: BagView.Buy })
    },
    onError: (error) => {
      console.log("error upsertRestockNotification Product.tsx", error)
      setIsMutating(false)
    },
  })

  const onAddToCart = () => {
    const isInBag = selectedVariant?.isInBag && !selectedVariant?.isInCart

    if (isInBag && isUserSignedIn) {
      showPopUp({
        title: "You aleady have this in your bag",
        note:
          "You've already added this item to your bag to rent. If you'd like to buy it instead, add it to your cart.",
        buttonText: "Cancel",
        secondaryButtonText: "Add to cart",
        secondaryButtonOnPress: () => {
          setIsMutating(true)
          upsertCartItem()
          hidePopUp()
        },
        onClose: () => hidePopUp(),
      })
    } else if (isUserSignedIn) {
      setIsMutating(true)
      upsertCartItem()
    } else {
      showPopUp({
        title: "Sign up to add to cart",
        note: "You must be a member to use this feature.",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
        },
      })
    }
  }
  const handleBuy = () => {
    if (!isMutating) {
      setIsMutating(true)
      onAddToCart()
    }
  }

  const availableForSale = isBuyUsed

  if (!availableForSale) {
    return null
  }

  const _disabled = disabled || isMutating

  let text = "Buy"
  if (isInCart) {
    text = "Added to cart"
  }

  return (
    <Button
      loading={isMutating}
      disabled={_disabled}
      size={size}
      variant="primaryWhite"
      block
      onClick={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductAddedToBag,
          actionType: Schema.ActionTypes.Tap,
        })
        if (authState.isSignedIn) {
          handleBuy()
        } else {
          toggleLoginModal(true)
        }
      }}
      borderRadius={8}
    >
      {text}
    </Button>
  )
}
