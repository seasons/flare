import { Button } from "components/Button"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useAuthContext } from "lib/auth/AuthContext"
import { BagView } from "mobile/Bag/Bag"
import { GET_BAG } from "queries/bagQueries"
import { GET_PRODUCT, UPSERT_CART_ITEM } from "queries/productQueries"
import React, { useState } from "react"
import { Schema, useTracking } from "utils/analytics"
import { addToLocalCart } from "utils/localCart"

import { useMutation } from "@apollo/client"

import { ButtonSize } from "./Button/Button.shared"
import { useDrawerContext } from "./Drawer/DrawerContext"

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
  const { authState } = useAuthContext()
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
        query: GET_BAG,
      },
      {
        query: GET_PRODUCT,
        variables: { slug: product?.slug },
      },
    ],
    onCompleted: (res) => {
      setIsMutating(false)
      openDrawer("bag", { initialTab: BagView.Buy })
    },
    onError: (err) => {
      setIsMutating(false)
      console.log("AddToBagButton: Error", err)
    },
  })

  const onAddToLocalCart = () => {
    addToLocalCart(selectedVariant.id)

    openDrawer("bag", { initialTab: BagView.Buy })
    setIsMutating(false)
  }

  const onAddToCart = () => {
    const isInBag = selectedVariant?.isInBag && !selectedVariant?.isInCart

    if (isInBag) {
      showPopUp({
        title: "You aleady have this in your bag",
        note:
          "You've already added this item to your bag to rent. If you'd like to buy it instead, add it to your cart.",
        buttonText: "Cancel",
        secondaryButtonText: "Add to cart",
        secondaryButtonOnPress: () => {
          setIsMutating(true)
          if (isUserSignedIn) {
            upsertCartItem()
          } else {
            onAddToLocalCart()
          }
          hidePopUp()
        },
        onClose: () => hidePopUp(),
      })
    } else {
      setIsMutating(true)
      if (isUserSignedIn) {
        upsertCartItem()
      } else {
        onAddToLocalCart()
      }
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

  const isSoldOut = selectedVariant?.reservable === 0

  const _disabled = disabled || isMutating || isSoldOut

  let text = "Buy"
  if (isInCart) {
    text = "Added to cart"
  } else if (isSoldOut) {
    text = "Sold out"
  }

  return (
    <Button
      loading={isMutating}
      disabled={true}
      size={size}
      variant="primaryWhite"
      block
      onClick={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductAddedToBag,
          actionType: Schema.ActionTypes.Tap,
        })
        handleBuy()
      }}
      borderRadius={8}
    >
      {text}
    </Button>
  )
}
